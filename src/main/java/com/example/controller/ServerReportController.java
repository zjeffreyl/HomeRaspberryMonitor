package com.example.controller;

import com.example.model.ServerReport;
import com.example.repository.ServerReportsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ServerReportController {

        private final Logger log = LoggerFactory.getLogger(ServerReportController.class);
        private ServerReportsRepository repository;

        public ServerReportController(ServerReportsRepository repository)
        {
            this.repository = repository;
        }


        @GetMapping("/serverReports")
        Collection<ServerReport> serverReports()
        {
                return (Collection<ServerReport>) repository.findAll();
        }

        @GetMapping("/serverReports/{id}")
        ResponseEntity<?> getServerReport(@PathVariable Long id)
        {
                Optional<ServerReport> serverReports = repository.findById(id);
                return serverReports.map(response -> ResponseEntity.ok().body(response))
                        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        @PostMapping("/serverReport")
        ResponseEntity<ServerReport> createServerReport(@Valid @RequestBody ServerReport serverReport) throws URISyntaxException
        {
                log.info("Request to create server report: {}", serverReport);
                ServerReport result = repository.save(serverReport);
                return ResponseEntity.created(new URI("/api/group/" + result.getId())).body(result);
        }

        @PutMapping("/serverReport/{id}")
        ResponseEntity<ServerReport> updateServerReport(@Valid @RequestBody ServerReport serverReport)
        {
                log.info("Request to update group: {}", serverReport);
                ServerReport result = repository.save(serverReport);
                return ResponseEntity.ok().body(result);
        }

        @DeleteMapping("/serverReports/{id}")
        public ResponseEntity<?> deleteGroup(@PathVariable Long id)
        {
                log.info("Request to delete server report: {}", id);
                repository.deleteById(id);
                return ResponseEntity.ok().build();
        }
}
