package com.example.dao;

import com.example.model.ServerReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class ServiceReportDaoImpl extends JdbcDaoSupport implements ServerReportDao {

    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public void insertServerReport(ServerReport report) {
        String sql = "INSERT INTO server_report " + "(download, upload, ping, recordedAt) VALUES (?, ?, ?, ?)" ;
        getJdbcTemplate().update(sql, new Object[]{
                report.getDownload(), report.getUpload(), report.getPing(), report.getTimestamp()
        });
    }

    @Override
    public void insertServerReports(List<ServerReport> reports) {
        String sql = "INSERT INTO server_report " + "(download, upload, ping, recordedAt) VALUES (?, ?, ?, ?)";
        getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ServerReport report = reports.get(i);
                ps.setDouble(1, report.getDownload());
                ps.setDouble(2, report.getUpload());
                ps.setDouble(3, report.getPing());
                ps.setTimestamp(4, report.getTimestamp());
            }

            public int getBatchSize() {
                return reports.size();
            }
        });
    }

    @Override
    public List<ServerReport> getAllServerReport() {
        String sql = "SELECT * FROM server_report";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);

        List<ServerReport> result = new ArrayList<ServerReport>();
        for(Map<String, Object> row:rows){
            ServerReport report = new ServerReport();
            report.setDownload((double) row.get("download"));
            report.setUpload((double) row.get("upload"));
            report.setPing((double) row.get("ping"));
            report.setTimestamp((Timestamp) row.get("recordedAt"));
            result.add(report);
        }

        return result;
    }

    @Override
    public ServerReport getServerReportById(int reportId) {
        String sql = "SELECT * FROM server_report WHERE serverReportId = ?";
        return (ServerReport) getJdbcTemplate().queryForObject(sql, new Object[]{reportId}, new RowMapper<ServerReport>(){
            @Override
            public ServerReport mapRow(ResultSet rs, int rwNumber) throws SQLException {
                ServerReport report = new ServerReport();
                report.setDownload(rs.getDouble("download"));
                report.setUpload(rs.getDouble("upload"));
                report.setPing(rs.getDouble("ping"));
                report.setTimestamp(rs.getTimestamp("recordedAt"));
                return report;
            }
        });
    }
}
