/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { updateBaseLocation } from '../../actions';
import { getBaseLocation } from '../../selectors';

class BaseLocation extends Component {
  static propTypes = {
    baseLocation: PropTypes.string,
    updateBaseLocation: PropTypes.func,
  };
  static defaultProps = {
    baseLocation: '',
    updateBaseLocation: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      baseLocation: '',
    };
  }

  handleChange = event => {
    this.setState({
      baseLocation: event.target.value,
    });
    this.props.updateBaseLocation(event.target.value);
  };

  render() {
    return (
      <div className="BaseLocation">
        <TextField
          fullWidth={true}
          onChange={this.handleChange}
          floatingLabelText="Origin Location"
          value={this.props.baseLocation}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  baseLocation: getBaseLocation(state),
});

const mapDispatchToProps = dispatch => ({
  updateBaseLocation: e => {
    dispatch(updateBaseLocation(e));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLocation);
