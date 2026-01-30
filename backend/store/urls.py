from django.urls import path, include
from . import views


urlpatterns = [
   path("products/", views.ProductListView.as_view(), name="products-all"),
   path("products/categories/", views.CategoryListView.as_view(), name="product-categories"),
   path("products/category/<slug:slug>/", views.ProductsByCategoryView.as_view(), name="products-by-category"),

   path("product/<slug:slug>/", views.ProductDetailView.as_view(), name="product-detail"),

]  