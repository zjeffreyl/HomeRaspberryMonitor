package com.example.api;

import com.example.model.ServerReport;
import com.example.service.ServerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/api/serverReport")
public class ServerReportController {

        private ServerReportService serverReportService;

        @Autowired
        public ServerReportController(ServerReportService serverReportService) {
                this.serverReportService = serverReportService;
        }

        @GetMapping
        @CrossOrigin(origins = "http://localhost:3000")
        public Collection<ServerReport> serverReports() {
                return serverReportService.getAllServerReports();
        }

        @PostMapping
        @CrossOrigin(origins = "http://localhost:3000")
        public int addServerReport(@RequestBody @Valid @NotNull ServerReport report)
        {
                return serverReportService.insertServerReport(report);
        }


        @GetMapping(path = "{id}")
        @CrossOrigin(origins = "http://localhost:3000")
        public ServerReport getServerReportById(@PathVariable("id") UUID id)
        {
                return serverReportService.getServerReportsById(id).orElse(null);
        }

        @DeleteMapping(path = "{id}")
        @CrossOrigin(origins = "http://localhost:3000")
        public int deleteServerReportById(@PathVariable("id") UUID id)
        {
                return serverReportService.deleteServerReportById(id);
        }

        @RequestMapping(value = "{id}", produces = "application/json",  method=RequestMethod.PUT)
        public int updateServerReportById(@PathVariable("id") @Valid @NotNull UUID id, @RequestBody ServerReport report)
        {
                return serverReportService.updateServerReportById(id, report);
        }
}
