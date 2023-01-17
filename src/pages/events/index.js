import { useRouter } from "next/router";
import { getAllEvents } from "../../utils/api-utils";
import EventList from "../../utils/components/events/EventList";
import EventsSearch from "../../utils/components/events/EventsSearch";

const EventsPage = ({ allEvents }) => {
  const router = useRouter();

  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventsPage;

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
};
