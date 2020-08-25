#!/bin/sh
# wait-for-postgres.sh

set -e
  
host="$1"
shift
cmd="$@"
  
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done
service cron start
>&2 echo "Postgres is up"

HEALTH_URL=http://$SERVER:8080/actuator/health
# wait until spring boot is ready
until curl --silent --output -X GET $HEALTH_URL --ipv4; do
  >&2 echo "Spring is unavailable - sleeping \n"
  sleep 2
done
>&2 echo "Spring is up"

exec $cmd