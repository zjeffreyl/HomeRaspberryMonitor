FROM arm32v7/ubuntu:latest

WORKDIR /python-code

RUN apt-get update && apt-get install python3.6
RUN apt-get install -y postgresql-client
RUN apt-get -y install python3-pip
RUN apt-get install python3-psycopg2
RUN apt-get install -y curl
RUN apt-get install -y cron
RUN touch cron.log
RUN pip3 install requests
RUN pip3 install python-crontab
RUN pip3 install pytz
RUN pip3 install tzlocal
RUN apt-get install speedtest-cli
#RUN pip3 install speedtest-cli
# Editor for debugging purposes 
RUN apt-get update
RUN apt-get -y install vim

COPY . .
RUN ["chmod", "+x", "./wait-for-it.sh"]

CMD ["./wait-for-it.sh", "raspberry-postgres", "python3", "postgresListener.py"]