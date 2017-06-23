import ValidatingInput from '../lib/components/ValidatingInput';
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('ValidatingInput', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<ValidatingInput />);
    })

    it('renders a text input', () => {
        expect(wrapper.find('input').length).toEqual(1);
    })

    it('displays errors for a field only after blur', () => {

        const errorWrapper = shallow(<ValidatingInput errors={'error'} />)
        
        expect(errorWrapper.find('.form__error').length).toEqual(0);
        errorWrapper.find('input').simulate('blur');
        expect(errorWrapper.find('.form__error').length).toEqual(1);

    })
});