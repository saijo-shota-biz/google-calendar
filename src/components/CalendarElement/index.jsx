import React from 'react';
import "./style.sass";
import { Paper } from '@material-ui/core';
import { StateContext } from '../../context/context';
import SchduleChip from '../ScheduleChip';
import { whatList } from '../constans/const';

const CalendarElement = ({ date, showDayOfWeek }) => {

  const [state, setState] = React.useContext(StateContext);
  const selectedDate = state.date;
  const isThisMonth = date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth();
  const isSelected = date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate();

  const dayOfWeeks = [ "日", "月", "火", "水", "木", "金", "土" ];

  const day = date.getDay();

  const modifire = day === 0 || day % 7 === 0 ? "--sunday"
                 : day === 6 || (day - 6) % 7 === 0? "--saturday"
                 : "";

  const selectDate = () => {
    setState(state => ({ date, schedules: state.schedules }))
  }

  return (
    <Paper square className={`calendar-element${showDayOfWeek ? "--first" : ""}`}>
      {/* 曜日 */}
      {
        showDayOfWeek && <div className={`calendar-element__day-of-week${modifire}`}>
          {dayOfWeeks[day]}
        </div>
      }
      {/* 日付 */}
      <div className={`calendar-element__date${isThisMonth ? modifire : "--not-this-month"}`}
           onClick={selectDate}>
        <span className={`calendar-element__date label${isSelected ? "--selected": ""}`}>
          {date.getDate()}
        </span>
      </div>
      {/* 予定 */}
      {
        state.schedules
          .filter(s => s.date === date.toLocaleDateString())
          .map((s, i) => (<SchduleChip key={i} text={whatList.find(e => e.value === s.what).label + " " + s.time + "H"}></SchduleChip>))
      }
    </Paper>
  );

}

export default CalendarElement;