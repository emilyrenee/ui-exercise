import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const styles = theme => ({
  day: {
    width: "5rem",
    height: "3rem",
    margin: 0,
    padding: theme.spacing.unit,
    border: "1px solid grey"
  }
});

const Day = ({ day, classes }) => (
  <Grid item>
    <div className={classes.day}>{moment(day).format("ddd DD")}</div>
  </Grid>
);

export default withStyles(styles)(Day);
