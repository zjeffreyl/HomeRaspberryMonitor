package com.example.service;

import com.example.model.ServerReport;
import java.util.List;

public interface ServerReportService {
    void insertServerReports(ServerReport report);
    void insertServerReports(List<ServerReport> serverReports);
    void getAllServerReports();
    void getServerReportById(int serverReportId);
}
