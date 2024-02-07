import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import Comments from "../../components/input/comments";

const EventDetailPage = (props) => {
  let { event } = props;

  if (!event) {
    return <div className="center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name={event.title} content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.address}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();

  const paths = featuredEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      props: {
        event: null,
      },
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

// export async function getServerSideProps(context) {
//   const { params, req, res } = context;
//   const eventId = params.eventId;
//   const event = await getEventById(eventId);

//   if (!event) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       event,
//     },
//   };
// }

export default EventDetailPage;
