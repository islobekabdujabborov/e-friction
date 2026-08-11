web: gunicorn saxovat.wsgi:application
web: python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn saxovat.wsgi:application