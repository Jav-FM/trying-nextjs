import { Fragment } from "react";
import Head from "next/head";
import { getFilteredEvents } from "../../../utils/api-utils";
import EventList from "../../../utils/components/events/EventList";
import ResultsTitle from "../../../utils/components/events/ResultTitle/ResultTitle";
import ErrorAlert from "../../../utils/components/common/ErrorAlert";
import Button from "../../../utils/components/common/Button";

const FilteredEventsPage = ({ filteredEvents, date, hasError }) => {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={
          date
            ? `All events for ${date.month}/${date.year}`
            : "Invalid filters for events."
        }
      />
    </Head>
  );

  const handleShowAlert = (text) => {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert className="center">
          <p>{text}</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  };

  if (hasError) {
    return handleShowAlert("Invalid filters");
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return handleShowAlert("Not events found for the chosen filter.");
  }

  const dateToRender = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={dateToRender} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const dateArray = params.slug;

  const dateObject = {
    year: +dateArray[0],
    month: +dateArray[1],
  };

  if (
    isNaN(dateObject.year) ||
    isNaN(dateObject.month) ||
    dateObject.year > 2030 ||
    dateObject.year < 2021 ||
    dateObject.month < 1 ||
    dateObject.month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents(dateObject);

  return {
    props: { filteredEvents, date: dateObject },
  };
};
