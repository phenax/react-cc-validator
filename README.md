
# react-cc-validator
Credit/Debit card number validator input written in react.
[Demo](https://phenax.github.io/react-cc-validator)


[![Travis](https://img.shields.io/travis/phenax/react-cc-validator.svg?style=for-the-badge)](https://travis-ci.org/phenax/react-cc-validator)
[![Codecov](https://img.shields.io/codecov/c/github/phenax/react-cc-validator.svg?style=for-the-badge)](https://codecov.io/gh/phenax/react-cc-validator)
[![forthebadge](https://forthebadge.com/images/badges/built-with-science.svg)](https://forthebadge.com)
<!-- [![npm](https://img.shields.io/npm/v/@phenax/react-cc-validator.svg?style=for-the-badge)] -->



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
