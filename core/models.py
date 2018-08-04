import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from django.db import models

class TimestampedModel(models.Model):
    # A timestamp representing when this object was created.
    created_at = models.DateTimeField(auto_now_add=True)

    # A timestamp reprensenting when this object was last updated.
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

        # By default, any model that inherits from `TimestampedModel` should
        # be ordered in reverse-chronological order. We can override this on a
        # per-model basis as needed, but reverse-chronological is a good
        # default ordering for most models.
        ordering = ['-created_at', '-updated_at']

class UserManager(BaseUserManager) :

    def get_by_natural_key(self, email):
        return self.get(email=email)

    def create_user(self, username, email, password=None):
        #creates and return user with an email username and password
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email),)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        #admin creation

        if password is None:
            raise TypeError('Superusers must have a password')

        user = self.create_user(username=username, email=self.normalize_email(email), password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user



class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'username' #what they log in with
    REQUIRED_FIELDS = ['email']

    objects = UserManager() #inherits from UserManager

    def __str__(self):
        return self.username #returns username

    def __get__(self):
        return self.username

    def natural_key(self):
        return self.username

    def get_profile(self):
        return self.Profile

    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().

        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        """
        return self._generate_jwt_token()
    @property
    def staff(self):
        return self.is_staff

    def get_short_name(self):
        #required for emails
        return self.username

    def _generate_jwt_token(self):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 60 days into the future.
        """
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')
        #print(token)
        return token.decode('utf-8')
