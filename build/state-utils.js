'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setState = exports.getEmptyState = exports.validationToState = undefined;

var _utils = require('./utils');

// validationResultToState :: CardNumber -> ValidationResult -> ComponentState
var validationToState = exports.validationToState = function validationToState(cardNumber) {
  return function (_ref) {
    var isValid = _ref.isValid,
        card = _ref.card;
    return {
      cardType: (0, _utils.propOr)('type', '')(card),
      cardNumber: cardNumber,
      isValid: isValid
    };
  };
};

// getEmptyState :: () -> ComponentState
var getEmptyState = exports.getEmptyState = function getEmptyState() {
  return { cardNumber: '', cardType: '', isValid: false };
};

// setState :: Component -> A -> A
var setState = exports.setState = function setState(context) {
  return function (state) {
    context.setState(state);
    return state;
  };
};