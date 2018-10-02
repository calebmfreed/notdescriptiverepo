package com.vivid.partnerships.interview;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class EventController {
    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    private final EventService eventService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public EventController(final EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/events")
    public List<Event> getEvents() {
        List<Event> events = eventService.getEvents();
        LOGGER.info("Returning {} events", events.size());
        return events;
    }

    @PostMapping("/events")
    @Transactional
    public Event createEvent(@Valid @RequestBody Event event) {
        GeneratedKeyHolder venueIdHolder = new GeneratedKeyHolder();

        // Insert the venue
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement statement = con.prepareStatement("INSERT INTO venues(name, city, state) VALUES (?,?,?) ", Statement.RETURN_GENERATED_KEYS);
                statement.setString(1, event.venue.name);
                statement.setString(2, event.venue.city);
                statement.setString(3, event.venue.state);

                return statement;
            }
        } , venueIdHolder);

        // Insert the event and tie to venue id returned above
        GeneratedKeyHolder eventIdHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement statement = con.prepareStatement("INSERT INTO events(name, date, venueId) VALUES (?,?,?) ", Statement.RETURN_GENERATED_KEYS);
                statement.setString(1, event.name);
                statement.setTimestamp(2, new Timestamp(event.date.getTime()));
                statement.setInt(3, venueIdHolder.getKey().intValue());

                return statement;
            }
        } , eventIdHolder);

        // Update request and return to user
        event.id = eventIdHolder.getKey().intValue();
        event.venue.id = venueIdHolder.getKey().intValue();

        return event;
    }
}
