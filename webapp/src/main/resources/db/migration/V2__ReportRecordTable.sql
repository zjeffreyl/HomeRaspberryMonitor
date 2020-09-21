CREATE TABLE report_record (
    id UUID NOT NULL PRIMARY KEY,
    record_name VARCHAR(100),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    server_id NUMERIC NOT NULL,
    interval_in_minutes INTEGER NOT NULL
);
