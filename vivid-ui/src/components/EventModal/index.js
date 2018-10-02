import React, { Component } from "react";
import moment from "moment";
import { Button, Modal, FormGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

class EventModal extends Component {
  constructor(props) {
    super(props);
    let urlParams = new URLSearchParams(window.location.search);
    let stateParam = urlParams.get("state");
    this.state = {
      name: "",
      venueName: "",
      venueCity: "",
      venueState: stateParam || "IL",
      selectedDate: moment()
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleAddEvent = () => {
    if (
      this.state.name &&
      this.state.selectedDate &&
      this.state.venueName &&
      this.state.venueState &&
      this.state.venueCity
    ) {
      this.props.onAddEvent({
        name: this.state.name,
        date: this.state.selectedDate.utc().valueOf(),
        venue: {
          name: this.state.venueName,
          city: this.state.venueCity,
          state: this.state.venueState
        }
      });
    } else {
      alert("All fields required!");
    }
  };

  render() {
    return (
      <Modal show={this.props.modalOpen} onHide={this.props.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name="addEventForm" onSubmit={this.handleSubmit}>
            <p>Event Information</p>
            <FormGroup>
              <FormControl
                name="name"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Event Name"
              />
            </FormGroup>
            <FormGroup>
              <DatePicker
                style={{ width: "100%" }}
                className="form-control form-group"
                selected={this.state.selectedDate}
                showTimeSelect
                onChange={this.handleDateChange}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </FormGroup>
            <p>Venue Information</p>
            <FormGroup>
              <FormControl
                onChange={this.handleInputChange}
                name="venueName"
                type="text"
                placeholder="Venue Name"
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                onChange={this.handleInputChange}
                name="venueCity"
                type="text"
                placeholder="Venue City"
              />
            </FormGroup>
            <FormControl
              defaultValue={this.state.venueState}
              onChange={this.handleInputChange}
              componentClass="select"
              placeholder={this.state.venueState}
              name="venueState"
              size="1"
            >
              <option value="AK">AK</option>
              <option value="AL">AL</option>
              <option value="AR">AR</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VA">VA</option>
              <option value="VT">VT</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </FormControl>
            <div className="modal-footer">
              <Button
                bsStyle="danger"
                type="button"
                onClick={this.props.onCloseModal}
              >
                Close
              </Button>
              <Button
                bsStyle="primary"
                type="submit"
                onClick={this.handleAddEvent}
              >
                Add Event
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onAddEvent: PropTypes.func
};

export default EventModal;
