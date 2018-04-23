
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CardNumberValidator from '../src/CardNumberValidator';

Enzyme.configure({ adapter: new Adapter() });

const CARD_IS_VALID = 'CARD_IS_VALID';
const CARD_IS_INVALID = 'CARD_IS_INVALID';

const cardNumberCases = [
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

describe('<CardNumberValidator />', () => {
  let node = null;

  afterEach(() => {
    if (node) {
      node.unmount();
    }
  });

  it('should render the passed component', () => {
    const InputComponent = jest.fn();
    InputComponent.mockReturnValue(<div className="test-input" />);

    node = mount(<CardNumberValidator render={InputComponent} />);

    expect(node.props().render).toBe(InputComponent);
    expect(InputComponent).toHaveBeenCalled();
    expect(node.find('.test-input').length).toBe(1);
  });

  it('should pass the correct props to the passed component in its initial state', () => {
    const InputComponent = jest.fn();
    InputComponent.mockReturnValue(<div />);

    node = mount(<CardNumberValidator render={InputComponent} />);

    const propsPassed = InputComponent.mock.calls[0][0];

    expect(propsPassed.isValid).toBe(false);
    expect(propsPassed.cardType).toBe('');
    expect(propsPassed.value).toBe('');
    expect(propsPassed.onChange).toBeInstanceOf(Function);
    expect(propsPassed.getInputProps().value).toBe(propsPassed.value);
    expect(propsPassed.getInputProps().onChange).toBe(propsPassed.onChange);
  });

  describe('validation', () => {
    let inputRef = null;

    beforeEach(() => {
      const InputComponent = ({
        getInputProps,
        value,
        isValid,
        cardType,
      }) => (
        <div>
          <input
            type="text"
            ref={x => (inputRef = x)}
            {...getInputProps()}
          />
          <div className="card-number">{value}</div>
          <div className="card-type">{cardType}</div>
          <div className="card-isvalid">
            {isValid ? CARD_IS_VALID : CARD_IS_INVALID}
          </div>
        </div>
      );

      node = mount(<CardNumberValidator render={InputComponent} />);
    });

    it('should validate the card number correctly', () => {
      cardNumberCases.forEach(
        ({ cardNum, isValid }) => {
          inputRef.value = cardNum;
          node.find('input').simulate('change');

          expect(node.find('.card-isvalid').text()).toBe(
            isValid ? CARD_IS_VALID : CARD_IS_INVALID
          );
        }
      );
    });

    it('should detect the correct card type', () => {
      cardNumberCases.forEach(
        ({ cardNum, cardType }) => {
          inputRef.value = cardNum;
          node.find('input').simulate('change');

          expect(node.find('.card-type').text()).toBe(cardType);
        }
      );
    });

    it('should handle non-digit cases', () => {
      inputRef.value = 'aksfhjsfhjsdf';
      node.find('input').simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);

      inputRef.value = ';jdjshnjs@$#%^%dg]\\]l;l;';
      node.find('input').simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
    });

    it('should handle empty cases', () => {
      inputRef.value = '';
      node.find('input').simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);

      inputRef.value = null;
      node.find('input').simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
    });
  });
});

