from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Fiddle

class CodeSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()
    class Meta:
        model = Fiddle
        fields = '__all__'

    def starCalculator(self, instance, stars):
        created_time = instance.get_creation()
        updated_time = instance.get_update()
        votes_on_fiddle = instance.votes
        incoming_stars = stars
        stars_on_fiddle = instance.stars

        outgoing_stars = (stars_on_fiddle + stars)/votes_on_fiddle

        return outgoing_stars

    def update(self, instance, validated_data):
        print(instance, validated_data)
        incoming_stars = validated_data.get('stars')
        instance_owner = instance.get_owner()
        instance_owner_profile = instance_owner.profile
        print(instance_owner_profile.total_stars)
        instance.votes = instance.votes + 1
        instance.stars = incoming_stars + instance.stars
        instance_owner_profile.total_stars = instance_owner_profile.total_stars + incoming_stars
        instance_owner_profile.save()
        instance.save()

        return instance
