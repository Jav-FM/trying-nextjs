import classes from "./EventSummary.module.css";

function EventSummary({ event }) {
  const { title } = event;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
