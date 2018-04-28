// NOTE: This file is not imported anywhere. Just to document types

export const CardNumber = String;

export const CardType = String;

export const Card = {
  type : CardType,
  niceType : String,
  // ...
};

export const ValidationResult = {
  isValid : Boolean,
  isCardNumberValid : Boolean,
  card : Card,
  // ...
};

export const ComponentState = {
  isValid : Boolean,
  cardNumber : CardNumber,
  cardType : CardType,
};
