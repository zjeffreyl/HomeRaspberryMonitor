package com.example.dao;

import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class ServerReportDataAccessService implements ServerReportDao{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ServerReportDataAccessService(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertServerReport(UUID id, ServerReport serverReport) {
        return 0;
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
        return 0;
    }

    @Override
    public Optional<ServerReport> selectServerReportById(UUID id) {
        return Optional.empty();
    }
}
