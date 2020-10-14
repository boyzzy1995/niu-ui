import React, { RefObject, useEffect, useRef } from 'react';
import usePosition from './hooks/usePosition';
import withLoader from './hoc/withWrapper';
import Hello from './hello';
import NButton, { ButtonSize, ButtonType } from './components/button/n-button';
import Menu from './components/menu/menu';
import MenuItem from './components/menu/menuItem';

type IRef = string | ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null | undefined

const themeColor = {
  light: {
    color: '#000',
    background: '#fff'
  },
  dark: {
    color: '#fff',
    background: '#000'
  }
}

export const ThemeContext = React.createContext(themeColor.light);

class OldApp extends React.Component<{ name: string }> {
  input = null as IRef;
  constructor(props: { name: string }) {
    super(props);
    this.state = {}
    this.input = React.createRef();
  }
  componentDidMount() {
    console.log((this.input as any).current)
  }
  render() {
    return (
      <>
        <input ref={this.input} />
        <p>hello world</p>
      </>
    )
  }
}

const WrappedComponent = withLoader(OldApp);

export const App: React.FC = () => {
  const position = usePosition();
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current);
  }, [])
  return (
    <div className="App">
      <ThemeContext.Provider value={themeColor.dark}>
        <Menu mode="vertical">
          <MenuItem index={0}>hello</MenuItem>
          <MenuItem disabled index={1}>world</MenuItem>
          <MenuItem index={2}>!</MenuItem>
        </Menu>
        <NButton>Hello</NButton>
        <NButton btnType={ButtonType.Primary} btnSize={ButtonSize.Large}>Hello</NButton>
        <NButton btnType={ButtonType.Link} href="https://www.baidu.com" disabled>Hello</NButton>
        <NButton btnType={ButtonType.Primary}>Hello</NButton>
        <Hello />
        <WrappedComponent />
        <h2 ref={ref}>x: {position.x} y: {position.y}</h2>
      </ThemeContext.Provider>
    </div>
  );
}
