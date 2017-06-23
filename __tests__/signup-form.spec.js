import SignupForm from '../lib/components/SignupForm';
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('SignupForm', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<SignupForm />);
    })
    it('should render', () => {
        expect(wrapper.length).toEqual(1);
    })

    it('has a field for email', () => {
        expect(wrapper.find('[name="email"]').length).toEqual(1);
    });

    it('has a field for password', () => {
        expect(wrapper.find('[name="password"]').length).toEqual(1);
    })

});