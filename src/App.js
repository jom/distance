/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadGoogleMapsSdk from './lib/google-maps-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { AsyncPriorityQueue } from 'async-priority-queue';

/**
 * Internal dependencies
 */
import './App.css';
import { updateGoogleMapsApi, setAsyncQueue } from './actions';
import { Locations } from './locations.js';
import DistanceViewer from './containers/distance-viewer';
import { noop } from 'lodash';

class App extends Component {
  static propTypes = {
    updateGoogleMapsApi: PropTypes.func,
    setAsyncQueue: PropTypes.func,
  };
  static defaultProps = {
    updateGoogleMapsApi: noop,
    setAsyncQueue: noop,
  };
  componentWillMount() {
    loadGoogleMapsSdk(
      {
        key: process.env.REACT_APP_GOOGLE_API_KEY, // Define your api key here
        libraries: 'places,distancematrix,geocode,directions', // To request multiple libraries, separate them with a comma
      },
      googleMaps => this.props.updateGoogleMapsApi({ googleMaps })
    );
    let queue = new AsyncPriorityQueue({
      maxParallel: 3,
      processingFrequency: 550,
      debug: false,
    });
    queue.start();
    this.props.setAsyncQueue(queue);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Distance Check" showMenuIconButton={false} />
          <DistanceViewer locations={Locations} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateGoogleMapsApi: api => {
    dispatch(updateGoogleMapsApi(api));
    return true;
  },
  setAsyncQueue: queue => {
    dispatch(setAsyncQueue(queue));
    return true;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
