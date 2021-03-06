
import React from 'react';
import PropTypes from 'prop-types';
import cardValidator from 'card-validator';
import { formatCardNumber } from '@shaaditech/cc-number-formatter';

import { Maybe, validateCardNumber, validateCardType, cond, identity } from './utils';
import { setState, getEmptyState, validationToState } from './state-utils';

export default class CardNumberValidator extends React.PureComponent {

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

  // getInputProps :: () ~> InputProps
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

  // render :: () ~> ReactNode
  render = () =>
    this.props.children({
      isValid: this.state.isValid,
      cardType: this.state.cardType,
      getInputProps: this.getInputProps,
      ...this.getInputProps(),
    });
}

CardNumberValidator.propTypes = {
  children: PropTypes.func.isRequired,
  validCardTypes: PropTypes.arrayOf(PropTypes.string),
  format: PropTypes.bool,
};

CardNumberValidator.defaultProps = {
  validCardTypes: [],
  format: true,
};

export { cardValidator };
