import { use, useCallback, useEffect, useState } from "react";
import EventsList from "../components/event/EventsList";
import EventsSearch from "../components/event/event-search";
import { getFeaturedEvent, getFiltredEvent } from "../dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvent();

  return (
    <>
      <EventsList events={featuredEvents} />
    </>
  );
};

export default HomePage;
