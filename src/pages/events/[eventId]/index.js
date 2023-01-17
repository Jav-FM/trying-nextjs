import { Fragment } from "react";
import { getEventById } from "../../../utils/api-utils";
import { getFeaturedEvents } from "../../../utils/api-utils";
import EventSummary from "../../../utils/components/eventsDetail/EventSummary";
import EventLogistics from "../../../utils/components/eventsDetail/EventLogistics";
import EventContent from "../../../utils/components/eventsDetail/EventContent";
import ErrorAlert from "../../../utils/components/common/ErrorAlert/ErrorAlert";
import Button from "../../../utils/components/common/Button/Button";

const EventDetailPage = ({ event, hasError }) => {
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

  if (!event && !hasError) {
    return <p className="center">Loading...</p>;
  }

  if (hasError) {
    return handleShowAlert("The event was not found.");
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

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const eventsParams = events.map((e) => ({
    params: {
      eventId: e.id,
    },
  }));
  return {
    paths: eventsParams,
    fallback: true,
  };
};
