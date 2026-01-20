from django.urls import path, include
from . import views


urlpatterns = [
   path("", views.StoreListView.as_view(), name="store"),
   path("<str:category>/", views.StoreCategoryListView.as_view(), name="product-by-category"),
]  