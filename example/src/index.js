
import React from 'react';
import { render } from 'react-dom';

import CardNumberValidator from '../../src/CardNumberValidator';

import styles from './styles';

const App = () => (
  <CardNumberValidator
    render={({ isValid, cardType, getInputProps }) => (
      <div style={styles.wrapper}>
        <input
          type="text"
          {...getInputProps()}
          style={styles.input}
        />
        <div style={styles.cardType}>
          {(isValid && cardType) || ''}
        </div>
        {isValid || (
          <div style={styles.errorMessage}>
            Card number is invalid
          </div>
        )}
      </div>
    )}
  />
);

render(<App />, document.getElementById('root'));
