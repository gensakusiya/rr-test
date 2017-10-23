import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './select.css';

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  };

  constructor(props) {
    super();

    this.state = {
      isOpen: false,
      label: this.getLabel(props.options, props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: this.getLabel(nextProps.options, nextProps.value),
    });
  }

  getLabel = (options, value) => {
    if (options.length) {
      const currentOption = options.find(item => item.value === value);

      if (currentOption === null) {
        throw Error(`${value} value is not current range`);
      }

      return currentOption.label;
    }

    return null;
  };

  changeOpenState = () => this.setState({
    isOpen: !this.state.isOpen,
  });

  handleOpen = (e) => {
    e.stopPropagation();

    this.changeOpenState();
  };

  handleSelect = (e, option) => {
    e.stopPropagation();

    this.props.onSelect(option);
    this.changeOpenState();
  };

  renderOption = option => (
    <div
      key={option.value}
      className="select__item"
      onClick={e => this.handleSelect(e, option)}
    >
      { option.label }
    </div>
  );

  render() {
    const { options } = this.props;
    const { label, isOpen } = this.state;

    if (!options.length) return null;

    const optionsHtml = options.map(this.renderOption);
    const mainClassName = `select ${isOpen ? 'open' : ''}`;

    return (
      <div className={mainClassName}>
        <div
          onClick={this.handleOpen}
          className="select__title"
        >
          <div className="select__label">
            { label }
          </div>
          <div className="select__arrow" />
        </div>
        <div className="select__list">
          { optionsHtml }
        </div>
      </div>
    );
  }
}
