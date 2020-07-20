package com.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.util.UUID;

public class ReportRecord {

    private final UUID id;
    private Timestamp startTime;
    private Timestamp endTime;
    private String server;
    private int intervalInMinutes;

    public ReportRecord(@JsonProperty("id") UUID id,
                        @JsonProperty("start_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSS") Timestamp startTime,
                        @JsonProperty("end_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSS")Timestamp endTime,
                        @JsonProperty("server") String server,
                        @JsonProperty("interval_in_minutes") int intervalInMinutes
    )
    {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.server = server;
        this.intervalInMinutes = intervalInMinutes;
    }

    public UUID getId() { return id; }

    public Timestamp getStartTime() {
        return startTime;
    }

    public Timestamp getEndTime()
    {
        return endTime;
    }

    public String getServer()
    {
        return server;
    }

    public int getIntervalInMinutes()
    {
        return intervalInMinutes;
    }

    @Override
    public String toString()
    {
        String endStr = endTime != null ? endTime.toString() : "Still going";
        return "Report Record " + id.toString() + " starting: " + startTime.toString() + " to ending: " + endStr +
                " from server: " + server + " with intervals of: " + intervalInMinutes + " minutes";
    }
}