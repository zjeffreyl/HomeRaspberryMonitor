CREATE TABLE report_record (
    id UUID NOT NULL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    server VARCHAR(100) NOT NULL,
    interval_in_minutes INTEGER NOT NULL
);

CREATE OR REPLACE FUNCTION report_records_notify_func()
RETURNS trigger AS
$BODY$

BEGIN
PERFORM pg_notify('report_records_updates', NEW.ID::text);
RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql VOLATILE
COST 100;
ALTER FUNCTION report_records_notify_func()
OWNER TO postgres;

CREATE TRIGGER add_report_records_event trigger
AFTER INSERT or UPDATE or DELETE
ON report_record
FOR EACH ROW
EXECUTE PROCEDURE report_records_notify_func();
