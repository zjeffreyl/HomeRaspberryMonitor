package com.example.dao;

import com.example.model.ReportRecord;
import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-serverReport")
public class ServerReportDataAccessService implements ServerReportDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ServerReportDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertServerReport(UUID id, ServerReport serverReport) {
        String sql = "INSERT INTO server_report VALUES (?, ?, ?, ?, ?, ?)";
        Object[] params = new Object[] { id, serverReport.getDownload(), serverReport.getUpload(),
                serverReport.getPing(), serverReport.getTimestamp(), serverReport.getReportRecordId() };
        try {
            jdbcTemplate.update(sql, params);
            return 1;
        } catch (DataAccessException exc) {
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public List<ServerReport> selectAllServerReportsByRecordId(UUID id) {
        String sql = "SELECT id, download, upload, ping, recorded_at, report_record_id FROM server_report WHERE report_record_id = '"
                + id.toString() + "' ORDER BY recorded_at";
        List<ServerReport> serverReports = jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new ServerReport(UUID.fromString(resultSet.getString("id")), resultSet.getDouble("download"),
                    resultSet.getDouble("upload"), resultSet.getDouble("ping"), resultSet.getTimestamp("recorded_at"),
                    UUID.fromString(resultSet.getString("report_record_id")));
        }));
        serverReports.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        return serverReports;
    }

    @Override
    public List<ServerReport> selectAllServerReports() {
        String sql = "SELECT id, download, upload, ping, recorded_at, report_record_id FROM server_report ORDER BY recorded_at";
        List<ServerReport> serverReports = jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new ServerReport(UUID.fromString(resultSet.getString("id")), resultSet.getDouble("download"),
                    resultSet.getDouble("upload"), resultSet.getDouble("ping"), resultSet.getTimestamp("recorded_at"),
                    UUID.fromString(resultSet.getString("report_record_id")));
        }));
        serverReports.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        return serverReports;
    }

    @Override
    public int deleteServerReportById(UUID id) {
        final String sql = "DELETE FROM server_report WHERE report_record_id = ?";
        try {
            jdbcTemplate.update(sql, id);
            return 1;
        } catch (DataAccessException exc) {
            return 0;
        }
    }

    @Override
    public int updateServerReportById(UUID id, ServerReport serverReport) {
        final String sql = "UPDATE server_report SET download = ?, upload = ?, ping = ?, timestamp = ?, record_report_id = ? WHERE id = "
                + "\'" + id + "\'";
        try {
            jdbcTemplate.update(sql, new Object[] { serverReport.getDownload(), serverReport.getUpload(),
                    serverReport.getPing(), serverReport.getTimestamp(), serverReport.getReportRecordId() });
            return 1;
        } catch (DataAccessException exc) {
            System.out.println("With: " + sql);
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public Optional<ServerReport> selectServerReportById(UUID id) {
        final String sql = "SELECT * FROM server_report WHERE id = ? ORDER BY recorded_at";
        ServerReport report = jdbcTemplate.queryForObject(sql, new Object[] { id }, ((resultSet, i) -> {
            return new ServerReport(UUID.fromString(resultSet.getString("id")), resultSet.getDouble("download"),
                    resultSet.getDouble("upload"), resultSet.getDouble("ping"), resultSet.getTimestamp("recorded_at"),
                    UUID.fromString(resultSet.getString("report_record_id")));
        }));
        return Optional.ofNullable(report);
    }

    @Override
    public Timestamp mostRecentServerReportTimestamp() {
        final String sql = "SELECT MAX(recorded_at) FROM server_report";
        return jdbcTemplate.queryForObject(sql, ((resultSet, i) -> resultSet.getTimestamp("max")));
    }

    @Override
    public List<ServerReport> selectServerReportByDate(Timestamp startDate, Timestamp endDate, UUID reportRecordId) {
        System.out.println(startDate);
        System.out.println(endDate);
        final String sql = "SELECT * FROM server_report WHERE recorded_at >= ? AND recorded_at <= ? AND report_record_id = ?";
        List<ServerReport> serverReports = jdbcTemplate.query(sql, new Object[] { startDate, endDate, reportRecordId },
                ((resultSet, i) -> {
                    return new ServerReport(UUID.fromString(resultSet.getString("id")), resultSet.getDouble("download"),
                            resultSet.getDouble("upload"), resultSet.getDouble("ping"),
                            resultSet.getTimestamp("recorded_at"),
                            UUID.fromString(resultSet.getString("report_record_id")));
                }));
        return serverReports;
    }
}
