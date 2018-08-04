from django.conf.urls import url, include

from .views import CodeRetrieveUpdateDestroyAPIView, FiddleView, CodeRetrieveAPIView, VoteUpdateAPIView

app_name = 'fiddles'

urlpatterns = [
    url(r'^fiddles/?$', CodeRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^fiddles/get/?$', CodeRetrieveAPIView.as_view()),
    url(r'^fiddles/(?P<fiddle_id>[0-9a-f-]+)/$', FiddleView,),
    url(r'^fiddles/votesubmit/?$', VoteUpdateAPIView.as_view()),
]
