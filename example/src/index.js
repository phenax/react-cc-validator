
import React from 'react';
import { render } from 'react-dom';

import CardNumberValidator from '../../build/CardValidator';

const App = () => (
  <div>
    <div>Yo</div>
    <div>
      <CardNumberValidator
        render={({ isValid, getInputProps }) => (
          <div>
            <input type='text' {...getInputProps()} />
            {isValid? 'valid': 'invalid'}
          </div>
        )}
      />
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
