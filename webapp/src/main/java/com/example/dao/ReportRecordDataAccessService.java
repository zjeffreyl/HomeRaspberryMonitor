package com.example.dao;

import com.example.model.ReportRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-reportRecord")
public class ReportRecordDataAccessService implements ReportRecordDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReportRecordDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public ReportRecord insertReportRecord(UUID id, ReportRecord reportRecord) {
        String sql = "INSERT INTO report_record VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        Object[] params = new Object[] { id, reportRecord.getName(), reportRecord.getStartTime(),
                reportRecord.getEndTime(), reportRecord.getStartHour(), reportRecord.getEndHour(),
                reportRecord.getServerId(), reportRecord.getIntervalInMinutes() };
        try {
            jdbcTemplate.update(sql, params);
            reportRecord.setId(id);
            return reportRecord;
        } catch (DataAccessException exc) {
            System.out.println(exc.toString());
            return null;
        }
    }

    @Override
    public List<ReportRecord> selectAllReportRecords() {
        String sql = "SELECT id, record_name, start_time, end_time, start_hour, end_hour, server_id, interval_in_minutes FROM report_record";
        return jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new ReportRecord(UUID.fromString(resultSet.getString("id")), resultSet.getString("record_name"),
                    resultSet.getTimestamp("start_time"), resultSet.getTimestamp("end_time"),
                    resultSet.getTime("start_hour"), resultSet.getTime("end_hour"), resultSet.getInt("server_id"),
                    resultSet.getInt("interval_in_minutes"));
        }));
    }

    @Override
    public ReportRecord deleteReportRecordById(UUID id) {
        final String sql = "DELETE FROM report_record WHERE id = ?";
        Optional<ReportRecord> reportRecord = selectReportRecordById(id);
        try {
            jdbcTemplate.update(sql, id);
            return reportRecord.orElse(null);
        } catch (DataAccessException exc) {
            return null;
        }
    }

    @Override
    public int updateReportRecordById(UUID id, ReportRecord reportRecord) {
        final String sql = "UPDATE report_record SET record_name = ?, start_time = ?, end_time = ?, start_hour = ?, end_hour = ?, server_id = ?, interval_in_minutes = ? WHERE id = \'"
                + id + "\'";
        try {
            jdbcTemplate.update(sql,
                    new Object[] { reportRecord.getName(), reportRecord.getStartTime(), reportRecord.getStartHour(),
                            reportRecord.getEndHour(), reportRecord.getEndTime(), reportRecord.getServerId(),
                            reportRecord.getIntervalInMinutes() });
            return 1;
        } catch (DataAccessException exc) {
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public Optional<ReportRecord> selectReportRecordById(UUID id) {
        final String sql = "SELECT * FROM report_record WHERE id = ?";
        ReportRecord report = jdbcTemplate.queryForObject(sql, new Object[] { id }, ((resultSet, i) -> {
            return new ReportRecord(UUID.fromString(resultSet.getString("id")), resultSet.getString("record_name"),
                    resultSet.getTimestamp("start_time"), resultSet.getTimestamp("end_time"),
                    resultSet.getTime("start_hour"), resultSet.getTime("end_hour"), resultSet.getInt("server_id"),
                    resultSet.getInt("interval_in_minutes"));
        }));
        return Optional.ofNullable(report);
    }
}
