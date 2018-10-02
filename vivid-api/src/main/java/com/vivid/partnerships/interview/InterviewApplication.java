package com.vivid.partnerships.interview;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;


// H2 DB URL: jdbc:h2:mem:testdb
@SpringBootApplication
public class InterviewApplication implements CommandLineRunner {
	private static final Logger LOGGER = LoggerFactory.getLogger(InterviewApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(InterviewApplication.class, args);
	}

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public void run(String... strings) throws Exception {
		LOGGER.info("Creating venues table");

		jdbcTemplate.execute("CREATE TABLE venues(id SERIAL, name VARCHAR(255), city VARCHAR(255), state VARCHAR(2))");

		LOGGER.info("Creating events table");
		jdbcTemplate.execute("CREATE TABLE events(" +
				"id SERIAL, name VARCHAR(255), date TIMESTAMP, venueId integer, FOREIGN KEY (venueId) REFERENCES venues(id))");

		jdbcTemplate.update("INSERT INTO venues(name, city, state) VALUES (?,?,?)", "Wrigley Field", "Chicago", "IL");

		jdbcTemplate.update("INSERT INTO events(name, date, venueId) VALUES (?,?,?)", "Chicago White Sox vs. Chicago Cubs", new Date(), 1);
	}
}
