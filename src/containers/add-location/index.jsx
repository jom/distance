/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { addLocation } from '../../actions';

class AddLocation extends Component {
  static propTypes = {
    addLocation: PropTypes.func,
  };
  static defaultProps = {
    addLocation: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
    };
    this.updateState = this.updateState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.addLocation(this.state.name, this.state.address);
    this.setState({ name: '', address: '' });
  }

  updateState(e) {
    let newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="AddLocation">
        <TextField
          floatingLabelText="Location Name"
          name="name"
          onChange={this.updateState}
          value={this.state.name}
        />
        <TextField
          floatingLabelText="Address"
          name="address"
          onChange={this.updateState}
          value={this.state.address}
        />
        <RaisedButton onClick={this.onSubmit} label="Add Location" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addLocation: (name, address) => {
    dispatch(addLocation(name, address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
