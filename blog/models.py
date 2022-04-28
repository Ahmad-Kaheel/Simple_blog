from datetime import date, datetime
from django.db import models
from django.utils.text import slugify

class categories(models.TextChoices):
    TECHNOLOGY = 'technology'
    BUSINESS = 'business'
    
class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices=categories.choices, default=categories.TECHNOLOGY)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt = models.CharField(max_length=150)
    date = models.DateField(default= date.today )
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank= True, null= True)
    
    # Adding a number to the duplicated link
    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact = original_slug).count()
        
        count = 1 
        slug = original_slug
        #increase the queryset until there is no matching queryset in model
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1 
            #Check if the current queryset is exist , if yes repeat the loop 
            queryset = BlogPost.objects.all().filter(slug__iexact = slug).count()            
            
        self.slug = slug # The final slug 
        
        if self.featured:
            try:
                temp = BlogPost.objects.get(featured = True)
                if self != temp :
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
            
        super().save(*args, **kwargs) #Override save function 
        
    def __str__(self):
        return self.title
    
    
        
        
        
        """"
class test(models.Model):
    id = models.UUIDField(primary_key=True, default= uuid.uuid4, editable=False)
    title = models.CharField(max_length= 25)
    
    def __str__(self) :
        return str(self.id)
        
    def __str__(self):
        return self.title
"""
