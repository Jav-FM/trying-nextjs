import Image from "next/image";
import classes from "./EventItem.module.css";
import Button from "../../common/Button/Button";
import DateIcon from "../../icons/DateIcon";
import AddressIcon from "../../icons/AddressIcon";
import React from "react";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

const EventItem = ({ item }) => {
  const { title, image, date, location, id } = item;

  const humanReadableDate = new Date(date).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.sumary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={exploreLink}>
            Explore event
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
