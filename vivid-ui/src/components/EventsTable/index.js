import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const EventsTable = props => (
  <table className="table events-table table-striped">
    <tbody>
      <tr className="events-table-header">
        <th>Event Name</th>
        <th>Date</th>
        <th>Venue</th>
        <th>City</th>
        <th>State</th>
      </tr>
      {
        props.events && props.events.map((event) => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{moment(event.date).format("dddd, MMMM Do YYYY, h:mm a")}</td> 
            <td>{event.venue && event.venue.name}</td>
            <td>{event.venue && event.venue.city}</td>
            <td>{event.venue && event.venue.state}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

EventsTable.propTypes = {
  events: PropTypes.array
}

export default EventsTable;