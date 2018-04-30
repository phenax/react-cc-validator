
// validationResultToState :: CardNumber -> ValidationResult -> ComponentState
export const validationToState = cardNumber => ({ isValid, card = {} }) => ({
  cardType: card && card.type || '',
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
