from django.conf.urls import url

from .views import ProfileRetrieveAPIView, ProfileListAPIView, ProfileUpdateAPIView

app_name = 'profiles'

urlpatterns = [
    url(r'^profiles/(?P<username>\w+)?$', ProfileRetrieveAPIView.as_view()),
    url(r'^profiles/get/?$', ProfileListAPIView.as_view()),
    url(r'^profile/?$', ProfileUpdateAPIView.as_view())

]
