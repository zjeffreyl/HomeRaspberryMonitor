import subprocess
import psycopg2
import psycopg2.extras
import sys
import json
import datetime
import requests

URL = "http://localhost:8080/api/serverReport/"

def main(argv):
	recorded_at = datetime.datetime.now()
	print(recorded_at.strftime("%Y-%m-%-d %-H:%-M:%-S.%f"))
	if len(argv) != 1:
		print("ERROR: There was no report record stated")
		return
	report_record_id = argv[0]

	response = subprocess.check_output("speedtest-cli --json", shell=True)
	response = json.loads(str(response.decode()))
	data_obj = {
		'download' : response['download'],
		'upload' : response['upload'],
		'ping' : response['ping'],
		'recorded_at' : recorded_at.strftime("%Y-%m-%-d %-H:%-M:%-S.%f"),
		'report_record_id' : report_record_id
	}
	x = requests.post(URL, json=data_obj)
	print(x)


if __name__ == '__main__':
	main(sys.argv[1:])
