# Generated by Django 2.0.7 on 2018-08-02 04:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_full_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_name',
        ),
    ]
