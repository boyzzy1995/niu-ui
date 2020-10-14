import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NButton, { ButtonType } from './n-button';

const defaultProps = {
  onClick: jest.fn()
}

test('test button', () => {
  const wrapper = render(<NButton {...defaultProps}>Hello</NButton>);
  const element = wrapper.getByText('Hello');
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('BUTTON');
  expect(element).toHaveClass('btn btn-default');
  fireEvent.click(element);
  expect(defaultProps.onClick).toHaveBeenCalled();
})

describe('test button component', () => {
  it('render link type button', () => {
    const linkTypeProps = {
      btnType: ButtonType.Link,
      href: 'https://www.baidu.com'
    }
    const wrapper = render(<NButton {...linkTypeProps}>Link</NButton>);
    const element = wrapper.getByText('Link');
    expect(element).toBeTruthy();
    expect(element.tagName).toEqual('A')
  })
  it('render disbaled button', () => {
    const disabledProps = {
      btnType: ButtonType.Primary,
      disabled: true,
      onClick: jest.fn()
    }
    const wrapper = render(<NButton {...disabledProps}>Disabled</NButton>);
    const element = wrapper.getByText('Disabled');
    expect(element).toBeTruthy();
    expect(element.tagName).toEqual('BUTTON')
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})