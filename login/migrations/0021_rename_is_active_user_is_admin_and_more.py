# Generated by Django 4.2.5 on 2023-10-24 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0020_rename_is_staff_user_is_active_user_is_superuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_active',
            new_name='is_admin',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_superuser',
        ),
    ]