from django.urls import path, include
from .views import RegisterUserView, googleLogin, MeView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path("register/", RegisterUserView.as_view()),   
    path("me/", MeView.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('google/', googleLogin),


]  