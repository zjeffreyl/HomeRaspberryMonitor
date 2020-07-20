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
@RequestMapping("/api/reportRecord")
public class ReportRecordController {
    private ReportRecordService reportRecordService;

    @Autowired
    public ReportRecordController(ReportRecordService reportRecordService)
    {
        this.reportRecordService = reportRecordService;
    }

    @GetMapping
    Collection<ReportRecord> reportRecords() {
        return (Collection<ReportRecord>) reportRecordService.getAllReportRecords();
    }

    @PostMapping
    public int addReportReport(@RequestBody @Valid @NotNull ReportRecord reportRecord)
    {
        return reportRecordService.insertReportRecord(reportRecord);
    }

    @GetMapping(path = "{id}")
    public ReportRecord getReportRecordById(@PathVariable("id") UUID id)
    {
        return reportRecordService.getReportRecordById(id).orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public int deleteReportRecordById(@PathVariable("id") UUID id)
    {
        return reportRecordService.deleteReportRecordById(id);
    }

    @PutMapping(path = {"id"})
    public int updateServerReportById(@PathVariable("id") @Valid @NotNull UUID id, @RequestBody ReportRecord reportRecord)
    {
        return reportRecordService.updateReportRecordById(id, reportRecord);
    }
}
