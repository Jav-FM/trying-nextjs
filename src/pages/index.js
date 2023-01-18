import Head from "next/head";
import EventList from "../utils/components/events/EventList";
import { getFeaturedEvents } from "../utils/api-utils";

const HomePage = ({ featureEvents }) => {
  return (
    <div>
      <EventList items={featureEvents} />
    </div>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featureEvents = await getFeaturedEvents();

  return {
    props: {
      featureEvents,
    },
    revalidate: 1800,
  };
};
