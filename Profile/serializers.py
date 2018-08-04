from rest_framework import serializers

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source = 'user.username')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ('username',)

    def get_image(self, obj):
        if obj.image:
            return obj.image

        return 'https://static.productionready.io/images/smiley-cyrus.jpg'

    def update(self, instance, validated_data):
        print(instance, validated_data)

        return instance

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
