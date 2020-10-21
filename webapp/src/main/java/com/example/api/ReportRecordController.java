package com.example.api;

import com.example.model.ReportRecord;
import com.example.service.ReportRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/reportRecord")
public class ReportRecordController {
    private ReportRecordService reportRecordService;

    @Autowired
    public ReportRecordController(ReportRecordService reportRecordService) {
        this.reportRecordService = reportRecordService;
    }

    @GetMapping
    public Collection<ReportRecord> reportRecords() {
        return reportRecordService.getAllReportRecords();
    }

    @PostMapping
    public ReportRecord addReportReport(@RequestBody @Valid @NotNull ReportRecord reportRecord) {
        return reportRecordService.insertReportRecord(reportRecord);
    }

    @GetMapping(path = "{id}")
    public ReportRecord getReportRecordById(@PathVariable("id") UUID id) {
        return reportRecordService.getReportRecordById(id).orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public ReportRecord deleteReportRecordById(@PathVariable("id") UUID id) {
        return reportRecordService.deleteReportRecordById(id);
    }

    @RequestMapping(value = "{id}", produces = "application/json", method = RequestMethod.PUT)
    public int updateServerReportById(@PathVariable("id") @Valid @NotNull UUID id,
            @RequestBody ReportRecord reportRecord) {
        return reportRecordService.updateReportRecordById(id, reportRecord);
    }

}
