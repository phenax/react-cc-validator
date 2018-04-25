
import React from 'react';
import PropTypes from 'prop-types';
import cardValidator from 'card-validator';
import { formatCardNumber } from '@phenax/cc-number-formatter';

import { Maybe, log, setState , identity} from './utils';

// type CardNumber :: String
// type CardType :: String
// type Card = { type :: CardType, niceType :: String, ... }
// type ValidationResult = { isValid :: Boolean, isCardNumberValid :: Boolean, card :: Card, ... }
// type ComponentState = { isValid :: Boolean, cardNumber :: CardNumber, cardType :: CardType }

export default class CardNumberValidator extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    validCardTypes: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    validCardTypes: [],
  };

  // state :: ComponentState
  state = {
    isValid: false,
    cardNumber: '',
    cardType: '',
  };

  // validateCardNumber :: ValidationResult ~> ValidationResult
  validateCardType = validationResult => {

    const { isValid, card: { type } } = validationResult;
    const { validCardTypes } = this.props;

    validationResult.isCardNumberValid = validationResult.isValid;

    return Maybe(isValid && !!validCardTypes.length)
      .map(() => validCardTypes.indexOf(type) !== -1)
      .cata({
        Just: isValid => ({ ...validationResult, isValid }),
        Nothing: () => validationResult,
      });
  };

  // validateCardNumber :: CardNumber ~> ValidationResult
  validateCardNumber = cardValidator.number;

  // validationResultToState :: CardNumber ~> ValidationResult -> ComponentState
  validationToState = cardNumber => ({ isValid, card }) => ({
    cardType: card ? card.type : '',
    cardNumber,
    isValid,
  });

  // getEmptyState :: () ~> ComponentState
  getEmptyState = () => ({
    cardNumber: '',
    cardType: '',
    isValid: false,
  });

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
  // @sideEffect - Reads from state
  getInputProps = () => ({
    onChange: this.onInputChange,
    value: this.state.cardNumber,
  });

  // onInputChange :: Event ~> Array<ComponentState>
  // @sideEffect - setState
  onInputChange = ({ target: { value: cardNumber } }) =>
    Maybe.Just(cardNumber)
      .map(formatCardNumber)
      // .map(log('CardNumber'))
      .map(this.getValidationState)
      // .map(log('NewState'))
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

