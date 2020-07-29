package com.example.dao;

import com.example.model.ReportRecord;
import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-reportRecord")
public class ReportRecordDataAccessService implements ReportRecordDao{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReportRecordDataAccessService(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertReportRecord(UUID id, ReportRecord reportRecord) {
        String sql = "INSERT INTO report_record VALUES (?, ?, ?, ?, ?)";
        Object[] params = new Object[]{id, reportRecord.getStartTime(), reportRecord.getEndTime(), reportRecord.getServer(), reportRecord.getIntervalInMinutes()};
        System.out.println("Intervals: " + reportRecord.getIntervalInMinutes());
        try {
            jdbcTemplate.update(sql, params);
            return 1;
        }catch(DataAccessException exc)
        {
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public List<ReportRecord> selectAllReportRecords() {
        String sql = "SELECT id, start_time, end_time, server, interval_in_minutes FROM report_record";
        List<ReportRecord> reportRecords = jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new ReportRecord(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getTimestamp("start_time"),
                    resultSet.getTimestamp("end_time"),
                    resultSet.getString("server"),
                    resultSet.getInt("interval_in_minutes")
            );
        }));
        return reportRecords;
    }

    @Override
    public int deleteReportRecordById(UUID id) {
        final String sql = "DELETE FROM report_record WHERE id = ?";
        try
        {
            jdbcTemplate.update(sql, id);
            return 1;
        }
        catch(DataAccessException exc)
        {
            return 0;
        }
    }

    @Override
    public int updateReportRecordById(UUID id, ReportRecord reportRecord) {
        final String sql = "UPDATE report_record SET start_time = ?, end_time = ?, server = ?, interval_in_minutes = ? WHERE id = \'" + id + "\'";
        try
        {
            jdbcTemplate.update(sql, new Object[] {reportRecord.getStartTime(), reportRecord.getEndTime(), reportRecord.getServer(), reportRecord.getIntervalInMinutes()});
            return 1;
        }
        catch(DataAccessException exc)
        {
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public Optional<ReportRecord> selectReportRecordById(UUID id) {
        final String sql = "SELECT * FROM report_record WHERE id = ?";
        ReportRecord report = jdbcTemplate.queryForObject(sql, new Object[] {id}, ((resultSet, i) -> {
            return new ReportRecord(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getTimestamp("start_time"),
                    resultSet.getTimestamp("end_time"),
                    resultSet.getString("server"),
                    resultSet.getInt("interval_in_minutes")
            );
        }));
        return Optional.ofNullable(report);
    }
}
