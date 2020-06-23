package com.example.model;

import java.sql.Timestamp;
import org.springframework.data.annotation.Id;

public class ServerReport {

    @Id
    private Long id;
    private double download;
    private double upload;
    private double ping;
    private Timestamp recordedAt;

    ServerReport(Long id, double download, double upload, double ping, Timestamp recordedAt)
    {
        this.download = download;
        this.upload = upload;
        this.ping = ping;
        this.recordedAt = recordedAt;
    }

    public static ServerReport create(double download, double upload, double ping, Timestamp recordedAt)
    {
        return new ServerReport(null, download, upload, ping, recordedAt);
    }

    void setId(Long id) {
        this.id = id;
    }

    double getDownload() {
        return download;
    }

    double getUpload() {
        return upload;
    }

    double getPing() {
        return ping;
    }

    Timestamp getTimestamp()
    {
        return recordedAt;
    }

    void setDownload(double download) {
        this.download = download;
    }

    void setPing(double ping) {
        this.ping = ping;
    }

    void setUpload(double upload) {
        this.upload = upload;
    }

    void setTimestamp(Timestamp recordedAt) {
        this.recordedAt = recordedAt;
    }

    @Override
    public String toString() {
        return "Server Report at " + recordedAt.toString()+ " [download=" + download + ", upload=" + upload + ", ping= " + ping + "]";
    }
}
