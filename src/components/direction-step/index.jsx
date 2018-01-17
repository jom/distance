/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

/**
 * Internal dependencies
 */

export default class DirectionStep extends Component {
  static propTypes = {
    icon: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    nextChevron: PropTypes.bool,
  };

  static defaultProps = {
    icon: 'directions',
    description: '',
    nextChevron: false,
    color: '#000000',
  };

  render() {
    const iconStyles = {
      display: 'inline-block',
    };
    const chevStyles = {
      display: 'inline-block',
      fontSize: 14,
      top: -3,
    };
    return (
      <span>
        <FontIcon
          color={this.props.color}
          style={iconStyles}
          title={this.props.description}
          className="material-icons"
        >
          {this.props.icon}
        </FontIcon>
        {(() => {
          if (this.props.nextChevron) {
            return (
              <FontIcon style={chevStyles} className="material-icons">
                chevron_right
              </FontIcon>
            );
          }
        })()}
      </span>
    );
  }
}
