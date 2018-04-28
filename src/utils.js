
import cardValidator from 'card-validator';

// Maybe :: A -> Maybe<A>
export const Maybe = x => ({
  map: f => (x ? Maybe.Just(f(x)) : Maybe.Nothing(x)),
  // chain: f => x? f(x): Maybe.Nothing(x),
});

// Just :: A -> Just<A>
Maybe.Just = x => ({
  map: f => Maybe.Just(f(x)),
  fold: f => f(x),
  cata: ({ Just: f }) => f(x),
});

// Nothing :: () -> Nothing
Maybe.Nothing = x => ({
  map: () => Maybe.Nothing(x),
  fold: () => Maybe.Nothing(x),
  cata: ({ Nothing: f }) => f(x),
});

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
  obj? obj[propname]: defaultVal;

// validateCardNumber :: CardNumber -> ValidationResult
export const validateCardNumber = cardValidator.number;

// cond :: (Boolean, Array<A -> B>) -> A -> B
export const cond = (condition, [ onTrue, onFalse ]) => value =>
  condition? onTrue(value): onFalse(value);

// validateCardType :: ValidationResult -> ValidationResult
export const validateCardType = validTypes => result => {
  result = { ...result, isCardNumberValid: result.isValid };

  return Maybe(result.isValid && !!validTypes.length)
    .map(() => result.card)
    .map(propOr('type', ''))
    .map(isInArray(validTypes))
    .cata({
      Just: isValid => ({ ...result, isValid }),
      Nothing: () => result,
    });
};
