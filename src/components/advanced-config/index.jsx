/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop, debounce } from 'lodash';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText } from 'material-ui/Card';

/**
 * Internal dependencies
 */
import { getLocationConfig } from '../../selectors';
import { updateLocationConfig } from '../../actions';

class AdvancedConfig extends Component {
  static propTypes = {
    advancedConfig: PropTypes.string,
    updateConfig: PropTypes.func,
  };
  static defaultProps = {
    advancedConfig: '',
    updateConfig: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      advancedConfig: this.props.advancedConfig,
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.updateConfig = debounce(this.updateConfig, 500);
  }
  updateConfig(config) {
    this.props.updateConfig(config);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.advancedConfig !== this.props.advancedConfig) {
      let newState = this.state;
      newState.advancedConfig = nextProps.advancedConfig;
      this.setState(newState);
    }
  }

  onUpdate(e) {
    let isValid = true;
    let newState = this.state;
    newState.advancedConfig = e.target.value;

    try {
      JSON.parse(e.target.value);
    } catch (e) {
      isValid = false;
    }
    if (!isValid) {
      newState.error = 'JSON is invalid';
    } else {
      newState.error = '';
      this.updateConfig(e.target.value);
      //this.props.updateConfig(e.target.value);
    }
    this.setState(newState);
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Advanced Configuration"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TextField
            floatingLabelText="Advanced Configuration"
            multiLine={true}
            errorText={this.state.error}
            fullWidth={true}
            rows={5}
            value={this.state.advancedConfig}
            onChange={this.onUpdate}
          />
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  advancedConfig: getLocationConfig(state),
});

const mapDispatchToProps = dispatch => ({
  updateConfig: config => {
    dispatch(updateLocationConfig(config));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedConfig);
