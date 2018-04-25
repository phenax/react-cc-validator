'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cardValidator = require('card-validator');

var _cardValidator2 = _interopRequireDefault(_cardValidator);

var _ccNumberFormatter = require('@phenax/cc-number-formatter');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// type CardNumber :: String

// type CardType :: String

// type Card = { type :: CardType, niceType :: String, ... }

// type ValidationResult = { isValid :: Boolean, isCardNumberValid :: Boolean, card :: Card, ... }

// type ComponentState = { isValid :: Boolean, cardNumber :: CardNumber, cardType :: CardType }


var CardNumberValidator = function (_React$PureComponent) {
  _inherits(CardNumberValidator, _React$PureComponent);

  function CardNumberValidator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardNumberValidator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardNumberValidator.__proto__ || Object.getPrototypeOf(CardNumberValidator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isValid: false,
      cardNumber: '',
      cardType: ''
    }, _this.formatCardNumber = function (cardNum) {
      return _this.props.format ? (0, _ccNumberFormatter.formatCardNumber)(cardNum) : cardNum;
    }, _this.validateCardNumber = _cardValidator2.default.number, _this.validateCardType = function (result) {
      result = _extends({}, result, { isCardNumberValid: result.isValid });

      var _result = result,
          isValid = _result.isValid,
          _result$card = _result.card,
          card = _result$card === undefined ? {} : _result$card;
      var validCardTypes = _this.props.validCardTypes;


      return (0, _utils.Maybe)(isValid && !!validCardTypes.length).map(function () {
        return validCardTypes.indexOf(card.type) !== -1;
      }).cata({
        Just: function Just(isValid) {
          return _extends({}, result, { isValid: isValid });
        },
        Nothing: function Nothing() {
          return result;
        }
      });
    }, _this.validationToState = function (cardNumber) {
      return function (_ref2) {
        var isValid = _ref2.isValid,
            card = _ref2.card;
        return { cardType: card ? card.type : '', cardNumber: cardNumber, isValid: isValid };
      };
    }, _this.getEmptyState = function () {
      return { cardNumber: '', cardType: '', isValid: false };
    }, _this.getValidationState = function (cardNumber) {
      return (0, _utils.Maybe)(cardNumber).map(_this.validateCardNumber).map(_this.validateCardType)
      // .map(log('ValidationResult'))
      .cata({
        Just: _this.validationToState(cardNumber),
        Nothing: _this.getEmptyState
      });
    }, _this.getInputProps = function () {
      return {
        onChange: _this.onInputChange,
        value: _this.state.cardNumber
      };
    }, _this.onInputChange = function (_ref3) {
      var cardNumber = _ref3.target.value;
      return _utils.Maybe.Just(cardNumber).map(_this.formatCardNumber)
      // .map(log('CardNumber'))
      .map(_this.getValidationState).map((0, _utils.setState)(_this));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // state :: ComponentState


  // formatCardNumber :: String ~> String


  // validateCardNumber :: CardNumber ~> ValidationResult


  // validateCardNumber :: ValidationResult ~> ValidationResult


  // validationResultToState :: CardNumber ~> ValidationResult -> ComponentState


  // getEmptyState :: () ~> ComponentState


  // getValidationState :: CardNumber ~> ComponentState


  // getInputProps :: () ~> Object


  // onInputChange :: Event ~> Array<ComponentState>


  _createClass(CardNumberValidator, [{
    key: 'render',
    value: function render() {
      var inputProps = _extends({
        isValid: this.state.isValid,
        cardType: this.state.cardType,
        getInputProps: this.getInputProps
      }, this.getInputProps());

      return _react2.default.createElement(this.props.children, inputProps);
    }
  }]);

  return CardNumberValidator;
}(_react2.default.PureComponent);

CardNumberValidator.propTypes = {
  children: _propTypes2.default.func.isRequired,
  validCardTypes: _propTypes2.default.arrayOf(_propTypes2.default.string),
  format: _propTypes2.default.bool
};
CardNumberValidator.defaultProps = {
  validCardTypes: [],
  format: true
};
exports.default = CardNumberValidator;