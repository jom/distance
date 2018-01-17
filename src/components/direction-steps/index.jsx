/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import DirectionStep from '../direction-step';

export default class DirectionSteps extends Component {
  static propTypes = {
    steps: PropTypes.array,
  };
  static defaultProps = {
    steps: [],
  };

  render() {
    const style = {
      display: 'block',
      position: 'relative',
      marginBottom: 5,
      top: 5,
    };
    return (
      <div className="Steps" style={style}>
        {this.props.steps.map((step, i) => {
          let nextChevron = i !== this.props.steps.length - 1;
          return (
            <DirectionStep
              key={step.id}
              icon={step.icon}
              nextChevron={nextChevron}
              color={step.color}
              description={step.description}
            />
          );
        })}
      </div>
    );
  }
}
