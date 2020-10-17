package com.example.dao;

import com.example.model.PerformanceData;
import com.example.model.ServerReport;

import java.sql.Timestamp;
import java.util.*;

public interface ServerReportDao {
    int insertServerReport(UUID id, ServerReport serverReport);

    default int insertServerReport(ServerReport serverReport)
    {
        UUID id = UUID.randomUUID();
        return insertServerReport(id, serverReport);
    }

    List<ServerReport> selectAllServerReportsByRecordId(UUID id);
    
    List<ServerReport> selectAllServerReports();

    int deleteServerReportById(UUID id);

    int updateServerReportById(UUID id, ServerReport serverReport);

    Optional<ServerReport> selectServerReportById(UUID id);

    Timestamp mostRecentServerReportTimestamp();

    List<List<Object[]>> getPerformanceDataByDate(Timestamp startDate, Timestamp endDate, UUID reportRecordId);

    Double averagePing(Timestamp startDate, Timestamp endDate);

    Double averageDownload(Timestamp startDate, Timestamp endDate);

    Double averageUpload(Timestamp startDate, Timestamp endDate);
}
