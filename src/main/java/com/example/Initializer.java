package com.example;

import com.example.model.ServerReport;
import com.example.repository.ServerReportsRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final ServerReportsRepository repository;

    public Initializer(ServerReportsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of(createTimeStampFromString("23/09/2007"), createTimeStampFromString("15/3/2020"))
                .forEach(time -> repository.save(ServerReport.create(3000.1233, 98,12, time)));
        List<ServerReport> reports = repository.findByTimeStamp(createTimeStampFromString("15/3/2020"));
        for(ServerReport report : reports)
        {
            repository.save(report);
        }
        repository.findAll().forEach(System.out::println);
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
