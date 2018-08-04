from django.db.models.signals import post_save
from django.dispatch import receiver

from Profile.models import Profile

from .models import User

@receiver(post_save, sender=User)
def create_related_profile(sender, instance, created, *args, **kwargs):
    #checked the created variable to ensure that its a create request
    #not a update request

    if instance and created :
        instance.profile = Profile.objects.create(user=instance)
