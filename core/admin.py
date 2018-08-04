# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import User
from Fiddles.models import Fiddle
from Profile.models import Profile

admin.site.register(User)
admin.site.register(Fiddle)
admin.site.register(Profile)
# Register your models here.
