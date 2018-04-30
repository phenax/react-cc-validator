
import React from 'react';
import PropTypes from 'prop-types';
import cardValidator from 'card-validator';
import { formatCardNumber } from '@shaaditech/cc-number-formatter';

import { validateCardNumber, validateCardType, ifElse, compose, identity } from './utils';
import { setState, getEmptyState, validationToState } from './state-utils';

export default class CardNumberValidator extends React.PureComponent {

  // state :: ComponentState
  state = getEmptyState();

  // getValidationState :: CardNumber ~> ComponentState
  getValidationState = cardNumber =>
    ifElse(!!cardNumber, [
      compose(
        validationToState(cardNumber),
        validateCardType(this.props.validCardTypes),
        validateCardNumber,
      ),
      getEmptyState,
    ])(cardNumber);

  // onInputChange :: Event ~> Just<ComponentState>
  onInputChange = ({ target: { value: cardNumber } }) =>
    compose(
      setState(this),
      this.getValidationState,
      ifElse(this.props.format, [
        formatCardNumber,
        identity,
      ]),
    )(cardNumber);

  // getInputProps :: () ~> InputProps
  getInputProps = () => ({
    onChange: this.onInputChange,
    value: this.state.cardNumber,
  });

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
