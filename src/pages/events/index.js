import { useRouter } from "next/router";
import Head from "next/head";
import { getAllEvents } from "../../utils/helpers/api-utils";
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
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find great events that allow you to evolve."
        />
      </Head>
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
