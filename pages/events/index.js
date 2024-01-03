import React from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventsList from "../../components/event/EventsList";
import EventsSearch from "../../components/event/event-search";

const AllEventsPage = () => {
  const router = useRouter();
  const allEvent = getAllEvents();

  const searchEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={searchEventsHandler} />
      <EventsList events={allEvent} />;
    </div>
  );
};

export default AllEventsPage;
