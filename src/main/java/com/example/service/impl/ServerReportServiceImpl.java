package com.example.service.impl;

import com.example.dao.ServerReportDao;
import com.example.model.ServerReport;
import com.example.service.ServerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ServerReportServiceImpl implements ServerReportService {

    @Autowired
    ServerReportDao serverReportDao;

    @Override
    public void insertServerReport(ServerReport report) {
        serverReportDao.insertServerReport(report);
    }

    @Override
    public void insertServerReports(List<ServerReport> serverReports) {
        serverReportDao.insertServerReports(serverReports);
    }

    @Override
    public void getAllServerReports() {
        List<ServerReport> reports = serverReportDao.getAllServerReport();
        for(ServerReport report: reports)
        {
            System.out.println(report.toString());
        }
    }

    @Override
    public void getServerReportById(int serverReportId) {
        ServerReport report = serverReportDao.getServerReportById(serverReportId);
        System.out.println(report);
    }
}
