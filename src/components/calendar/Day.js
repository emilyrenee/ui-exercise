import React from "react";
import moment from "moment";
import classnames from "classnames";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "./Day.css";

const Day = ({ day }) => {
  const isInvalid = day => day === "Invalid date";
  const isWeekend = day => {
    const dayOfWeek = moment(day).format("dd");
    if (dayOfWeek === "Sa" || dayOfWeek === "Su") return true;
    return false;
  };
  const isWeekday = day => {
    const dayOfWeek = moment(day).format("dd");
    if (dayOfWeek !== "Sa" && dayOfWeek !== "Su") return true;
    return false;
  };

  return (
    <Grid item>
      <div
        className={classnames("day", {
          invalid: isInvalid(day),
          weekend: isWeekend(day),
          weekday: isWeekday(day)
        })}
      >
        <Typography variant="caption">
          {isInvalid(day) ? "" : moment(day).format("D")}
        </Typography>
      </div>
    </Grid>
  );
};

export default Day;
