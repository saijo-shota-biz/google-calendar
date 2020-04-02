import React from "react";
import { Fab, Icon, Dialog, Paper, DialogActions, Button, DialogContent, MenuItem, TextField, withStyles, Typography, IconButton } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import "./style.sass";
import Draggable from "react-draggable";
import { whatList } from "../constans/const";
import DateTimePicker from "../DateTimePicker";
import { StateContext } from "../../context/context";

const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(({ children, onClose, classes }) => {
  return (
    <MuiDialogTitle disableTypography className={classes.root} id="draggable-dialog-title">
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
          <Icon>close</Icon>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AddScheduleDialog = () => {

  const [open, setOpen] = React.useState(false);
  const [whenStart, setWhenStart] = React.useState(new Date().getTime());
  const [whenEnd, setWhenEnd] = React.useState(new Date().getTime());
  const [what, setWhat] = React.useState("");

  const [, setState] = React.useContext(StateContext);

  const time = Math.floor(((whenEnd - whenStart) / 3600000) / 0.5) * 0.5;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeWhat = (event) => {
    setWhat(event.target.value);
  }

  const saveSchedule = () => {
    setState(state => {
      const schedule = { date: state.date.toLocaleDateString(), time, what }
      state.schedules.push(schedule);
      return { date: state.date, schedules: state.schedules };
    });
    setWhenStart(new Date().getTime());
    setWhenEnd(new Date().getTime());
    setWhat("");
    handleClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        className="add-schedule-dialog"
      >
        <DialogTitle style={{ cursor: 'move' }} onClose={handleClose}>
          積み上げ
        </DialogTitle>
        <DialogContent>
          <div className="add-schedule-dialog__form">
            <DateTimePicker fullWidth type="time" label="何時から" value={whenStart} onChange={setWhenStart}></DateTimePicker>
            から
            <DateTimePicker fullWidth type="time" label="何時まで" value={whenEnd} onChange={setWhenEnd}></DateTimePicker>
            の{time}時間
            <TextField
              select
              label="なにを？"
              variant="outlined"
              fullWidth
              value={what}
              onChange={handleChangeWhat}
            >
              {whatList.map(what => (
                <MenuItem key={what.value} value={what.value}>{what.label}</MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveSchedule} color="primary">をやった。</Button>
        </DialogActions>
      </Dialog>
      <Fab className="add-schedule-dialog__btn" color="default" variant="round" onClick={handleClickOpen}>
        <Icon>add</Icon>
      </Fab>
    </>
  );
}

export default AddScheduleDialog;