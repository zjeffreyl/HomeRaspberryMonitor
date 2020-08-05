package com.example.dao;

import com.example.model.ReportRecord;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReportRecordDao {
    int insertReportRecord(UUID id, ReportRecord reportRecord);

    default int insertReportRecord(ReportRecord reportRecord)
    {
        UUID id = UUID.randomUUID();
        return insertReportRecord(id, reportRecord);
    }

    List<ReportRecord> selectAllReportRecords();

    int deleteReportRecordById(UUID id);

    int updateReportRecordById(UUID id, ReportRecord reportRecord);

    Optional<ReportRecord> selectReportRecordById(UUID id);
}
