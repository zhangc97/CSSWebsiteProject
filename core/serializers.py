from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from Profile.models import Profile

class UserSerializer(serializers.ModelSerializer):
    #This class handles serialization and dserialization of User objects
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token','profile')
        depth = 1
        read_only_fields=('token',)

    def update(self, instance, validated_data):
        #performs an update on the user

        password = validated_data.pop('password', None) # have to take out password because setattr does not handle hashing etc

        for (key, value) in validated_data.items():
            #for the keys after taking out password set them to the updating User instance
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password) # set_password is handled by django

        instance.save() #set_password does not save instance
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        #validation method
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )
        user = authenticate(username=email, password=password) #authentication method

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated'
            )

        #return all the validated info
        return {
            'email': user.email,
            'username': user.username,
            'token' : user.token
        }

class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'token',]

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)
