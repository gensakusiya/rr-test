import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './list.css';

const ListItem = ({ children }) => (
  <div className="list__item">
    { children }
  </div>
);

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default class List extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  renderItem = item => (
    <ListItem>
      { item }
    </ListItem>
  );

  render() {
    const itemsHtml = React.Children.map(this.props.children, this.renderItem);

    return (
      <div className="list">
        { itemsHtml }
      </div>
    );
  }
}
