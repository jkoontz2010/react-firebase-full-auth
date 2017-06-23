import ValidatingInput from '../lib/components/ValidatingInput';
import React from 'react';
import { mount } from 'enzyme';

describe('ValidatingInput', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<ValidatingInput />);
    })

    it('renders a text input', () => {
        expect(wrapper.length).toEqual(1);
    })

    it('displays errors for a field after blur', () => {
        // form__error
    })
});