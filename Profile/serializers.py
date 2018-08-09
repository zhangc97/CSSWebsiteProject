from rest_framework import serializers

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source = 'user.username')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('image', 'username', 'name', 'contact', 'bio', 'website', 'github', 'total_stars')
        read_only_fields = ('username',)

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return '/media/profile_images/default.jpg'

class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('image', 'name', 'contact', 'bio', 'website', 'github',)

    def update(self, instance, validated_data):
        print(instance, validated_data)
        for (key, value) in validated_data.items():
            setattr(instance.profile, key, value)

        print(instance.profile)
        instance.profile.save()

        return instance.profile
