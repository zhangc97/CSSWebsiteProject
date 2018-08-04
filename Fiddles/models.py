# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid
from django.db import models
from core.models import TimestampedModel
from core.models import User



class Fiddle(TimestampedModel):
    user = models.ForeignKey(
        'core.User', related_name = 'fiddle_owner', on_delete=models.CASCADE, db_column='user'
    )
    code = models.TextField(blank=True, unique=False)
    title = models.CharField(blank=True, max_length=255)
    stars = models.BigIntegerField()
    HTMLelement = models.CharField(blank=True, max_length=255)
    HTMLCode = models.TextField(blank=True)
    CSSCode = models.TextField(blank=True)
    post_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    votes = models.BigIntegerField()
    REQUIRED_FIELDS = ['code']

    def create_fiddle(self, data):
        code = data.get('parsedCode')
        HTMLelement = data.get('element')
        HTMLCode = data.get('html_value')
        CSSCode = data.get('css_value')
        title = data.get('title')
        user = User.objects.get(email=data.get('user'))
        if code is None:
            raise TypeError('code cannot be null')
        if user is None:
            raise TypeError('user cannot be null')
        print(user)
        fiddle = Fiddle(user=user,code=code, title=title, HTMLelement=HTMLelement, HTMLCode = HTMLCode, CSSCode = CSSCode, stars=0, votes=0)
        fiddle.save()

        return fiddle

    def __unicode__(self):
        return unicode(self.post_id)
    def __str__(self):
        return self.user.username

    def get_owner(self):
        return self.user

    def get_html(self):
        return self.HTMLCode

    def get_css(self):
        return self.CSSCode

    def get_code(self):
        return self.code

    def get_creation(self):
        return self.created_at

    def get_update(self):
        return self.updated_at
# Create your models here.
