package com.example.api;

import com.example.model.ReportRecord;
import com.example.model.ServerReport;
import com.example.service.ReportRecordService;
import com.example.service.ServerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("/api/serverReport")
public class ServerReportController {

        private ServerReportService serverReportService;
        private ReportRecordService reportRecordService;

        @Autowired
        public ServerReportController(ServerReportService serverReportService,
                        ReportRecordService reportRecordService) {
                this.serverReportService = serverReportService;
                this.reportRecordService = reportRecordService;
        }

        @GetMapping
        @CrossOrigin(origins = "http://localhost:3000")
        public Collection<ServerReport> serverReports() {
                return serverReportService.getAllServerReports();
        }

        @GetMapping(path = "reportRecord/{id}")
        @CrossOrigin(origins = "http://localhost:3000")
        public Collection<ServerReport> serverReportsFromRecordId(@PathVariable("id") UUID id) {
                return serverReportService.getAllServerReportsByRecordId(id);
        }

        @PostMapping
        @CrossOrigin(origins = "http://localhost:3000")
        public int addServerReport(@RequestBody @Valid @NotNull ServerReport report) {
                return serverReportService.insertServerReport(report);
        }

        @GetMapping(path = "{id}")
        @CrossOrigin(origins = "http://localhost:3000")
        public ServerReport getServerReportById(@PathVariable("id") UUID id) {
                return serverReportService.getServerReportsById(id).orElse(null);
        }

        @DeleteMapping(path = "{id}")
        @CrossOrigin(origins = "http://localhost:3000")
        public int deleteServerReportById(@PathVariable("id") UUID id) {
                return serverReportService.deleteServerReportById(id);
        }

        @RequestMapping(value = "{id}", produces = "application/json", method = RequestMethod.PUT)
        public int updateServerReportById(@PathVariable("id") @Valid @NotNull UUID id,
                        @RequestBody ServerReport report) {
                return serverReportService.updateServerReportById(id, report);
        }

        /**
         *
         * @return Latest serverReport from each record averaged
         */
        @GetMapping(path = "recentData")
        @CrossOrigin(origins = "http://localhost:3000")
        public double[] getRecentData() {
                List<ReportRecord> records = reportRecordService.getAllReportRecords();
                double[] result = new double[3];
                double sum_ping = 0;
                double sum_download = 0;
                double sum_upload = 0;
                int nonEmptyRecords = 0;
                for(ReportRecord record: records)
                {
                        List<ServerReport> serverReports = serverReportService.getAllServerReportsByRecordId(record.getId());
                        if(serverReports.size() > 0)
                        {
                                sum_ping += serverReports.get(0).getPing();
                                sum_download += serverReports.get(0).getDownload();
                                sum_upload += serverReports.get(0).getUpload();
                                nonEmptyRecords++;
                        }
                }
                result[0] = sum_ping/nonEmptyRecords;
                result[1] = sum_download/nonEmptyRecords;
                result[2] = sum_upload/nonEmptyRecords;
                return result;
        }

        @GetMapping(path = "historyData")
        @CrossOrigin(origins = "http://localhost:3000")
        public double[] getHistoryData() {
                double[] result = new double[3];
                List<ReportRecord> records = reportRecordService.getAllReportRecords();
                double sum_ping = 0;
                double sum_download = 0;
                double sum_upload = 0;
                int nonEmptyRecords = 0;
                for(ReportRecord record : records)
                {
                        double record_average_ping = 0;
                        double record_average_download = 0;
                        double record_average_upload = 0;

                        List<ServerReport> serverReports = serverReportService.getAllServerReportsByRecordId(record.getId());
                        for(ServerReport report : serverReports)
                        {
                                record_average_ping += report.getPing();
                                record_average_download += report.getDownload();
                                record_average_upload += report.getUpload();
                        }
                        sum_ping += record_average_ping /= serverReports.size();
                        sum_download += record_average_download /= serverReports.size();
                        sum_upload += record_average_upload /= serverReports.size();
                }
                result[0] = sum_ping / records.size();
                result[1] = sum_download / records.size();
                result[2] = sum_upload / records.size();
                return result;
        }

        @GetMapping(path = "lastRecordedDate")
        @CrossOrigin(origins = "http://localhost:3000")
        public Timestamp lastRecordedDate()
        {
                return serverReportService.getMostRecentTimestamp();
        }
}
