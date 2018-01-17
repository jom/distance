/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

/**
 * Internal dependencies
 */
import Location from '../../components/location';
import { getLocations } from '../../selectors';

class Locations extends Component {
  static propTypes = {
    locations: PropTypes.array,
  };
  static defaultProps = {
    locations: [],
  };

  render() {
    return (
      <Table selectable={false} className="Locations">
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Address</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '40%' }}>Trip</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true}>
          {this.props.locations.map(location => (
            <Location
              key={location.id}
              id={location.id}
              name={location.name}
              address={location.address}
              mode={location.mode}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  locations: getLocations(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
