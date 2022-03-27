from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost
#from blog.models import test 

# Register your models here.


class BlogPostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    
    exclude = ('slug',)
    list_display = ('id', 'title', 'category', 'date_created', )
    list_display_links = ('id','title',)
    search_field = ('title', )
    list_per_page = 25
    

admin.site.register(BlogPost, BlogPostAdmin)


#admin.site.register(test)

