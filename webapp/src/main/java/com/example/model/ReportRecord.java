package com.example.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.sql.Time;
import java.util.UUID;

public class ReportRecord {

    private UUID id;
    private Timestamp startTime;
    private Timestamp endTime;
    private int serverId;
    private int intervalInMinutes;
    private String name;
    private Time startHour;
    private Time endHour;

    public ReportRecord() {
    }

    @JsonCreator
    public ReportRecord(@JsonProperty("id") UUID id, @JsonProperty("record_name") String name,
            @JsonProperty("start_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "UTC") Timestamp startTime,
            @JsonProperty("end_time") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "UTC") Timestamp endTime,
            @JsonProperty("start_hour") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "UTC") Time startHour,
            @JsonProperty("end_hour") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "UTC") Time endHour,
            @JsonProperty("server_id") int serverId, @JsonProperty("interval_in_minutes") int intervalInMinutes) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startHour = startHour;
        this.endHour = endHour;
        this.serverId = serverId;
        this.intervalInMinutes = intervalInMinutes;
        this.name = name;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public Time getStartHour() {
        return startHour;
    }

    public Time getEndHour() {
        return endHour;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public int getServerId() {
        return serverId;
    }

    public int getIntervalInMinutes() {
        return intervalInMinutes;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        String endStr = endTime != null ? endTime.toString() : "Still going";
        return "Report Record " + id.toString() + " starting: " + startTime.toString() + " to ending: " + endStr
                + " from server: " + serverId + " with intervals of: " + intervalInMinutes + " minutes";
    }
}
