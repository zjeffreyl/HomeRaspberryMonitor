package com.example.model;

import java.sql.Timestamp;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.decimal4j.util.DoubleRounder;

import javax.validation.constraints.NotNull;

public class ServerReport {

    private final UUID id;
    private Double download;
    private Double upload;
    private Double ping;
    private final UUID reportRecordId;
    @NotNull
    private Timestamp recordedAt;

    public ServerReport(@JsonProperty("id") UUID id, @JsonProperty("download") Double download,
            @JsonProperty("upload") Double upload, @JsonProperty("ping") Double ping,
            @JsonProperty("recorded_at") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "UTC") Timestamp recordedAt,
            @JsonProperty("report_record_id") UUID reportRecordId) {
        this.id = id;
        this.download = download;
        this.upload = upload;
        this.ping = ping;
        this.reportRecordId = reportRecordId;
        this.recordedAt = recordedAt;
    }

    public UUID getId() {
        return id;
    }

    public Double getDownload() {
        if(download == null) return null;
        return DoubleRounder.round(download, 3);
    }

    public Double getUpload() {
        if(upload == null) return null;
        return DoubleRounder.round(upload, 3);
    }

    public Double getPing() {
        if(ping == null) return null;
        return DoubleRounder.round(ping, 3);
    }

    public Timestamp getTimestamp() {
        return recordedAt;
    }

    public UUID getReportRecordId() {
        return reportRecordId;
    }

    @Override
    public String toString() {
        return "Server Report " + id.toString() + " at " + recordedAt.toString() + " [download=" + getDownload()
                + ", upload=" + getUpload() + ", ping= " + getPing() + "] +  from " + reportRecordId;
    }
}
