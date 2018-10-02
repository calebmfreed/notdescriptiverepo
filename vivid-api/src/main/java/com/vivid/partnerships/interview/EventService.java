package com.vivid.partnerships.interview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EventService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

     public List<Event> getEvents() {
         return jdbcTemplate.query("SELECT events.id, events.name, events.date, events.venueid, venues.name as venueName, venues.city, venues.state FROM events LEFT JOIN venues ON events.venueId=venues.id", new EventRowMapper());
    }
}
