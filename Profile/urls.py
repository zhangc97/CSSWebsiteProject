from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from .views import ProfileRetrieveAPIView, ProfileListAPIView, ProfileUpdateAPIView, ViewImage

app_name = 'profiles'

urlpatterns = [
    url(r'^profiles/(?P<username>\w+)?$', ProfileRetrieveAPIView.as_view()),
    url(r'^profiles/get/?$', ProfileListAPIView.as_view()),
    url(r'^profile/?$', ProfileUpdateAPIView.as_view()),
    url(r'^profile/avatar/(?P<username>\w+)?$', ViewImage)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
