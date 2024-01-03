import React from "react";

import { useRouter } from "next/router";
import { getFiltredEvent, getAllEvents } from "../../dummy-data";
import EventsList from "../../components/event/EventsList";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <div className="center">Loading</div>;
  }

  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  const filteredEvents = getFiltredEvent({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <div className="center">No events found!</div>;
  }

  return (
    <>
      <EventsList events={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
