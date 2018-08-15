# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import django_filters.rest_framework
from django.shortcuts import render
from rest_framework import status, filters, pagination
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .exceptions import ProfileDoesNotExist
from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer, ProfileUpdateSerializer
from Utils.renderers import UtilJSONRenderer
from django.shortcuts import render_to_response
from rest_framework.parsers import MultiPartParser

def ViewImage(request, username):
    userprofile = Profile.objects.select_related('user').get(
                user__username = username
            )
    image = userprofile.image.url
    return render_to_response('image.html', {'image_url': image})

class ProfileUpdateAPIView(UpdateAPIView):
        permission_classes = (IsAuthenticated,)
        serializer_class = ProfileUpdateSerializer
        parser_classes = (MultiPartParser,)

        def update(self, request, *args, **kwargs):
            serializer_data = request.data
            print(request.data)
            serializer = self.serializer_class(
                request.user, data=serializer_data, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileRetrieveAPIView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    renderer_classes = (ProfileJSONRenderer,)
    serializer_class = ProfileSerializer

    def retrieve(self, request, username, *args, **kwargs):
        #retrieve profile and if no find then throw exceptions
        try:
            profile = Profile.objects.select_related('user').get(
                user__username = username
            )
        except Profile.DoesNotExist:
            raise ProfileDoesNotExist

        serializer = self.serializer_class(profile)

        return Response(serializer.data, status=status.HTTP_200_OK)
# Create your views here.

class ProfilePagination(pagination.PageNumberPagination):
    page_size = 10

class ProfileListAPIView(ListAPIView):
        queryset = Profile.objects.all()
        renderer_classes = (UtilJSONRenderer,)
        serializer_class = ProfileSerializer
        filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
        ordering_fields = ('total_stars',)
        ordering = ('total_stars', )
