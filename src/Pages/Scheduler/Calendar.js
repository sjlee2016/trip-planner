import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {Button} from 'react-bootstrap'; 
import "./styles.css";
import "./react-big-calendar.css";
import MyModal from '../../components/modal/MyModal'
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      events: [
        {
          start: new Date(2019, 3, 15),
          end: new Date(2019, 3, 16),
          title: "testing"
        },
        {
          title: "All Day Event very long title",
          start: new Date(2019, 3, 15),
          end: new Date(2019, 3, 17)
        },
      
        {
          title: 'DTS STARTS',
          start: new Date(2019, 3, 12, 0, 0, 0),
          end: new Date(2019, 3, 13, 10, 30, 0)
        }
      ]
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div>
      <Button
      variant="primary"
      onClick={this.handleShow}
      >일정 더하기 </Button> 
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
        <MyModal
        show={this.state.show}
        onHide={this.handleClose}
        />
        </div> 
    );
  }
}

export default CalendarPage; 