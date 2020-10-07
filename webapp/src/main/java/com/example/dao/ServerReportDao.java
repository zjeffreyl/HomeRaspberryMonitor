package com.example.dao;

import com.example.model.ServerReport;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

    List<ServerReport> selectServerReportByDate(Timestamp startDate, Timestamp endDate, UUID reportRecordId);
}
