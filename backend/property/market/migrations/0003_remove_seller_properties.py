# Generated by Django 3.1.7 on 2021-03-19 17:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_auto_20210312_2122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='properties',
        ),
    ]
