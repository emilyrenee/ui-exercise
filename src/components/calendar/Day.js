import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const styles = theme => ({
  day: {
    width: "3.5rem",
    height: "3rem",
    margin: 0,
    padding: theme.spacing.unit,
    border: "1px solid grey"
  }
});

// get start of week from start day
    // get end of week from end day
    // isWeekend
    // isWeekday
    // isInvaid

const Day = ({ day, classes }) => (
  <Grid item>
    <div className={classes.day}>{moment(day).format("YYYY-MM-DD dd")}</div>
  </Grid>
);

export default withStyles(styles)(Day);
