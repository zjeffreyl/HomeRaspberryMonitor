import subprocess
import sys
import json
import datetime
import requests

URL = "http://raspberry-web-app:8080/api/serverReport/"
speedtest = "speedtest-cli"


def main(argv):
    recorded_at = datetime.datetime.now()
    print(argv)
    if len(argv) != 2:
        print("ERROR: There was no report record stated")
        return
    report_record_id = argv[0]
    server_id = argv[1]
    response = subprocess.check_output(
        "{} --json --server {}".format(speedtest, server_id), shell=True)
    response = json.loads(str(response.decode()))
    data_obj = {
        'download': response['download'],
        'upload': response['upload'],
        'ping': response['ping'],
        'recorded_at': recorded_at.strftime("%Y-%m-%-d %-H:%-M"),
        'report_record_id': report_record_id
    }
    x = requests.post(URL, json=data_obj)
    print(x)


if __name__ == '__main__':
    main(sys.argv[1:])
