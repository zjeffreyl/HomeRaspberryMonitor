DROP TABLE IF EXISTS server_report;

CREATE TABLE server_report (
  serverReportId int NOT NULL PRIMARY KEY,
  download DOUBLE NOT NULL,
  upload DOUBLE NOT NULL,
  ping DOUBLE NOT NULL,
  recordedAt TIMESTAMP NOT NULL
);