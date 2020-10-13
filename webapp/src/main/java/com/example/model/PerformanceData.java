package com.example.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PerformanceData {

    private String name;
    private List<Object[]> data;

    public PerformanceData(String name, List<Object[]> data)
    {
        this.name = name;
        this.data = data;
    }
}
