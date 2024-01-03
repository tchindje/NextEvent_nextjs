import React from "react";

import EventItem from "./EventItem";

import classe from "./event-list.module.css";

const EventsList = (props) => {
  if (props.events.lenght == 0) {
    return <div>No events to display.</div>;
  }

  return (
    <ul className={classe.list}>
      {props.events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventsList;
