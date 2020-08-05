CREATE OR REPLACE FUNCTION report_records_notify_func() RETURNS trigger AS $$
DECLARE
    payload text;
BEGIN
    IF TG_OP = 'DELETE' THEN
        payload := row_to_json(tmp)::text FROM (
            SELECT OLD.id as id,
            TG_OP as _op
        ) tmp;
    else
       payload := row_to_json(tmp)::text FROM (
            SELECT NEW.*,
            TG_OP as _op
       ) tmp;
    END IF;
PERFORM pg_notify('report_records_updates', payload);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_report_records_event
AFTER INSERT or UPDATE or DELETE
ON report_record
FOR EACH ROW
EXECUTE PROCEDURE report_records_notify_func();