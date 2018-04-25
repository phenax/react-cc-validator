
import React from 'react';
import PropTypes from 'prop-types';
import cardValidator from 'card-validator';
import { formatCardNumber } from '@phenax/cc-number-formatter';

import { Maybe, log, setState } from './utils';

// type CardNumber :: String

// type CardType :: String

// type Card = { type :: CardType, niceType :: String, ... }

// type ValidationResult = { isValid :: Boolean, isCardNumberValid :: Boolean, card :: Card, ... }

// type ComponentState = { isValid :: Boolean, cardNumber :: CardNumber, cardType :: CardType }


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
  state = {
    isValid: false,
    cardNumber: '',
    cardType: '',
  };

  // formatCardNumber :: String ~> String
  formatCardNumber = cardNum =>
    this.props.format? formatCardNumber(cardNum): cardNum;

  // validateCardNumber :: CardNumber ~> ValidationResult
  validateCardNumber = cardValidator.number;

  // validateCardNumber :: ValidationResult ~> ValidationResult
  validateCardType = result => {
    result = { ...result, isCardNumberValid: result.isValid };

    const { isValid, card = {} } = result;
    const { validCardTypes } = this.props;

    return Maybe(isValid && !!validCardTypes.length)
      .map(() => validCardTypes.indexOf(card.type) !== -1)
      .cata({
        Just: isValid => ({ ...result, isValid }),
        Nothing: () => result,
      });
  };

  // validationResultToState :: CardNumber ~> ValidationResult -> ComponentState
  validationToState = cardNumber => ({ isValid, card }) =>
    ({ cardType: card ? card.type : '', cardNumber, isValid });

  // getEmptyState :: () ~> ComponentState
  getEmptyState = () =>
    ({ cardNumber: '', cardType: '', isValid: false });

  // getValidationState :: CardNumber ~> ComponentState
  getValidationState = cardNumber =>
    Maybe(cardNumber)
      .map(this.validateCardNumber)
      .map(this.validateCardType)
      // .map(log('ValidationResult'))
      .cata({
        Just: this.validationToState(cardNumber),
        Nothing: this.getEmptyState,
      });

  // getInputProps :: () ~> Object
  getInputProps = () => ({
    onChange: this.onInputChange,
    value: this.state.cardNumber,
  });

  // onInputChange :: Event ~> Array<ComponentState>
  onInputChange = ({ target: { value: cardNumber } }) =>
    Maybe.Just(cardNumber)
      .map(this.formatCardNumber)
      // .map(log('CardNumber'))
      .map(this.getValidationState)
      .map(setState(this));

  render() {
    const inputProps = {
      isValid: this.state.isValid,
      cardType: this.state.cardType,
      getInputProps: this.getInputProps,
      ...this.getInputProps(),
    };

    return <this.props.children {...inputProps} />;
  }
}

