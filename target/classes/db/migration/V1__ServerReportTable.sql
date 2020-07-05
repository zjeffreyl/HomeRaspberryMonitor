CREATE TABLE server_report (
    id UUID NOT NULL PRIMARY KEY,
    download NUMERIC NOT NULL,
    upload NUMERIC NOT NULL,
    ping NUMERIC NOT NULL,
    recorded_at TIMESTAMP NOT NULL
);