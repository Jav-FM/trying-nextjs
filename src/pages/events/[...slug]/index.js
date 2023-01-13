import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "../../../utils/constants/dummy-data";
import EventList from "../../../utils/components/events/EventList";
import ResultsTitle from "../../../utils/components/events/ResultTitle/ResultTitle";
import ErrorAlert from "../../../utils/components/common/ErrorAlert/ErrorAlert";
import Button from "../../../utils/components/common/Button/Button";

const FilteredEventsPage = () => {
  const router = useRouter();
  const dateArray = router.query.slug;

  const handleShowAlert = (text) => {
    return (
      <Fragment>
        <ErrorAlert className="center">
          <p>{text}</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  };

  if (!dateArray) {
    return <p className="center">Loading...</p>;
  }
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
    return handleShowAlert("Invalid filters");
  }
  const filteredEvents = getFilteredEvents(dateObject);

  if (!filteredEvents || filteredEvents.length === 0) {
    return handleShowAlert("Not events found for the chosen filter.");
  }

  const date = new Date(dateObject.year, dateObject.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
