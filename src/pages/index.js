import { getFeaturedEvents } from "../utils/constants/dummy-data";
import EventList from "../utils/components/events/EventList";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
