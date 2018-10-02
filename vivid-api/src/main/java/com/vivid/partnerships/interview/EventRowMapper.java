package com.vivid.partnerships.interview;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EventRowMapper implements RowMapper<Event> {

    @Nullable
    @Override
    public Event mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        final Event event = new Event();
        event.id = resultSet.getInt("id");
        event.date = resultSet.getTimestamp("date");
        event.name = resultSet.getString("name");
        event.venue = new Venue();
        event.venue.id = resultSet.getInt("venueid");
        event.venue.name = resultSet.getString("venuename");
        event.venue.state = resultSet.getString("state");
        event.venue.city = resultSet.getString("city");

        return event;
    }
}
