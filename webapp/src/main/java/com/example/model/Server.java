package com.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Server {
    private int id;
    private String name;
    private String location;

    public Server(@JsonProperty("id") int id, 
                 @JsonProperty("name") String name,
                 @JsonProperty("location") String location)
    {
        this.id = id;
        this.name = name;
        this.location = location;
    }

    public int getId() { return id; }

    public String getName() { return name; }

    public String getLocation() { return location; }

    @Override
    public String toString()
    {
        return getId() + ") " + getName() + " at " + getLocation();
    }
}