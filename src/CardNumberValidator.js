
import React from 'react';
import PropTypes from 'prop-types';
import { formatCardNumber } from '@phenax/cc-number-formatter';

import { Maybe, validateCardNumber, validateCardType, cond, identity } from './utils';
import { setState, getEmptyState, validationToState } from './state-utils';

/*
// Types

type CardNumber :: String

type CardType :: String

type Card = {
  type :: CardType,
  niceType :: String,
  ...
}

type ValidationResult = {
  isValid :: Boolean,
  isCardNumberValid :: Boolean,
  card :: Card,
  ...
}

type ComponentState = {
  isValid :: Boolean,
  cardNumber :: CardNumber,
  cardType :: CardType
}
*/


export default class CardNumberValidator extends React.PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    validCardTypes: PropTypes.arrayOf(PropTypes.string),
    format: PropTypes.bool,
  };

  static defaultProps = {
    validCardTypes: [],
    format: true,
  };

  // state :: ComponentState
  state = getEmptyState();

  // formatCardNumber :: String ~> String
  formatCardNumber =
    cond(this.props.format, [ formatCardNumber, identity ]);

  // getValidationState :: CardNumber ~> ComponentState
  getValidationState = cardNumber =>
    Maybe(cardNumber)
      .map(validateCardNumber)
      .map(validateCardType(this.props.validCardTypes))
      .cata({
        Just: validationToState(cardNumber),
        Nothing: getEmptyState,
      });

  // getInputProps :: () ~> Object
  getInputProps = () => ({
    onChange: this.onInputChange,
    value: this.state.cardNumber,
  });

  // onInputChange :: Event ~> Just<ComponentState>
  onInputChange = ({ target: { value: cardNumber } }) =>
    Maybe.Just(cardNumber)
      .map(this.formatCardNumber)
      .map(this.getValidationState)
      .map(setState(this));

  render() {
    const inputProps = {
      isValid: this.state.isValid,
      cardType: this.state.cardType,
      getInputProps: this.getInputProps,
      ...this.getInputProps(),
    };

    return this.props.children(inputProps);
  }
}

