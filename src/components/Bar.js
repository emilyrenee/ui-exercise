import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  appBar: {
    position: "relative"
  }
});
const Bar = ({ classes }) => (
  <AppBar position="absolute" color="default" className={classes.appBar}>
    <Toolbar>
      <Typography variant="title" color="inherit" noWrap>
        Calendar Viewer
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Bar);
