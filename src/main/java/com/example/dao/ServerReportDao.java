package com.example.dao;

import com.example.model.ServerReport;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServerReportDao {
    int insertServerReport(UUID id, ServerReport serverReport);

    default int insertServerReport(ServerReport serverReport)
    {
        UUID id = UUID.randomUUID();
        return insertServerReport(id, serverReport);
    }

    List<ServerReport> selectAllServerReports();

    int deleteServerReportById(UUID id);

    Optional<ServerReport> selectServerReportById(UUID id);
}
