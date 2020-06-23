package com.example;

import com.example.model.ServerReport;
import com.example.repository.ServerReportsRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class HomeRaspberryMonitorApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeRaspberryMonitorApplication.class, args);
	}

	@Bean
	ApplicationRunner applicationRunner(ServerReportsRepository serverReportRepository)
	{
		return args -> {
			ServerReport report = ServerReport.create(3000.1233, 98,12, createTimeStampFromString("23/09/2007"));
			ServerReport report1 = ServerReport.create(3000.1233, 98,12, createTimeStampFromString("24/09/2007"));
			System.out.println("------" + serverReportRepository.save(report));
			System.out.println("------" + serverReportRepository.save(report1));
			System.out.println("------" + serverReportRepository.findByTimeStamp(createTimeStampFromString("23/09/2007")));
		};
	}

	public Timestamp createTimeStampFromString(String str)
	{
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = null;
		try {
			date = dateFormat.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long time = date.getTime();
		return new Timestamp(time);
	}
}
