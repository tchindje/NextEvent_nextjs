import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getAllEventsIDs, getEventById } from "../../helpers/api-utils";

const EventDetailPage = (props) => {
  let { event } = props;

  if (!event) {
    return (
      <div className="center">
        <ErrorAlert>
          <div>No events found for a chosen ID !</div>
        </ErrorAlert>
        <Button link="/">Show all Events</Button>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export async function getStaticPaths() {
  const eventsIds = await getAllEventsIDs();

  const paths = eventsIds.map((id) => ({
    params: {
      eventId: id,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event,
    },
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
