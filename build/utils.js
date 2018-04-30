'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCardType = exports.compose = exports.ifElse = exports.validateCardNumber = exports.propOr = exports.isInArray = exports.identity = exports.log = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _cardValidator = require('card-validator');

var _cardValidator2 = _interopRequireDefault(_cardValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// log :: String -> A -> A
var log = exports.log = function log(prefix) {
  return function (x) {
    console.log(prefix, x); // eslint-disable-line
    return x;
  };
};

// identity :: A -> A
var identity = exports.identity = function identity(x) {
  return x;
};

// isInArray :: Array<A> -> A -> Boolean
var isInArray = exports.isInArray = function isInArray(arr) {
  return function (el) {
    return arr.indexOf(el) !== -1;
  };
};

// propOr :: (String, A) -> Object<String, A> -> A
var propOr = exports.propOr = function propOr(propname, defaultVal) {
  return function (obj) {
    return propname.split('.').reduce(function (acc, key) {
      return acc && acc[key];
    }, obj) || defaultVal;
  };
};

// validateCardNumber :: CardNumber -> ValidationResult
var validateCardNumber = exports.validateCardNumber = _cardValidator2.default.number;

// ifElse :: (Boolean, Array<A -> B>) -> A -> B
var ifElse = exports.ifElse = function ifElse(condition, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      onTrue = _ref2[0],
      onFalse = _ref2[1];

  return function (value) {
    return condition ? onTrue(value) : onFalse(value);
  };
};

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fnsList = Array(_len), _key = 0; _key < _len; _key++) {
    fnsList[_key] = arguments[_key];
  }

  return function (arg) {
    return fnsList.reverse().reduce(function (nextArg, fn) {
      return fn(nextArg);
    }, arg);
  };
};

// validateCardType :: ValidationResult -> ValidationResult
var validateCardType = exports.validateCardType = function validateCardType(validTypes) {
  return function (result) {
    return ifElse(result.isValid && !!validTypes.length, [compose(function (isValid) {
      return _extends({}, result, { isValid: isValid });
    }, isInArray(validTypes), propOr('card.type', '')), identity])(result);
  };
};