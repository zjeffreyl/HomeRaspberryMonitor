package com.example.model;

import java.sql.Timestamp;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotNull;

public class ServerReport {

    private final UUID id;
    private double download;
    private double upload;
    private double ping;
    private final UUID reportRecordId;
    @NotNull
    private Timestamp recordedAt;

    public ServerReport(@JsonProperty("id") UUID id,
                        @JsonProperty("download") double download,
                        @JsonProperty("upload") double upload,
                        @JsonProperty("ping") double ping,
                        @JsonProperty("recorded_at") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS") Timestamp recordedAt,
                        @JsonProperty("report_record_id") UUID reportRecordId
    )
    {
        this.id = id;
        this.download = download;
        this.upload = upload;
        this.ping = ping;
        this.reportRecordId = reportRecordId;
        this.recordedAt = recordedAt;
    }

    public UUID getId() { return id; }

    public double getDownload() {
        return download;
    }

    public double getUpload() {
        return upload;
    }

    public double getPing() {
        return ping;
    }

    public Timestamp getTimestamp()
    {
        return recordedAt;
    }

    public UUID getReportRecordId() { return reportRecordId; }

    @Override
    public String toString() {
        return "Server Report " + id.toString() + " at " + recordedAt.toString()+ " [download=" + download + ", upload=" + upload + ", ping= " + ping + "] +  from " + reportRecordId;
    }
}
