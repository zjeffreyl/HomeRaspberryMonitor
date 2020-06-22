package com.example.dao;

import com.example.model.ServerReport;

import java.util.List;

public interface ServerReportDao {
    void insertServerReport(ServerReport cus);
    void insertServerReports(List<ServerReport> report);
    List<ServerReport> getAllServerReport();
    ServerReport getServerReportById(int reportId);
}
