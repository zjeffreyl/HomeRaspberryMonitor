package com.example;

import com.example.model.ServerReport;
import com.example.service.ServerReportService;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;

@SpringBootApplication
public class HomeRaspberryMonitorApplication {

	@Autowired
	ServerReportService serverReportService;

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(HomeRaspberryMonitorApplication.class, args);
		ServerReportService serverReportService = context.getBean(ServerReportService.class);

		ServerReport report = new ServerReport();
		report.setDownload(984.2314);
		report.setUpload(89321.34);
		report.setPing(23);
		report.setTimestamp(new Timestamp(1000000));
		serverReportService.insertServerReport(report);
	}
	@GetMapping
	@ResponseBody
	public String currentUserName(Authentication authentication) {
		DefaultOidcUser userDetails = (DefaultOidcUser) authentication.getPrincipal();
		return "Hello, " + userDetails.getFullName();
	}
}
