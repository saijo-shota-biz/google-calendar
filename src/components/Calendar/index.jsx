import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
import CalendarElement from "../CalendarElement";
import "./style.sass";
import { StateContext } from "../../context/context";

const Calendar = () => {

  const [state] = React.useContext(StateContext);
  const selectedDate = state.date;

  const dateList = [...Array(42).keys()].map(i => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  })

  const isThisMonth = (date) => date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth();

  const isToday = (date) => date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate();

  return (
    <div className="calendar">
      <GridList cellHeight="auto" cols={7} spacing={0}>
        {dateList.map((date, i) => (
          <GridListTile key={i} cols={1}>
            <CalendarElement date={date} showDayOfWeek={i < 7} thisMonth={isThisMonth(date)} today={isToday(date)}></CalendarElement>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}

export default Calendar;
