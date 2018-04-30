
import cardValidator from 'card-validator';

// log :: String -> A -> A
export const log = prefix => x => {
  console.log(prefix, x); // eslint-disable-line
  return x;
};

// identity :: A -> A
export const identity = x => x;

// isInArray :: Array<A> -> A -> Boolean
export const isInArray = arr => el =>
  arr.indexOf(el) !== -1;

// propOr :: (String, A) -> Object<String, A> -> A
export const propOr = (propname, defaultVal) => obj =>
  propname
    .split('.')
    .reduce((acc, key) => acc && acc[key], obj) || defaultVal;

// validateCardNumber :: CardNumber -> ValidationResult
export const validateCardNumber = cardValidator.number;

// ifElse :: (Boolean, Array<A -> B>) -> A -> B
export const ifElse = (condition, [ onTrue, onFalse ]) => value =>
  condition? onTrue(value): onFalse(value);

export const compose = (...fnsList) => arg =>
  fnsList
    .reverse()
    .reduce((nextArg, fn) => fn(nextArg), arg);

// validateCardType :: ValidationResult -> ValidationResult
export const validateCardType = validTypes => result =>
  ifElse(result.isValid && !!validTypes.length, [
    compose(
      isValid => ({ ...result, isValid }),
      isInArray(validTypes),
      propOr('card.type', ''),
    ),
    identity,
  ])(result);
