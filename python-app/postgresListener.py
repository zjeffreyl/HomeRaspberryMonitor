import psycopg2
import select
from crontab import CronTab
import socket
import time
import os


def generate_comment(id):
    return 'Raspberry Pi speed test id: ' + id


def schedule_cron(notify_payload, my_cron, report_record_id):
    job_exists = False
    for job in my_cron:
        if job.comment == generate_comment(report_record_id):
            job_exists = True
            job.minute.every(notify_payload['interval_in_minutes'])
            my_cron.write()
            print("Set job for " + notify_payload['id'])
            break

    if job_exists is False:
        # Add a new crontab
        new_job = my_cron.new(command='/usr/bin/python3 {}/speedtest.py {}'.format(os.environ['PWD'], report_record_id),
                              comment=generate_comment(notify_payload['id']))
        new_job.minute.every(notify_payload['interval_in_minutes'])
        my_cron.write()
        print("Set job for " + notify_payload['id'])


def delete_cron(my_cron, report_record_id):
    for job in my_cron:
        if job.comment == generate_comment(report_record_id):
            my_cron.remove(job)
            my_cron.write()
            break
    print("Deleted job for " + report_record_id)


# Will not have to make any server updates here as this is determined by the frontend
def process_payload(notify_payload):
    my_cron = CronTab(user=os.environ['USER'])
    report_record_id = notify_payload['id']
    if notify_payload['_op'] == 'DELETE':
        delete_cron(my_cron, report_record_id)
    else:
        schedule_cron(notify_payload, my_cron, report_record_id)


conn = psycopg2.connect(user=os.environ['POSTGRES_USER'], database=os.environ['POSTGRES_DB'],
                        host=os.environ['DB_SERVER'], password=os.environ['POSTGRES_PASSWORD'])

conn.autocommit = True
cursor = conn.cursor()
cursor.execute('LISTEN report_records_updates;')

while True:
    if select.select([conn], [], [], 5) != ([], [], []):
        conn.poll()
        while conn.notifies:
            notify = conn.notifies.pop(0)
            process_payload(eval(notify.payload))
