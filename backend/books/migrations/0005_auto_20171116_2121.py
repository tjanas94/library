# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-16 20:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_auto_20171114_2123'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='description',
        ),
        migrations.RemoveField(
            model_name='book',
            name='file_name',
        ),
        migrations.RemoveField(
            model_name='book',
            name='tags',
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]