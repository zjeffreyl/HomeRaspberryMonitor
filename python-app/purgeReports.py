import requests

URL = "http://raspberry-web-app:8080/api/delete/days=15"


def main(argv):
    x = requests.post(URL, json={})


if __name__ == "__main__":
    main()
