# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-02 06:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reqs', '0024_auto_20170425_2317'),
    ]

    operations = [
        migrations.AddField(
            model_name='policy',
            name='document_source',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
