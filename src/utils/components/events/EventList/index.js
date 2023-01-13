import EventItem from "../EventItem";
import classes from "./EventList.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event, index) => (
        <EventItem key={index} item={event} />
      ))}
    </ul>
  );
};

export default EventList;
