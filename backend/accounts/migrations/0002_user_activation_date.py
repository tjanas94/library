# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-23 20:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='activation_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='data aktywacji'),
        ),
    ]
