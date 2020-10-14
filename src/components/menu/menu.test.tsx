import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const defaultProps: MenuProps = {
  mode: 'horizontal',
  onSelect: jest.fn(),
  defaultIndex: 0,
  className: 'custom-class'
}

const verticalProps: MenuProps = {
  mode: 'vertical',
  onSelect: jest.fn(),
  defaultIndex: 0,
  className: 'custom-class'
}

const generateWrapper = (props: MenuProps) => {
  return render(
    <Menu {...props}>
      <MenuItem index={0}>Menu1</MenuItem>
      <MenuItem index={1} disabled>Disabled</MenuItem>
      <MenuItem index={2}>Menu3</MenuItem>
    </Menu>
  );
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  thridElement: HTMLElement,
  disabledElement: HTMLElement
describe('test menu componet', () => {
  beforeEach(() => {
    wrapper = generateWrapper(defaultProps);
    // wrapper.container // 直接获取HTMLElement可以用getElementById获取
    menuElement = wrapper.getByTestId('menu-id');
    activeElement = wrapper.getByText('Menu1');
    thridElement = wrapper.getByText('Menu3');
    disabledElement = wrapper.getByText('Disabled')
  })
  it('default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu custom-class');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('is-active');
    expect(disabledElement).toHaveClass('menu-item-disabled');
  })
  it('click element to change active menu', () => {
    fireEvent.click(thridElement);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(2);
    expect(thridElement).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');

    fireEvent.click(disabledElement);
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1);
    expect(disabledElement).not.toHaveClass('is-active');
  })
  it('vertical menu', () => {
    cleanup(); // 每次forEach之前都会调用该方法清除之前的元素
    const wrapper = generateWrapper(verticalProps);
    const menu = wrapper.getByTestId('menu-id');
    expect(menu).toHaveClass('menu-vertical');
  })
})