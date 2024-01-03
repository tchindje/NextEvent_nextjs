import { useState } from "react";
import Button from "../ui/button";
import classes from "./event-search.module.css";

const EventsSearch = (props) => {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [selectedMonth, setSelectedMonth] = useState(2);

  const handlerSubmit = (event) => {
    event.preventDefault();
    props.onSearch(selectedYear, selectedMonth);
  };

  return (
    <form onSubmit={handlerSubmit} className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">year</label>
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select
            name="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="1">January</option>
            <option value="2">Febuary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">june</option>
            <option value="7">Jully</option>
            <option value="8">august</option>
            <option value="9">september</option>
            <option value="10">october</option>
            <option value="11">november</option>
            <option value="12">december</option>
          </select>
        </div>
      </div>
      <Button>Search</Button>
    </form>
  );
};

export default EventsSearch;
