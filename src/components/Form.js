import React from "react";
import countries from "country-list";
import moment from "moment";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Calendar from "./calendar/Calendar";

const styles = theme => ({
  layout: {
    width: "340px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  title: {
    margin: theme.spacing.unit
  },
  field: {
    margin: theme.spacing.unit,
    width: 300
  },
  button: {
    marginTop: "3rem",
    marginBottom: "3rem"
  },
  calendar: {
    marginTop: "2rem"
  }
});

class Form extends React.Component {
  state = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: "",
    daysLength: 0,
    countryCode: "",
    calendarOn: false,
    daysViewing: [],
    months: [],
    showError: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getDays = () => {
    const { startDate, endDate } = this.state;
    const daysViewing = [];
    for (
      let i = moment(startDate);
      i < moment(endDate);
      i = moment(i).add(1, "day")
    ) {
      daysViewing.push(moment(i).format("YYYY-MM-DD"));
    }
    return this.setState({ daysViewing }, () => this.getMonths(daysViewing));
  };

  getMonths = days => {
    const months = [];
    days.map(day => {
      const monthOfDay = moment(day).format("YYYY-MM");
      if (months.indexOf(monthOfDay) === -1) {
        months.push(monthOfDay);
      }
      return null;
    });
    return this.setState({ months });
  };

  toggleCalendar() {
    this.setState({ calendarOn: !this.state.calendarOn });
  }

  makeCalendar() {
    const { startDate, daysLength } = this.state;
    const endDate = moment(startDate)
      .add(daysLength, "days")
      .format("YYYY-MM-DD");
    this.setState({ endDate }, () => {
      this.getDays();
    });
  }

  render() {
    const { classes } = this.props;
    const {
      startDate,
      daysLength,
      countryCode,
      calendarOn,
      months,
      daysViewing,
      showError
    } = this.state;
    const validCodes = countries().getCodes();

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="title">
            Days to View
          </Typography>
          <form className={classes.container}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  label="Start"
                  type="date"
                  defaultValue={startDate}
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("startDate")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Number of days"
                  type="number"
                  value={daysLength}
                  className={classes.field}
                  onChange={this.handleChange("daysLength")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country Code"
                  value={countryCode}
                  className={classes.field}
                  onChange={this.handleChange("countryCode")}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  if (validCodes.indexOf(countryCode.toUpperCase()) > -1) {
                    if (!calendarOn) this.toggleCalendar();
                    if (showError) this.setState({ showError: false });
                    return this.makeCalendar();
                  } else {
                    if (calendarOn) this.toggleCalendar();
                    return this.setState({ showError: true });
                  }
                }}
              >
                {calendarOn ? "Update Calendar" : "View Calendar"}
              </Button>
            </Grid>
          </form>
          {calendarOn && <Calendar months={months} daysViewing={daysViewing} />}
          {showError && (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Typography variant="body2" color="secondary">
                Please enter a valid country code.
              </Typography>
            </Grid>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
