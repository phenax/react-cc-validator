
import cardValidator from 'card-validator';

// log :: String -> A -> A
// export const log = prefix => x => {
//   console.log(prefix, x); // eslint-disable-line
//   return x;
// };

// identity :: A -> A
export const identity = x => x;

// isInArray :: Array<A> -> A -> Boolean
export const isInArray = arr => el =>
  arr.indexOf(el) !== -1;

// prop :: (String, A) -> Object<String, A> -> A
export const prop = (propname, defaultVal) => obj =>
  propname.split('.')
    .reduce((acc, key) => acc && acc[key], obj) || defaultVal;

// validateCardNumber :: CardNumber -> ValidationResult
export const validateCardNumber = cardValidator.number;

// ifElse :: (Boolean, Array<A -> B>) -> A -> B
export const ifElse = (condition, [ onTrue, onFalse ]) => value =>
  condition? onTrue(value): onFalse(value);

// compose :: Array<A -> B> -> C -> D
export const compose = (...fns) => arg =>
  fns.reverse()
    .reduce((nextArg, fn) => fn(nextArg), arg);

// validateCardType :: ValidationResult -> ValidationResult
export const validateCardType = validTypes => result =>
  ifElse(result.isValid && !!validTypes.length, [
    compose(
      isValid => ({ ...result, isValid }),
      isInArray(validTypes),
      prop('card.type', ''),
    ),
    identity,
  ])(result);

// validationResultToState :: CardNumber -> ValidationResult -> ComponentState
export const validationToState = cardNumber => ({ isValid, card = {} }) => ({
  cardType: prop('type', '')(card),
  cardNumber,
  isValid,
});

// getEmptyState :: () -> ComponentState
export const getEmptyState = () =>
  ({ cardNumber: '', cardType: '', isValid: false });

// setState :: Component -> A -> A
export const setState = context => state => {
  context.setState(state);
  return state;
};
