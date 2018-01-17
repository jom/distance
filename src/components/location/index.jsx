/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

/**
 * Internal dependencies
 */
import { getBaseLocation } from '../../selectors';
import { deleteLocation } from '../../actions';
import Travel from '../travel';

class Location extends Component {
  static propTypes = {
    baseLocation: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
    mode: PropTypes.string,
    distance: PropTypes.object,
    deleteLocation: PropTypes.func,
  };
  static defaultProps = {
    baseLocation: '',
    id: '',
    name: '',
    address: '',
    mode: 'TRANSIT',
    distance: {},
    deleteLocation: noop,
  };

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.deleteLocation(this.props.id);
  }

  render() {
    let transitUrl =
      'https://www.google.com/maps/dir/?api=1&travelmode=transit';
    transitUrl += '&origin=' + encodeURIComponent(this.props.baseLocation);
    transitUrl += '&destination=' + encodeURIComponent(this.props.address);
    let buttonStyle = { verticalAlign: 'middle' };
    return (
      <TableRow className="Location">
        <TableRowColumn>{this.props.name}</TableRowColumn>
        <TableRowColumn>{this.props.address}</TableRowColumn>
        <TableRowColumn style={{ width: '40%' }}>
          <Travel
            origin={this.props.baseLocation}
            destination={this.props.address}
            mode={this.props.mode}
          />
        </TableRowColumn>
        <TableRowColumn>
          <IconButton target="_blank" href={transitUrl} style={buttonStyle}>
            <FontIcon className="material-icons">directions</FontIcon>
          </IconButton>
          <IconButton onClick={this.onDelete} style={buttonStyle}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    );
  }
}

const mapStateToProps = state => ({
  baseLocation: getBaseLocation(state),
});

const mapDispatchToProps = dispatch => ({
  deleteLocation: id => {
    dispatch(deleteLocation(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
