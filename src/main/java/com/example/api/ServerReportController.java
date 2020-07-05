package com.example.api;

import com.example.model.ServerReport;
import com.example.service.ServerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class ServerReportController {

        private ServerReportService serverReportService;

        @Autowired
        public ServerReportController(ServerReportService serverReportService) {
                this.serverReportService = serverReportService;
        }

        @GetMapping("/serverReports/")
        Collection<ServerReport> serverReports() {
                return (Collection<ServerReport>) serverReportService.getAllServerReports();
        }

//        @GetMapping("/serverReports/{id}")
//        ResponseEntity<?> getServerReport(@PathVariable Long id) {
//                Optional<ServerReport> serverReports = repository.findById(id);
//                return serverReports.map(response -> ResponseEntity.ok().body(response))
//                                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//        }
//
//        @PostMapping("/serverReport")
//        ResponseEntity<ServerReport> createServerReport(@Valid @RequestBody ServerReport serverReport)
//                        throws URISyntaxException {
//                log.info("Request to create server report: {}", serverReport);
//                ServerReport result = repository.save(serverReport);
//                return ResponseEntity.created(new URI("/api/group/" + result.getId())).body(result);
//        }
//
//        @PutMapping("/serverReport/{id}")
//        ResponseEntity<ServerReport> updateServerReport(@Valid @RequestBody ServerReport serverReport) {
//                log.info("Request to update group: {}", serverReport);
//                ServerReport result = repository.save(serverReport);
//                return ResponseEntity.ok().body(result);
//        }
//
//        @DeleteMapping("/serverReports/{id}")
//        public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
//                log.info("Request to delete server report: {}", id);
//                repository.deleteById(id);
//                return ResponseEntity.ok().build();
//        }
}
