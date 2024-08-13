# from django.test import TestCase
#
# from user.tasks import send_registration_email
#
#
# class CeleryTestCase(TestCase):
#     def test_celery_task(self):
#         result = send_registration_email.delay(
#             subject='Test Subject',
#             message='Test Message',
#             from_email='from@example.com',
#             recipient_list=['to@example.com']
#         )
#
#         result.get(timeout=5)
#
#         self.assertEqual(result.status, 'SUCCESS')
#         self.assertIsNone(result.result, 'Task result should be None for send_mail')
