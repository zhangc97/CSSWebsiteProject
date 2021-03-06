# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from core.models import TimestampedModel, User
# Create your models here.
class Profile(TimestampedModel):
    user = models.OneToOneField(
        'core.User', on_delete=models.CASCADE, related_name='profile'
    )
    #OneToOneField builds a relationship between User model aswell as the Profile models
    image = models.ImageField(upload_to='profile_images', blank=True, null=False)
    name = models.CharField(db_index=True, max_length=255, unique=False, blank=True)
    contact = models.EmailField(db_index=True, max_length=254,blank=True)
    bio = models.TextField(blank=True)
    website = models.TextField(db_index=True,blank=True,)
    github = models.TextField(db_index=True,blank=True,)
    total_stars = models.BigIntegerField(default='0')

    def __str__(self):
        return self.user.username

    def getBio(self):
        return self.bio

    def getWebsite(self):
        return self.website

    def getGithub(self):
        return self.github

    def getContact(self):
        return self.contact

    def getImage(self):
        return self.image
