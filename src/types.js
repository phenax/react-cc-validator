/* eslint-disable */
// NOTE: This file is not imported anywhere. Just to document types

const CardNumber = String;

const CardType = String;

const Card = {
  type : CardType,
  niceType : String,
  // ...
};

const ValidationResult = {
  isValid : Boolean,
  isCardNumberValid : Boolean,
  card : Card,
  // ...
};

const ComponentState = {
  isValid : Boolean,
  cardNumber : CardNumber,
  cardType : CardType,
};

const InputProps = {
  onChange: Function,
  value: String,
};

const PassedProps = {
  ...InputProps,
  isValid: Boolean,
  cardType: String,
  getInputProps: () => InputProps,
};

const PropTypes = {
  children: PassedProps => ReactNode,
  validCardTypes: Array[String],
  format: Boolean,
};
