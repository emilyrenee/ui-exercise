import React from "react";
import countries from "country-list";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
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
  }
});

class Form extends React.Component {
  state = {
    startDate: "",
    daysLength: 0,
    countryCode: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  makeCalendar() {
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
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
                  defaultValue="2018-09-05"
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
                  value={this.state.daysLength}
                  className={classes.field}
                  onChange={this.handleChange("daysLength")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country Code"
                  value={this.state.countryCode}
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
                  if (
                    validCodes.indexOf(this.state.countryCode.toUpperCase()) > -1
                  ) {
                    return this.makeCalendar();
                  } else console.log("I need to handle error");
                }}
              >
                {/* if calendar is already present, update calendar */}
                View Calendar
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
