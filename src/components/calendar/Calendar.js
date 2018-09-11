import React from "react";
import moment, { invalid } from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import Day from "./Day";

const styles = theme => ({
  calendar: {
    margin: "2rem 0"
  },
  headerDay: {
    width: "3.5rem",
    height: "1rem",
    margin: 0,
    padding: theme.spacing.unit,
    border: "1px solid grey"
  }
});

class Calendar extends React.Component {
  state = {
    daysByMonth: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (
        nextProps.daysViewing &&
        nextProps.daysViewing.length >= 1 &&
        nextProps.months &&
        nextProps.months.length >= 1
      ) {
        this.makeMonths(
          nextProps.months,
          nextProps.daysViewing
        );
      }
    }
  }

  makeMonths(start, end, monthsIn, daysIn) {
    const monthOfDays = [];
    for (let i = 0; i < monthsIn.length; ++i) {
      // break into array of days in month selected
      const days = daysIn.filter(day => day.split("-")[1] === monthsIn[i]);

      const startOfMonth = moment(days[0]).startOf("day");
      const endOfMonth = moment(days[days.length - 1]).endOf("day");

      const invalidStartOfMonth = moment(startOfMonth)
        .startOf("week")
        .startOf("day");
      const invalidEndOfMonth = moment(endOfMonth)
        .endOf("week")
        .endOf("day");
      console.log(
        "invalid Dates",
        moment(invalidStartOfMonth).format("YYYY-MM-DD"),
        moment(invalidEndOfMonth).format("YYYY-MM-DD")
      );

      // unshift invalid dates while invalid start is less than actual start
      for (
        let i = moment(invalidStartOfMonth);
        i < moment(startOfMonth);
        i = moment(i).add(1, "day")
      ) {
        days.unshift("invalid date");
      }

      // push invalid dates while invalid end is greater than actual end
      for (
        let i = moment(invalidEndOfMonth);
        i > moment(endOfMonth);
        i = moment(i).subtract(1, "day")
      ) {
        days.push("invalid date");
      }
      monthOfDays.push(days);
    }
    this.setState({ daysByMonth: monthOfDays });
  }

  render() {
    const { months, daysViewing, classes } = this.props;
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
            <div className={classes.headerDay}>S</div>
            <div className={classes.headerDay}>M</div>
            <div className={classes.headerDay}>T</div>
            <div className={classes.headerDay}>W</div>
            <div className={classes.headerDay}>Th</div>
            <div className={classes.headerDay}>F</div>
            <div className={classes.headerDay}>S</div>
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
