import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";
import { DateTimePicker as MuiDatetimePicker } from "@material-ui/pickers/DateTimePicker";

class LocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "M月", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "M月d日", { locale: this.locale })
  }

  getYearText(date) {
    return format(date, "yyyy年", { locale: this.locale })
  }

  getWeekdays() {
    return [ "日", "月", "火", "水", "木", "金", "土" ];
  }
}

const DateTimePicker = ({ value, onChange, type, label = "" }) => {

  const dateComponent = (
    <DatePicker
      disableToolbar
      variant="inline"
      inputVariant="outlined"
      format="yyyy年M月d日"
      value={value}
      onChange={onChange}
      label={label}
      autoOk={true}
    />
  )

  const timeComponent = (
    <TimePicker
      disableToolbar
      variant="inline"
      inputVariant="outlined"
      format="HH時mm分"
      value={value}
      onChange={onChange}
      label={label}
      ampm={false}
      autoOk={true}
      fullWidth
    />
  )

  const datetimeComponent = (
    <MuiDatetimePicker
      disableToolbar
      variant="inline"
      inputVariant="outlined"
      format="yyyy年M月d日 HH時m分"
      value={value}
      onChange={onChange}
      label={label}
    />
  )

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils}>
      {
          type === "date" ? dateComponent
        : type === "datetime" ? datetimeComponent
        : type === "time" ? timeComponent
        : <></>
      }
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;