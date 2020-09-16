package com.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.util.UUID;

public class ReportRecord {

    private final UUID id;
    private Timestamp startTime;
    private Timestamp endTime;
    private int server_id;
    private int intervalInMinutes;
    private String name;

    public ReportRecord(@JsonProperty("id") UUID id,
                        @JsonProperty("record_name") String name,
                        @JsonProperty("start_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSS") Timestamp startTime,
                        @JsonProperty("end_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSS")Timestamp endTime,
                        @JsonProperty("server_id") int server_id,
                        @JsonProperty("interval_in_minutes") int intervalInMinutes
    )
    {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.server_id = server_id;
        this.intervalInMinutes = intervalInMinutes;
        this.name = name;
    }

    public UUID getId() { return id; }

    public Timestamp getStartTime() {
        return startTime;
    }

    public Timestamp getEndTime()
    {
        return endTime;
    }

    public int getServer()
    {
        return server_id;
    }

    public int getIntervalInMinutes()
    {
        return intervalInMinutes;
    }

    public String getName() { return name; }

    @Override
    public String toString()
    {
        String endStr = endTime != null ? endTime.toString() : "Still going";
        return "Report Record " + id.toString() + " starting: " + startTime.toString() + " to ending: " + endStr +
                " from server: " + server_id + " with intervals of: " + intervalInMinutes + " minutes";
    }
}
