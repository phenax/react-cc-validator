
import React from 'react';
import { mount } from 'enzyme';

import cardValidator from 'card-validator';

import { cardNumberCases, mountValidatorInput, CARD_IS_VALID, CARD_IS_INVALID } from './helpers';

import CardNumberValidator, { addCard, removeCard } from '../src/CardNumberValidator';

describe('<CardNumberValidator />', () => {
  let node = null;
  let inputNode = null;

  afterEach(() => {
    if (node) {
      node.unmount();
    }
  });

  it('should render the passed component', () => {
    const InputComponent = jest.fn();
    InputComponent.mockReturnValue(<div className="test-input" />);

    node = mount(<CardNumberValidator>{InputComponent}</CardNumberValidator>);

    expect(node.props().children).toBe(InputComponent);
    expect(InputComponent).toHaveBeenCalled();
    expect(node.find('.test-input').length).toBe(1);
  });

  it('should pass the correct props to the passed component in its initial state', () => {
    const InputComponent = jest.fn();
    InputComponent.mockReturnValue(<div />);

    node = mount(<CardNumberValidator>{InputComponent}</CardNumberValidator>);

    const propsPassed = InputComponent.mock.calls[0][0];

    expect(propsPassed.isValid).toBe(false);
    expect(propsPassed.cardType).toBe('');
    expect(propsPassed.value).toBe('');
    expect(propsPassed.onChange).toBeInstanceOf(Function);
    expect(propsPassed.getInputProps().value).toBe(propsPassed.value);
    expect(propsPassed.getInputProps().onChange).toBe(propsPassed.onChange);
  });

  describe('placeholder', () => {

    beforeEach(() => {
      node = mountValidatorInput();
      inputNode = node.find('input');
    });

    it('should format the card number correctly', () => {
      cardNumberCases.forEach(
        ({ cardNum, formattedCardNum }) => {
          inputNode.instance().value = cardNum;
          inputNode.simulate('change');

          expect(node.find('.card-number').text()).toBe(formattedCardNum);
        }
      );
    });

    it('should validate the card number correctly', () => {
      cardNumberCases.forEach(
        ({ cardNum, isValid }) => {
          inputNode.instance().value = cardNum;
          inputNode.simulate('change');

          expect(node.find('.card-isvalid').text()).toBe(
            isValid ? CARD_IS_VALID : CARD_IS_INVALID
          );
        }
      );
    });

    it('should detect the correct card type', () => {
      cardNumberCases.forEach(
        ({ cardNum, cardType }) => {
          inputNode.instance().value = cardNum;
          inputNode.simulate('change');

          expect(node.find('.card-type').text()).toBe(cardType);
        }
      );
    });

    it('should handle non-digit cases', () => {
      inputNode.instance().value = 'aksfhjsfhjsdf';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);

      inputNode.instance().value = ';jdjshnjs@$#%^%dg]\\]l;l;';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
    });

    it('should handle empty cases', () => {
      inputNode.instance().value = '';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);

      inputNode.instance().value = null;
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');
      expect(node.find('.card-type').text()).toBe('');
      expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
    });
  });


  describe('with validCardTypes prop passed', () => {

    const validCardTypes = [
      'master-card',
      'visa',
    ];

    const cardNumbers = {
      withValidTypes: [
        '4111111111111111',
        '5414101008948858',
        '5479585630696996',
      ],
      withInvalidTypes: [
        '6220420252000044153',
        '3557994704466882',
        '30569309025904',
        '6759632829754159',
        '6761932556762300',
      ],
      invalid: [
        '4122423423423',
        '35424253234252352354',
        '11111111111111111',
        '4111111111111114',
      ],
    };

    beforeEach(() => {
      node = mountValidatorInput({ validCardTypes });
      inputNode = node.find('input');
    });


    it('should show valid card numbers with valid types as valid', () => {
      cardNumbers.withValidTypes.forEach(cardNum => {
        inputNode.instance().value = cardNum;
        inputNode.simulate('change');

        expect(node.find('.card-isvalid').text()).toBe(CARD_IS_VALID);
      });
    });

    it('should show valid card numbers with types not from the validCardType array as invalid', () => {
      cardNumbers.withInvalidTypes.forEach(cardNum => {
        inputNode.instance().value = cardNum;
        inputNode.simulate('change');

        expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
      });
    });

    it('should show invalid card numbers with types as invalid', () => {
      cardNumbers.invalid.forEach(cardNum => {
        inputNode.instance().value = cardNum;
        inputNode.simulate('change');

        expect(node.find('.card-isvalid').text()).toBe(CARD_IS_INVALID);
      });
    });
  });


  describe('with formatting disabled', () => {

    beforeEach(() => {
      node = mountValidatorInput({ format: false });
      inputNode = node.find('input');
    });

    it('should not format the card number', () => {
      cardNumberCases.forEach(
        ({ cardNum }) => {
          inputNode.instance().value = cardNum;
          inputNode.simulate('change');

          expect(node.find('.card-number').text()).toBe(cardNum);
        }
      );
    });

    it('should handle display all characters as it is', () => {
      inputNode.instance().value = 'aksfhjsfhjsdf';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('aksfhjsfhjsdf');

      inputNode.instance().value = ';jdjshnjs@$#%^%dg]\\]l;l;';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe(';jdjshnjs@$#%^%dg]\\]l;l;');
    });

    it('should handle empty cases', () => {
      inputNode.instance().value = '';
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');

      inputNode.instance().value = null;
      inputNode.simulate('change');

      expect(node.find('.card-number').text()).toBe('');
    });
  });
});

