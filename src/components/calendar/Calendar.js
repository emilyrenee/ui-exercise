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
        this.makeMonths(nextProps.months, nextProps.daysViewing);
      }
    }
  }

  makeMonths(monthsIn, daysIn) {
    const monthOfDays = [];
    for (let i = 0; i < monthsIn.length; ++i) {
      const days = daysIn.filter(day => day.split("-")[1] === monthsIn[i]);

      const startDate = moment(days[0]).format("YYYY-MM-DD");
      const invalidStartDate = moment(days[0])
        .startOf("week")
        .format("YYYY-MM-DD");

      const endDate = moment(days[days.length]).format("YYYY-MM-DD");
      const invalidEndDate = moment(days[days.length])
        .endOf("week")
        .format("YYYY-MM-DD");

      if (i === 0) {
        // take the first day --> get start of week
        for (
          let i = moment(startDate);
          i > moment(invalidStartDate);
          i = moment(i).subtract(1, "day")
        ) {
          days.unshift(moment(i).format("YYYY-MM-DD"));
        }
      }

      if (i === monthsIn.length - 1) {
        // take last day ---> get end of week
        for (
          let i = moment(endDate);
          i <= moment(invalidEndDate);
          i = moment(i).add(1, "day")
        ) {
          days.push(moment(i).format("YYYY-MM-DD"));
        }
      }
      monthOfDays.push(days);
    }
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
