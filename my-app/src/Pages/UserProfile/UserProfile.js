import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

function UserProfile(props) {
  const { classes } = props;

  return (
    <div>
        User Profile
      <div>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="component-helper">
            <b>EMAIL</b>
          </InputLabel>
          <Input
            id="email"
            // must make value hold call database to get correct email
            value="my email"
            //onChange={this.handleChange}
          />
        </FormControl>
      </div>

      <div>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="component-disabled">
            <b>USERNAME</b>
          </InputLabel>
          <Input
            id="username"
            // must make value hold call database to get correct username
            value="my username"
            //onChange={this.handleChange}
          />
        </FormControl>
      </div>

      <div>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="component-disabled">
            <b>PASSWORD</b>
          </InputLabel>
          <Input
            id="password"
            // dont show password keep value ******** but allow change in password
            value="************"
            //onChange={this.handleChange}
          />
        </FormControl>
      </div>

      
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
