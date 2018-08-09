# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import django_filters.rest_framework
from Utils.renderers import UtilJSONRenderer
from rest_framework import status, pagination, filters
from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Fiddle
from .serializers import CodeSerializer
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from django.shortcuts import render_to_response



class VoteUpdateAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CodeSerializer

    def update(self, request, *args, **kwargs):
        serializer_data = request.data
        fiddle_id = request.data.get('fiddle_id', None)
        instance = Fiddle.objects.get(pk=fiddle_id)
        serializer = self.serializer_class(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

def FiddleView(request, fiddle_id):
    css = Fiddle.objects.get(pk=fiddle_id).get_css()
    html = Fiddle.objects.get(pk=fiddle_id).get_html()
    return render_to_response('display.html', {'css':css, 'html':html})

class FiddlePagination(pagination.PageNumberPagination):
    page_size = 12

class CodeRetrieveAPIView(ListAPIView):
    queryset = Fiddle.objects.all()
    renderer_classes = (UtilJSONRenderer,)
    pagination_class = FiddlePagination
    serializer_class = CodeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('HTMLelement', 'user', 'post_id')
    ordering_fields = ('stars', 'votes')
    ordering = ('HTMLelement')



class CodeRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CodeSerializer
    renderer_classes = (UtilJSONRenderer,)
    def post(self, request):
        code = request.data
        print(code)
        objects = Fiddle()
        objects.create_fiddle(request.data)
        return Response(request.data, status=status.HTTP_201_CREATED)





# Create your views here.
