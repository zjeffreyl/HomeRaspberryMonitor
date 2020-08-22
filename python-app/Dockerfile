FROM python:3-slim

WORKDIR /python-code

RUN apt-get update && apt-get install -y libpq-dev gcc
# need gcc to compile psycopg2
RUN pip3 install psycopg2~=2.6
RUN apt-get autoremove -y gcc
RUN pip3 install python-crontab
COPY . .

CMD ["python3", "postgresListener.py"]