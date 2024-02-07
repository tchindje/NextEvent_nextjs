import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import EventsList from "../../components/event/EventsList";
import EventsSearch from "../../components/event/event-search";
import { getAllEvents } from "../../helpers/api-utils";

const AllEventsPage = (props) => {
  const { allEvents } = props;

  const router = useRouter();

  const searchEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <Head>
        <title>Next Events </title>
        <meta
          name="description"
          content="find a lof of great events to evolve"
        />
      </Head>
      <EventsSearch onSearch={searchEventsHandler} />
      <EventsList events={allEvents} />;
    </div>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 3000,
  };
}

export default AllEventsPage;
