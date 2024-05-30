# Generated by Django 4.2.5 on 2023-11-18 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0027_alter_exercise_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('feedback_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('feedback_type', models.CharField(max_length=11)),
                ('content', models.CharField(max_length=1000)),
                ('state', models.BooleanField(default=False)),
            ],
        ),
    ]
