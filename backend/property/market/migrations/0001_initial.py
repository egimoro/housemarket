# Generated by Django 3.1.7 on 2021-03-12 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suburb', models.CharField(max_length=250)),
                ('rooms', models.IntegerField()),
                ('price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('contact', models.CharField(max_length=250)),
                ('properties', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.property')),
            ],
        ),
    ]
