import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      labelWidth: 0,
      status_types: [],
      handleStatus: props.handleStatus,
    };
  }

  

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });

    //get_status_types
    fetch('http://localhost:4000/get_status_types')
      .then(res => res.json())
      .then(res => {
        let newstate = res.status_types.map(x => x.Status_Type);
        this.setState({status_types: newstate})
      })


  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.state.handleStatus(event)
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-status-simple"
          >
            Status
          </InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="status"
                id="outlined-status-simple"
              />
            }
          >


            {this.state.status_types.map(x => <MenuItem value={x}>{x}</MenuItem>)}

          </Select>
        </FormControl>

      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
