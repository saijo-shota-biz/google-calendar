import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { Toolbar, Typography, AppBar, IconButton, Icon } from "@material-ui/core";
import { StateContext } from "../../context/context";
import { format } from "date-fns";

class LocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy年MM月dd日", { locale: this.locale });
  }

  getWeekdays() {
    return [ "日", "月", "火", "水", "木", "金", "土" ];
  }
}

const ApplicationBar = () => {

  const [state, setState] = React.useContext(StateContext);

  const prevDate = () => {
    setState(state => {
      const date = state.date;
      date.setMonth(date.getMonth() - 1);
      return { date }
    })
  }

  const changeDate = (date) => {
    setState(state => ({ date: date }))
  }

  const nextDate = () => {
    setState(state => {
      const date = state.date;
      date.setMonth(date.getMonth() + 1);
      return { date }
    })
  }

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography variant="h6">Calendar</Typography>
        <IconButton onClick={prevDate}>
          <Icon>keyboard_arrow_left</Icon>
        </IconButton>
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
          <DatePicker
            disableToolbar
            variant="inline"
            format="yyyy年MM月dd日"
            value={state.date}
            onChange={changeDate}
          />
        </MuiPickersUtilsProvider>
        <IconButton onClick={nextDate}>
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;