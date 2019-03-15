import { mount, shallow, configure } from 'enzyme';
import Modal from './Modal';
import Login from '../Login/Login';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<Modal />', () => {
  it('render children component successfully', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should invoke props function when on click event', () => {
    const closeModal = jest.fn(() => true);

    const wrapper = mount(<Modal closeModal={closeModal} children={<Login />}/>);
    const target = wrapper.instance();
    wrapper.find('.modalCover').simulate('click');

    expect(closeModal).toHaveBeenCalled();
    expect(closeModal).toHaveReturned();
    expect(closeModal).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
