from django.urls import path, include
from .views import AdviceByIndex

urlpatterns = [
    path('advice/<int:index>/', AdviceByIndex.as_view(), name='advice-by-index'),
] 