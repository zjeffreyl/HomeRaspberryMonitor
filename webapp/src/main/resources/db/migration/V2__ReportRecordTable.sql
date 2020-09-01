CREATE TABLE report_record (
    id UUID NOT NULL PRIMARY KEY,
    record_name VARCHAR(100),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    server VARCHAR(100) NOT NULL,
    interval_in_minutes INTEGER NOT NULL
);
