CREATE TABLE server_report (
    id UUID PRIMARY KEY,
    download NUMERIC,
    upload NUMERIC,
    ping NUMERIC,
    recorded_at TIMESTAMPTZ NOT NULL,
    report_record_id UUID NOT NULL
);