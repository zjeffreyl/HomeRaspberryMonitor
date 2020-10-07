package com.example.service;

import com.example.dao.ServerReportDao;
import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServerReportService {
    private final ServerReportDao serverReportDao;

    @Autowired
    public ServerReportService(@Qualifier("postgres-serverReport") ServerReportDao serverReportDao) {
        this.serverReportDao = serverReportDao;
    }

    public List<ServerReport> getAllServerReportsByRecordId(UUID id) {
        return serverReportDao.selectAllServerReportsByRecordId(id);
    }

    public List<ServerReport> getAllServerReports()
    {
        return serverReportDao.selectAllServerReports();
    }

    public int insertServerReport(ServerReport report) {
        return serverReportDao.insertServerReport(report); }

    public Optional<ServerReport> getServerReportsById(UUID id)
    {
        return serverReportDao.selectServerReportById(id);
    }

    public int deleteServerReportById(UUID id)
    {
        return serverReportDao.deleteServerReportById(id);
    }

    public int updateServerReportById(UUID id, ServerReport report)
    {
        return serverReportDao.updateServerReportById(id, report);
    }

    public Timestamp getMostRecentTimestamp()
    {
        return serverReportDao.mostRecentServerReportTimestamp();
    }

    public List<ServerReport> getServerInTimestampRangeByRecordId(Timestamp startDate, Timestamp endDate, UUID reportRecordId) {
        return serverReportDao.selectServerReportByDate(startDate, endDate, reportRecordId);
    }
}
