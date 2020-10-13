import subprocess
import sys
import json
import datetime
import requests

URL = "http://raspberry-web-app:8080/api/serverReport/"


def main(argv):
    recorded_at = datetime.datetime.now()
    print("Interval ended")
    if len(argv) != 1:
        return
    report_record_id = argv[0]
    data_obj = {
        'recorded_at': recorded_at.strftime("%Y-%m-%-d %-H:%-M"),
        'report_record_id': report_record_id
    }
    x = requests.post(URL, json=data_obj)


if __name__ == '__main__':
    main(sys.argv[1:])
