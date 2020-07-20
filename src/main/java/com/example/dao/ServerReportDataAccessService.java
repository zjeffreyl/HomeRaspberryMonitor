package com.example.dao;

import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-serverReport")
public class ServerReportDataAccessService implements ServerReportDao{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ServerReportDataAccessService(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertServerReport(UUID id, ServerReport serverReport) {
        String sql = "INSERT INTO server_report VALUES (?, ?, ?, ?, ?)";
        Object[] params = new Object[]{id, serverReport.getDownload(), serverReport.getUpload(), serverReport.getPing(), serverReport.getTimestamp()};
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
    public List<ServerReport> selectAllServerReports() {
        String sql = "SELECT id, download, upload, ping, recorded_at FROM server_report";
        List<ServerReport> serverReports = jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new ServerReport(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getDouble("download"),
                    resultSet.getDouble("upload"),
                    resultSet.getDouble("ping"),
                    resultSet.getTimestamp("recorded_at")
            );
        }));
        return serverReports;
    }

    @Override
    public int deleteServerReportById(UUID id) {
        final String sql = "DELETE FROM server_report WHERE id = ?";
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
    public int updateServerReportById(UUID id, ServerReport serverReport) {
        final String sql = "UPDATE server_report SET download = ?, upload = ?, ping = ?, timestamp = ? WHERE id = " + id;
        try
        {
            jdbcTemplate.update(sql, new Object[] {serverReport.getDownload(), serverReport.getUpload(), serverReport.getPing(), serverReport.getTimestamp()});
            return 1;
        }
        catch(DataAccessException exc)
        {
            return 0;
        }
    }

    @Override
    public Optional<ServerReport> selectServerReportById(UUID id)
    {
        final String sql = "SELECT * FROM server_report WHERE id = ?";
        ServerReport report = jdbcTemplate.queryForObject(sql, new Object[] {id}, ((resultSet, i) -> {
            return new ServerReport(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getDouble("download"),
                    resultSet.getDouble("upload"),
                    resultSet.getDouble("ping"),
                    resultSet.getTimestamp("recorded_at")
            );
        }));
        return Optional.ofNullable(report);
    }
}
