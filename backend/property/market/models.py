from django.db import models

# Create your models here.


class Propertyh(models.Model):
    suburb = models.CharField(max_length=250)
    rooms = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return self.suburb


class Seller(models.Model):
    name = models.CharField(max_length=250)
    contact = models.CharField(max_length=250)

    def __str__(self):
        return self.name