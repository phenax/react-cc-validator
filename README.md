
# react-cc-validator
Credit/Debit card number validator input written in react.

[![Build Status](https://travis-ci.org/phenax/react-cc-validator.svg?branch=master)](https://travis-ci.org/phenax/react-cc-validator)


### Install

* Add package in project using
`yarn add @phenax/react-cc-validator`

* Import
```js
import CardNumberValidator from '@phenax/react-cc-validator';
```

### API

#### Usage
You can refer to [/example](https://github.com/phenax/react-cc-validator/tree/master/example/src)

```js
const YourComponent = () => (
  <div>
    <CardNumberValidator>
      {({ isValid, cardType, getInputProps }) => (
        <div>
          <input type="text" {...getInputProps()} />
          <div>{ isValid && cardType }</div>
          {isValid || <div>Card number is invalid</div>}
        </div>
      )}
    </CardNumberValidator>
  </div>
);
```

#### Types
```js
// The props that can be passed to CardNumberValidator compopent
type PropTypes = {
  children: PassedProps => ReactNode,
  validCardTypes: Array<String>,
  format: Boolean,
};

// The props to be passed to the input element
type InputProps = {
  onChange: Function,
  value: String,
};

// The props passed down to the render component
type PassedProps = {
  ...InputProps,
  isValid: Boolean,
  cardType: String,
  getInputProps: () => InputProps,
};
```
