from django.conf import settings
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import AccountsSerializer
from .models import Accounts
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.permissions import AllowAny, IsAuthenticated
from allauth.socialaccount.models import SocialToken, SocialAccount
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
import json
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests


class RegisterUserView(generics.CreateAPIView):
    serializer_class = AccountsSerializer

    def post(self, request, *args, **kwargs):
        print("Looking at the request data", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "Account created successfully", "user": serializer.data, "email": serializer.data.get("email")}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def googleLogin(request):
    token = request.data.get("access_token")

    if not token:
        return JsonResponse({"detail": "Access token is required"}, status=400)
    
    # Verify the token with Google and retrieve user info
    try: 
       idInfo = google_id_token.verify_oauth2_token(
           token, 
           google_requests.Request(),
           audience=settings.GOOGLE_OAUTH_CLIENT_ID,  # Replace with your Google Client ID
       )
    except Exception as e:
        return JsonResponse({"detail": "Invalid Google token", "error": str(e)}, status=400)
    
    # Extract identity
    email = idInfo.get("email")
    email_verified = idInfo.get("email_verified", False)
    given_name = idInfo.get("given_name", "")
    family_name = idInfo.get("family_name", "")
    
    if not email:
        return JsonResponse({"detail": "Google did not return email"}, status=400)
    
    if not email_verified:
        return JsonResponse({"detail": "Email not verified by Google"}, status=400)
    
    user, created = Accounts.objects.get_or_create(
        email=email,
        defaults={
            "first_name": given_name,
            "last_name": family_name,
            "username": email.split("@")[0],
            'is_active': True,
        }
    ) 
    # If user existed but missing fields, optionally update:
    changed = False
    if not user.first_name and given_name:
        user.first_name = given_name; changed = True
    if not user.last_name and family_name:
        user.last_name = family_name; changed = True
    if changed:
        user.save()  

     # Issue your JWT tokens
    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "email": user.email,
        "user_id": user.id,
    }, status=status.HTTP_200_OK)

