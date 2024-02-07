import Head from "next/head";

import EventsList from "../components/event/EventsList";
import { getFeaturedEvents } from "../helpers/api-utils";
import NewsletterRegistration from "../components/input/new-letter-registration";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Next Events </title>
        <meta
          name="description"
          content="find a lof of great events to evolve"
        />
      </Head>
      <NewsletterRegistration />
      <EventsList events={props.featuredEvents} />
    </>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 3000,
  };
}

export default HomePage;
