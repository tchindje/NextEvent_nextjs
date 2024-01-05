import React from "react";
import Button from "../ui/button";

import classes from "./results-title.module.css";

const ResultsTitle = (props) => {
  const { date } = props;
  const humanReadeableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadeableDate}</h1>
      <Button link="/events">Show all events </Button>
    </section>
  );
};

export default ResultsTitle;
