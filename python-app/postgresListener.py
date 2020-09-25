import psycopg2
import select
from crontab import CronTab
import socket
import time
import os
import requests
import json
import serverFinder

URL = "http://raspberry-web-app:8080/api/reportRecord/"
HEALTH_URL = "http://raspberry-web-app:8080/actuator/health/"
raspberry_comment = "Raspberry Pi speed test id: "


def generate_comment(id):
    return raspberry_comment + id


def schedule_cron(notify_payload, my_cron, report_record_id, server_id):
    print("Payload: " + str(notify_payload))
    job_exists = False
    for job in my_cron:
        # if this job already exists
        if job.comment == generate_comment(report_record_id):
            job_exists = True
            # write_interval_in_minutes(
            #     job, my_cron, notify_payload['interval_in_minutes'])
            # print("Set job for " + notify_payload['id'] + "again")
            break

    if job_exists is False:
        # Add a new crontab
        new_job = my_cron.new(command='/usr/bin/python3 {}/speedtest.py {} {} >> {}/cron.log 2>&1'.format(os.environ['PWD'], report_record_id, server_id, os.environ['PWD']),
                              comment=generate_comment(notify_payload['id']))
        write_interval(
            new_job, my_cron, notify_payload['interval_in_minutes'], notify_payload['start_hour'], notify_payload['end_hour'])
        print("Set job for " + notify_payload['id'])


def write_interval(job, my_cron, interval_in_minutes, start_hour, end_hour):
    s = " * * *"
    s_hour = start_hour.split(':')[0]
    e_hour = int(end_hour.split(':')[0]) - 1
    s = s_hour + "-" + str(e_hour) + s
    minutes = 0
    if interval_in_minutes < 60:
        minutes = "*/" + str(interval_in_minutes)
    s = str(minutes) + " " + str(s)
    job.setall(s)
    my_cron.write()
    print("Set " + s)
    if interval_in_minutes < 60:
        # Need to set the last one
        other_job = job
        print("Set " + "0 " + str(e_hour + 1) + " * * *")
        job.setall("0 " + str(e_hour + 1) + " * * *")
        my_cron.write()


def delete_cron(my_cron, report_record_id):
    for job in my_cron:
        if job.comment == generate_comment(report_record_id):
            my_cron.remove(job)
            my_cron.write()
            break
    print("Deleted job for " + report_record_id)


# Will not have to make any server updates here as this is determined by the frontend
def process_payload(notify_payload, my_cron):
    report_record_id = notify_payload['id']
    if notify_payload['_op'] == 'DELETE':
        delete_cron(my_cron, report_record_id)
    else:
        server_id = notify_payload['server_id']
        schedule_cron(notify_payload, my_cron, report_record_id, server_id)

# refreshing the crontab based on the existing database


def refresh_crontab(my_cron):
    for job in my_cron:
        if raspberry_comment in job.comment:
            my_cron.remove(job)
            my_cron.write()
    res = requests.get(URL)
    data = res.json()
    print(str(data))
    for dict_item in data:
        print("Scheduling " + str(dict_item['id']))
        schedule_cron(dict_item, my_cron,
                      dict_item['id'], dict_item['server_id'])


def create_json(dict_item):
    data_obj = {
        "id": dict_item['id'],
        "start_time": dict_item['start_time'],
        "end_time": dict_item['end_time'],
        "server_id": dict_item['server_id'],
        "interval_in_minutes": dict_item['interval_in_minutes']
    }
    return data_obj


conn = psycopg2.connect(user=os.environ['POSTGRES_USER'], database=os.environ['POSTGRES_DB'],
                        host=os.environ['DB_SERVER'], password=os.environ['POSTGRES_PASSWORD'])

conn.autocommit = True
cursor = conn.cursor()

# put all nearby servers into the database
serverFinder.update_servers(cursor)

# Remove all in crontab and put all in postgres db
my_cron = CronTab(user=os.environ['USER'])
refresh_crontab(my_cron)
cursor.execute('LISTEN report_records_updates;')

while True:
    if select.select([conn], [], [], 5) != ([], [], []):
        conn.poll()
        while conn.notifies:
            notify = conn.notifies.pop(0)
            print("Payload: " + str(notify.payload))
            str_val = notify.payload.replace("null", "None")
            process_payload(eval(str_val), my_cron)
