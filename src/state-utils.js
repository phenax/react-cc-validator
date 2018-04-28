
import { propOr } from './utils';

// validationResultToState :: CardNumber -> ValidationResult -> ComponentState
export const validationToState = cardNumber => ({ isValid, card }) => ({
  cardType: propOr('type', '')(card),
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
