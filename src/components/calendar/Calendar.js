import React from "react";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import Day from "./Day";

const styles = {
  calendar: {
    margin: "2rem 0"
  }
};


// TODO:
// for each month
// make header (S, M, T, W, Th, F, S)

class Calendar extends React.Component {
  state = {
    daysByMonth: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log(nextProps);
      if (
        nextProps.daysViewing &&
        nextProps.daysViewing.length >= 1 &&
        nextProps.months &&
        nextProps.months.length >= 1
      ) {
        this.makeMonths(nextProps.months, nextProps.daysViewing);
      }
    }
  }

  makeMonths(monthsIn, daysIn) {
    const monthOfDays = [];
    for (let i = 0; i < monthsIn.length; ++i) {
      const days = daysIn.filter(day => day.split("-")[1] === monthsIn[i]);
      console.log("days", days);
      monthOfDays.push(days);
    }
    console.log(monthOfDays);
    this.setState({ daysByMonth: monthOfDays });
  }

  render() {
    const { classes, months, daysViewing } = this.props;
    let monthsReady = false;

    // TODO: real loading state
    if (
      daysViewing &&
      daysViewing.length >= 1 &&
      months &&
      months.length >= 1
    ) {
      monthsReady = true;
    }
    if (!monthsReady) return <div>loading..</div>;

    return (
      <div>
        {this.state.daysByMonth.map((month, i) => (
          <Grid
            container
            spacing={0}
            alignItems="center"
            className={classes.calendar}
            key={i}
          >
            {month.map((day, j) => (
              <Day day={moment(day).format("YYYY-MM-DD")} key={j} />
            ))}
          </Grid>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Calendar);
