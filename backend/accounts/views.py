from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import AccountsSerializer


class RegisterUserView(generics.CreateAPIView):
    serializer_class = AccountsSerializer

    def post(self, request, *args, **kwargs):
        print("Looking at the request data", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "Account created successfully", "user": serializer.data, "email": serializer.data.get("email")}, status=status.HTTP_201_CREATED)


