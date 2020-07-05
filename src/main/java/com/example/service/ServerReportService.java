package com.example.service;

import com.example.dao.ServerReportDao;
import com.example.dao.ServerReportDataAccessService;
import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerReportService {
    private final ServerReportDataAccessService serverReportDataAccessService;

    @Autowired
    public ServerReportService(@Qualifier("postgres") ServerReportDataAccessService serverReportDataAccessService) {
        this.serverReportDataAccessService = serverReportDataAccessService;
    }

    public List<ServerReport> getAllServerReports()
    {
        return serverReportDataAccessService.selectAllServerReports();
    }
}
