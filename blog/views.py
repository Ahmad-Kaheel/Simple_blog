from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

#List our blog posts
class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_class = (permissions.AllowAny, )
    
#Show the details fo the blog 
@permission_classes((AllowAny, ))
class BlogPostDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_class = (permissions.AllowAny, )
    
#Give us only the featured post "just one blog"
class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(featured = True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_class = (permissions.AllowAny, )
    
#Show blogs based on the category
#@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
class BlogPostCategoryView(APIView):
    serializer_class = BlogPostSerializer
    #permission_class = (permissions.AllowAny, )

    # Override post method
    def post(self, request, format = None ):
        data = self.request.data 
        category = data['category']
        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)
        serializer = BlogPostSerializer(queryset, many=True)
        
        return Response(serializer.data)
    
# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()