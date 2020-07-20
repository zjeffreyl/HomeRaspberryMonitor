package com.example.service;

import com.example.dao.ReportRecordDao;
import com.example.model.ReportRecord;
import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReportRecordService {
    private final ReportRecordDao reportRecordDao;

    @Autowired
    public ReportRecordService(@Qualifier("postgres-reportRecord") ReportRecordDao reportRecordDao)
    {
        this.reportRecordDao = reportRecordDao;
    }

    public List<ReportRecord> getAllReportRecords()
    {
        return reportRecordDao.selectAllReportRecords();
    }

    public int insertReportRecord(ReportRecord report) {
        return reportRecordDao.insertReportRecord(report); }

    public Optional<ReportRecord> getReportRecordById(UUID id)
    {
        return reportRecordDao.selectReportRecordById(id);
    }

    public int deleteReportRecordById(UUID id)
    {
        return reportRecordDao.deleteReportRecordById(id);
    }

    public int updateReportRecordById(UUID id, ReportRecord report)
    {
        return reportRecordDao.updateReportRecordById(id, report);
    }
}
