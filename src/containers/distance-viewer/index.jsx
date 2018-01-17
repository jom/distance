/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

/**
 * Internal dependencies
 */
import './style.css';
import BaseLocation from '../base-location';
import AddLocation from '../add-location';
import Locations from '../locations';
import AdvancedConfig from '../../components/advanced-config';
import Divider from 'material-ui/Divider';

export default class DistanceViewer extends PureComponent {
  static propTypes = {
    locations: PropTypes.array,
    baseLocation: PropTypes.string,
  };
  static defaultProps = {
    locations: [],
    baseLocation: '',
  };
  render() {
    let dividerStyle = {
      marginTop: '1em',
      marginBottom: '1em',
    };
    return (
      <div className="DistanceViewer">
        <Paper className="MainView" zDepth={1}>
          <BaseLocation />
          <Divider style={dividerStyle} />
          <Locations />
          <AddLocation />
          <Divider style={dividerStyle} />
          <AdvancedConfig />
        </Paper>
      </div>
    );
  }
}
