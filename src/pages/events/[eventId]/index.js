import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../../utils/constants/dummy-data";
import EventSummary from "../../../utils/components/eventsDetail/EventSummary";
import EventLogistics from "../../../utils/components/eventsDetail/EventLogistics";
import EventContent from "../../../utils/components/eventsDetail/EventContent";
import ErrorAlert from "../../../utils/components/common/ErrorAlert/ErrorAlert";
import Button from "../../../utils/components/common/Button/Button";

const EventDetailPage = () => {
  const route = useRouter();
  const eventId = route.query.eventId;
  const event = getEventById(eventId);

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

  if (!event) {
    return handleShowAlert("Not event found.");
  }

  return (
    <Fragment>
      <EventSummary event={event} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
