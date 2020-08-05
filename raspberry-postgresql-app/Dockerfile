FROM postgres:latest

WORKDIR /code

RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get -y install python3.7
RUN pip3 install python-crontab
RUN apt-get install libpq-dev
RUN pip3 install psycopg2

COPY . .

CMD ["python3", "postgresListener.py"]