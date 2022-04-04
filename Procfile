release: python manage.py migrate
web: gunicorn blog_lyfe.wsgi --log-file -
web: bin/start-nginx bundle exec unicorn -c config/unicorn.rb
