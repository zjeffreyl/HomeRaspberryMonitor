package com.example.model;

import java.sql.Timestamp;

public class ServerReport {
    private double download;
    private double upload;
    private double ping;
    private Timestamp timestamp;

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
        return timestamp;
    }

    public void setDownload(double download) {
        this.download = download;
    }

    public void setPing(double ping) {
        this.ping = ping;
    }

    public void setUpload(double upload) {
        this.upload = upload;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Server Report at " + timestamp.toString()+ " [download=" + download + ", upload=" + upload + ", ping= " + ping + "]";
    }
}
