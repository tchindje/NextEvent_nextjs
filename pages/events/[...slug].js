import EventsList from "../../components/event/EventsList";
import ResultsTitle from "../../components/event/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFiltredEvents, filteredEvents } from "../../helpers/api-utils";

const FilteredEventsPage = (props) => {
  if (props.hasError) {
    return (
      <div className="center">
        <ErrorAlert>
          <p> Invalid filter, Please adjust your values!</p>
        </ErrorAlert>
        <Button link="/events">Show all Events</Button>
      </div>
    );
  }

  const { filteredEvents } = props;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No events found for a chosen filters!</p>
        </ErrorAlert>
        <Button link="/events">Show all Events</Button>
      </div>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList events={filteredEvents} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const filterData = params.slug;
  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    numMonth > 12 ||
    numMonth < 1 ||
    year > 2025 ||
    year < 2021 ||
    isNaN(year) ||
    isNaN(month)
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const events = await getFiltredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      filteredEvents: events,
      year: numYear,
      month: numMonth,
    },
  };
}

export default FilteredEventsPage;
