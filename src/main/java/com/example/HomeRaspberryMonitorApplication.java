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
}
