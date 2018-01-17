/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { assign, debounce } from 'lodash';
import { red300 } from 'material-ui/styles/colors';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import moment from 'moment';

/**
 * Internal dependencies
 */
import { getGoogleMapsApi, getAsyncQueue } from '../../selectors';
import DirectionSteps from '../direction-steps';
import { AsyncTask } from 'async-priority-queue';

class Travel extends Component {
  static propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    mode: PropTypes.string,
    googleMapsApi: PropTypes.object,
    queue: PropTypes.object,
  };
  static defaultProps = {
    origin: '',
    destination: '',
    mode: 'TRANSIT',
    googleMapsApi: {},
    queue: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      fetching: true,
      fetched: false,
      error: false,
      duration: null,
      distance: null,
      description: null,
      steps: [],
    };
    this.handleDirectionsResponse = this.handleDirectionsResponse.bind(this);
    this.makeApiRequest = debounce(this.makeApiRequest, 1500);
  }
  parseResults(result) {
    let parsed = {
      fetched: true,
      duration: null,
      distance: null,
      walking_distance: 0,
      error: false,
      description: null,
      steps: [],
    };
    if (
      typeof result.routes[0] === undefined ||
      typeof result.routes[0].legs[0] === undefined
    ) {
      parsed.error = true;
      parsed.description = 'No routes found';
    }
    let leg = result.routes[0].legs[0];
    parsed.distance = leg.distance.text;
    parsed.duration = leg.duration.text;
    let stepCount = 0;
    leg.steps.forEach(function(step) {
      let pstep = { id: stepCount++, color: '#000000' };
      switch (step.travel_mode) {
        case 'WALKING':
          parsed.walking_distance += step.distance.value;
          pstep.description =
            step.instructions + ' (' + step.distance.text + ')';
          pstep.icon = 'directions_walk';
          break;
        case 'TRANSIT':
          pstep.icon = 'directions_transit';
          if (typeof step.transit.line === 'undefined') {
            pstep.description = step.instructions;
          } else {
            let line = step.transit.line;
            pstep.description = line.name;
            pstep.color = line.color === '#ffffff' ? '#000000' : line.color;
            if (line.vehicle.type.match(/BUS/)) {
              pstep.icon = 'directions_bus';
            }
          }
          pstep.description =
            pstep.description +
            ' from ' +
            step.transit.departure_stop.name +
            ' to ' +
            step.transit.arrival_stop.name +
            ' (' +
            step.transit.num_stops +
            ' stops)';
          break;
        case 'BICYCLING':
          pstep.description =
            step.instructions + ' (' + step.distance.text + ')';
          pstep.icon = 'directions_bike';
          break;
        case 'DRIVING':
          pstep.description =
            step.instructions + ' (' + step.distance.text + ')';
          pstep.icon = 'directions_car';
          break;
        default:
          pstep.description = step.instructions;
          pstep.icon = 'directions';
          break;
      }
      parsed.steps.push(pstep);
    });
    return parsed;
  }
  handleDirectionsResponse(result, status, resolve, reject) {
    let newState = this.state;
    newState.fetching = false;
    let api = this.props.googleMapsApi.googleMaps;
    if (status === api.DirectionsStatus.OK) {
      let results = this.parseResults(result);
      newState = assign({}, newState, results);
      resolve();
    } else {
      newState.error = true;
      reject();
    }
    this.setState(newState);
  }
  makeApiRequest(props) {
    let api = props.googleMapsApi.googleMaps;
    let directionsService = new api.DirectionsService();
    let standardDate = moment()
      .day(9)
      .hour(10)
      .toDate();
    let request = {
      origin: props.origin,
      destination: props.destination,
      travelMode: props.mode,
    };
    if (request.travelMode === 'TRANSIT') {
      request.transitOptions = {
        departureTime: standardDate,
      };
    }
    if (request.travelMode === 'DRIVING') {
      request.drivingOptions = {
        departureTime: standardDate,
      };
    }
    let self = this;
    let task = new AsyncTask({
      priority: 'high',
      callback: function() {
        return new Promise(function(resolve, reject) {
          return directionsService.route(request, function(result, status) {
            self.handleDirectionsResponse(result, status, resolve, reject);
          });
        });
      },
    });
    this.props.queue.enqueue(task);
  }
  componentWillMount() {
    let newState = this.state;
    newState.fetching = false;
    newState.ready =
      this.props.origin && this.props.destination && this.props.googleMapsApi;
    if (newState.ready) {
      newState.error = false;
      newState.fetching = true;
      newState.description = '';
      this.makeApiRequest(this.props);
    }
    this.setState(newState);
  }
  componentWillReceiveProps(nextProps) {
    let newState = this.state;
    newState.fetching = false;
    newState.ready =
      nextProps.origin && nextProps.destination && nextProps.googleMapsApi;
    let hasChanged =
      !this.state.fetched ||
      nextProps.origin !== this.props.origin ||
      nextProps.destination !== this.props.destination;

    if (newState.ready && hasChanged) {
      newState.error = false;
      newState.fetching = true;
      newState.description = '';
      this.makeApiRequest(nextProps);
    }
    this.setState(newState);
  }

  render() {
    let description = '';
    let steps = '';
    if (!this.state.ready) {
      description = '';
    } else if (this.state.fetching) {
      const refreshIndicatorStyle = {
        display: 'inline-block',
        position: 'relative',
      };
      description = (
        <RefreshIndicator
          size={30}
          top={0}
          left={20}
          style={refreshIndicatorStyle}
          status="loading"
        />
      );
    } else if (this.state.error) {
      let error = 'Error';
      if (this.state.description) {
        error = this.state.description;
      }
      description = <Chip backgroundColor={red300}>{error}</Chip>;
    } else {
      let walking = '';
      if (this.state.walking_distance > 0) {
        walking = ' / ' + this.state.walking_distance / 1000 + ' km walking';
      }
      description = (
        <Chip style={{ display: 'inline-block' }}>
          {this.state.duration} / {this.state.distance}
          {walking}
        </Chip>
      );
      if (this.state.steps.length < 12) {
        steps = <DirectionSteps steps={this.state.steps} />;
      } else {
        const style = {
          display: 'block',
          position: 'relative',
          marginBottom: 5,
          top: 5,
        };
        let title = 'Total steps: ' + this.state.steps.length;
        steps = (
          <div style={style} title={title}>
            <FontIcon className="material-icons">
              {this.state.steps[0].icon}
            </FontIcon>{' '}
            <FontIcon className="material-icons">more_horiz</FontIcon>{' '}
            <FontIcon className="material-icons">
              {this.state.steps[this.state.steps.length - 1].icon}
            </FontIcon>
          </div>
        );
      }
    }
    return (
      <div className="Travel" style={{ position: 'relative' }}>
        {description}
        {steps}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  googleMapsApi: getGoogleMapsApi(state),
  queue: getAsyncQueue(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Travel);
