from django.core.mail import send_mail

from celery_app import app


@app.task
def send_registration_email(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)
