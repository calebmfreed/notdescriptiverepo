import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import EventsTable from "components/EventsTable";
import EventModal from "components/EventModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      events: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      let events = await fetch("api/events");
      if (!events.ok) {
        throw new Error("Outside 200 range");
      } else {
        this.setState({ events: await events.json() });
      }
    } catch (error) {
      this.setState({
        errorMessage: "Unable to fetch events, please try again later."
      });
    }
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  addEvent = async newEvent => {
    try {
      let response = await fetch("api/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let allEvents = [...this.state.events, await response.json()];
      this.setState({ events: allEvents });
      this.closeModal();
    } catch (error) {
      alert("Adding event failed, try again later");
    }
  };

  render() {
    return (
      <div className="container">
        <div>
          <EventsTable events={this.state.events} />
          {this.state.errorMessage && (
            <div style={{ paddingBottom: "2rem" }}>
              {this.state.errorMessage}
            </div>
          )}
          <Button bsStyle="primary" onClick={this.openModal} id="add-btn">
            Add Event
          </Button>
          {this.state.modalOpen && (
            <EventModal
              modalOpen={this.state.modalOpen}
              onCloseModal={this.closeModal}
              onAddEvent={this.addEvent}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
