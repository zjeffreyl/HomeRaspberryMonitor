package com.example.repository;

import com.example.model.ServerReport;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface ServerReportsRepository extends CrudRepository<ServerReport, Long> {
    @Query("select * from server_report where recorded_at = :recordedAt")
    List<ServerReport> findByTimeStamp(@Param("recordedAt") Timestamp recordedAt);
}
