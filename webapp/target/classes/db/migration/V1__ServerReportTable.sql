CREATE TABLE server_report (
    id UUID PRIMARY KEY,
    download NUMERIC NOT NULL,
    upload NUMERIC NOT NULL,
    ping NUMERIC NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL,
    report_record_id UUID NOT NULL
);