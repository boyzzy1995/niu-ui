import React, { createContext, useState } from 'react';
import classNames from 'classnames'
import { MenuItemProps } from './menuItem';

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (index: number) => void;

export interface MenuProps {
  mode?: MenuMode;
  onSelect?: SelectCallback;
  style?: React.CSSProperties;
  className?: string;
  defaultIndex?: number;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const ChildFC = child as React.FunctionComponentElement<MenuItemProps>
      const { type: { displayName } } = ChildFC;
      if (displayName === 'MenuItem') {
        return React.cloneElement(ChildFC, { index });
      } else {
        console.error('you must press an menuItem element')
      }
    })
  }
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })
  return (
    <ul className={classes} style={style} data-testid="menu-id">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
}

export default Menu;