import React from "react";
import { Toolbar, Typography, AppBar, IconButton, Icon } from "@material-ui/core";
import { StateContext } from "../../context/context";
import DateTimePicker from "../DateTimePicker";

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
        <DateTimePicker value={state.date} onChange={changeDate} type="date"></DateTimePicker>
        <IconButton onClick={nextDate}>
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;