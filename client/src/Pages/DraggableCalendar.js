import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import events from './events'; 
//import BigCalendar from "react-big-calendar";

import Calendar from './Scheduler/Calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

const DragAndDropCalendar = withDragAndDrop(Calendar);

class DraggableCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        events: events 
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents
    });
  };

  render() {
    return (
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView="month"
        defaultDate={new Date(2015, 3, 12)}
      />
    );
  }
}
const CalendarPage = DragDropContext(HTML5Backend)(DraggableCalendar);
export default CalendarPage; 