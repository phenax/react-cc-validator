"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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