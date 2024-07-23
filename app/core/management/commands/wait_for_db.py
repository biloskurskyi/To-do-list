import time

from django.core.management.base import BaseCommand
from django.db.utils import OperationalError
from psycopg2 import OperationalError as Psycopg2OpError


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_up = False
        attempt = 1
        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
                self.stdout.write(self.style.SUCCESS('Database available!'))
            except (Psycopg2OpError, OperationalError) as e:
                self.stdout.write(f'Attempt {attempt}: Database down, waiting 20 seconds...')
                attempt += 1
                time.sleep(20)
                self.stdout.write(f'Error: {str(e)}')
    # def handle(self, *args, **options):
    #     self.stdout.write('Waiting for database...')
    #     db_up = False
    #     while db_up is False:
    #         try:
    #             self.check(databases=['default'])
    #             db_up = True
    #         except (Psycopg2OpError, OperationalError):
    #             self.stdout.write('Database down, waiting 20 seconds...')
    #             time.sleep(20)
    #     self.stdout.write(self.style.SUCCESS('Database available!'))
