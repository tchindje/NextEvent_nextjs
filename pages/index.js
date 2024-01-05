import EventsList from "../components/event/EventsList";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = (props) => {
  return (
    <>
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
