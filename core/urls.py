from django.conf.urls import url, include
from .views import RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView

app_name = 'core'

urlpatterns = [
    url(r'^user/?$', UserRetrieveUpdateAPIView.as_view()),
    url(r'^users/?$', RegistrationAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view())
]
