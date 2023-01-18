import Head from "next/head";
import EventList from "../utils/components/events/EventList";
import { getFeaturedEvents } from "../utils/api-utils";

const HomePage = ({ featureEvents }) => {
  return (
    <div>
      <Head>
        <title>Trying NextJS</title>
        <meta
          name="description"
          content="Trying features of Next.JS like routing, server side rendering, static props, head and metadata, among others."
        />
      </Head>
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
