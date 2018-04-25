
import React from 'react';
import { mount } from 'enzyme';

import CardNumberValidator from '../../src/CardNumberValidator';

export const CARD_IS_VALID = 'CARD_IS_VALID';
export const CARD_IS_INVALID = 'CARD_IS_INVALID';


export const mountValidatorInput = props => {

  const InputComponent = ({
    getInputProps,
    value,
    isValid,
    cardType,
  }) => (
    <div>
      <input
        type="text"
        {...getInputProps()}
      />
      <div className="card-number">{value}</div>
      <div className="card-type">{cardType}</div>
      <div className="card-isvalid">
        {isValid ? CARD_IS_VALID : CARD_IS_INVALID}
      </div>
    </div>
  );

  return mount(<CardNumberValidator {...props}>{InputComponent}</CardNumberValidator>);
};

export const cardNumberCases = [
  {
    cardNum: '4111111111111111',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4393398158868260',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4393398158868260',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4024007101880',
    cardType: 'visa',
    isValid: false,
  },
  {
    cardNum: '4024007101880259',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '40240071018809012',
    cardType: 'visa',
    isValid: false,
  },

  {
    cardNum: '5414101008948858',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5479585630696996',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5114115214262121',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5114115274262121',
    cardType: 'master-card',
    isValid: false,
  },
  {
    cardNum: '5148346584434657',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5229489625938443',
    cardType: 'master-card',
    isValid: true,
  },

  {
    cardNum: '6759632829754159',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '6761932556762300',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '5020023206271691',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '5610591081018250',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '6771771771771771774',
    cardType: 'maestro',
    isValid: true,
  },

  {
    cardNum: '6220420252000044153',
    cardType: 'unionpay',
    isValid: true,
  },
  {
    cardNum: '3557994704466882',
    cardType: 'jcb',
    isValid: true,
  },
  {
    cardNum: '30569309025904',
    cardType: 'diners-club',
    isValid: true,
  },
];
