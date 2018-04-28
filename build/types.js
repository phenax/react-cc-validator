"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable */
// NOTE: This file is not imported anywhere. Just to document types

var CardNumber = exports.CardNumber = String;

var CardType = exports.CardType = String;

var Card = exports.Card = {
  type: CardType,
  niceType: String
  // ...
};

var ValidationResult = exports.ValidationResult = {
  isValid: Boolean,
  isCardNumberValid: Boolean,
  card: Card
  // ...
};

var ComponentState = exports.ComponentState = {
  isValid: Boolean,
  cardNumber: CardNumber,
  cardType: CardType
};

var InputProps = exports.InputProps = {
  onChange: Function,
  value: String
};

var PassedProps = exports.PassedProps = _extends({}, InputProps, {
  isValid: undefined.state.isValid,
  cardType: undefined.state.cardType,
  getInputProps: function getInputProps() {
    return InputProps;
  }
});

var PropTypes = exports.PropTypes = {
  children: function children(PassedProps) {
    return ReactNode;
  },
  validCardTypes: [String],
  format: Boolean
};