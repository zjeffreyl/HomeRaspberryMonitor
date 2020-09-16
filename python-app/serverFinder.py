import subprocess
import json
import requests

speedtest = "speedtest-cli"
URL = "http://raspberry-web-app:8080/api/server/"

def update_servers(cursor):
    requests.delete(URL)
    add_nearby_servers(cursor)

def add_nearby_servers(cursor):
    if cursor is None:
        print("Cursor for PostgresQL connection not found")
        return
    response = subprocess.check_output("{} --list | head".format(speedtest), shell=True)
    servers = filter(filter_servers, response.decode().split('\n'))
    for server in servers:
        x = requests.post(URL, json=get_data(server))
        print(x)

def filter_servers(entry):
    entry = entry.lstrip()
    return len(entry) > 0 and entry[0].isdigit()


def get_data(line):
    data = {
        "id" : line.partition(")")[0],
        "name" : line.partition(")")[2].partition("(")[0].strip(),
        "location" : line.partition("(")[2].partition(")")[0].strip()
    }
    return data

