
import React from 'react';
import { render } from 'react-dom';

import CardNumberValidator from '../../src/CardNumberValidator';

import styles from './styles';

const validCardTypes = [
  'visa',
  'maestro',
  'master-card',
  'unionpay',
];

const App = () => (
  <div style={styles.wrapper}>
    <h2 style={styles.heading}>
      Credit/Debit card number validation
    </h2>

    <CardNumberValidator
      validCardTypes={validCardTypes}>
      {({ isValid, cardType, getInputProps }) => (
        <div>
          <input
            type="text"
            {...getInputProps()}
            style={styles.input}
          />
          <div style={styles.cardType}>
            {isValid? cardType: ''}
          </div>
          {isValid || (
            <div style={styles.errorMessage}>
              Card number is invalid
            </div>
          )}
        </div>
      )}
    </CardNumberValidator>
  </div>
);

render(<App />, document.getElementById('root'));
