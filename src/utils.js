
// Maybe :: A -> Maybe<A>
export const Maybe = x => ({
  map: f => (x ? Maybe.Just(f(x)) : Maybe.Nothing(x)),
  // chain: f => x? f(x): Maybe.Nothing(x),
});

// Just :: A -> Just<A>
Maybe.Just = x => ({
  map: f => Maybe.Just(f(x)),
  // chain: f => f(x),
  cata: ({ Just: f }) => f(x),
});

// Nothing :: () -> Nothing
Maybe.Nothing = x => ({
  map: () => Maybe.Nothing(x),
  // chain: () => Maybe.Nothing(x),
  cata: ({ Nothing: f }) => f(x),
});

// log :: String -> A -> A
export const log = prefix => x => {
  console.log(prefix, x); // eslint-disable-line
  return x;
};

// setState :: Component -> A -> A
export const setState = context => state => {
  context.setState(state);
  return state;
};

// identity :: A -> A
export const identity = x => x;

