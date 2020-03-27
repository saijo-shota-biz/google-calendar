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

  const isNextMonth = (date) => date.getFullYear() > selectedDate.getFullYear() || date.getMonth() > selectedDate.getMonth();

  return (
    <div className="calendar">
      <GridList cellHeight="auto" cols={7} spacing={0}>
        {dateList.map((date, i) => (
          <GridListTile key={i} cols={1}>
            <CalendarElement date={date} showDayOfWeek={i < 7} nextMonth={isNextMonth(date)} today={date.getDate() === selectedDate.getDate()}></CalendarElement>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}

export default Calendar;
