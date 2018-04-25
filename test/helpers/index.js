
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
    formattedCardNum: '4111 1111 1111 1111',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4393398158868260',
    formattedCardNum: '4393 3981 5886 8260',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4393398158868260',
    formattedCardNum: '4393 3981 5886 8260',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '4024007101880',
    formattedCardNum: '4024 0071 0188 0',
    cardType: 'visa',
    isValid: false,
  },
  {
    cardNum: '4024007101880259',
    formattedCardNum: '4024 0071 0188 0259',
    cardType: 'visa',
    isValid: true,
  },
  {
    cardNum: '40240071018809012',
    formattedCardNum: '4024 0071 0188 0901',
    cardType: 'visa',
    isValid: false,
  },

  {
    cardNum: '5414101008948858',
    formattedCardNum: '5414 1010 0894 8858',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5479585630696996',
    formattedCardNum: '5479 5856 3069 6996',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5114115214262121',
    formattedCardNum: '5114 1152 1426 2121',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5114115274262121',
    formattedCardNum: '5114 1152 7426 2121',
    cardType: 'master-card',
    isValid: false,
  },
  {
    cardNum: '5148346584434657',
    formattedCardNum: '5148 3465 8443 4657',
    cardType: 'master-card',
    isValid: true,
  },
  {
    cardNum: '5229489625938443',
    formattedCardNum: '5229 4896 2593 8443',
    cardType: 'master-card',
    isValid: true,
  },

  {
    cardNum: '6759632829754159',
    formattedCardNum: '6759 6328 2975 4159',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '6761932556762300',
    formattedCardNum: '6761 9325 5676 2300',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '5020023206271691',
    formattedCardNum: '5020 0232 0627 1691',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '5610591081018250',
    formattedCardNum: '5610 5910 8101 8250',
    cardType: 'maestro',
    isValid: true,
  },
  {
    cardNum: '6771771771771771774',
    formattedCardNum: '6771 7717 7177 1771 774',
    cardType: 'maestro',
    isValid: true,
  },

  {
    cardNum: '6220420252000044153',
    formattedCardNum: '6220 4202 5200 0044 153',
    cardType: 'unionpay',
    isValid: true,
  },
  {
    cardNum: '3557994704466882',
    formattedCardNum: '3557 9947 0446 6882',
    cardType: 'jcb',
    isValid: true,
  },
  {
    cardNum: '30569309025904',
    formattedCardNum: '3056 930902 5904',
    cardType: 'diners-club',
    isValid: true,
  },
];
