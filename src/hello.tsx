import React, { useContext, useReducer } from 'react';
import { ThemeContext } from './App';

interface IState {
  count: number
}

interface IAction {
  type: number
}

const initState: IState = { count: 1 };
const reducer: ((state: IState, action: IAction) => IState) = (state: IState, action: IAction) => {
  return { count: state.count + 1 }
};

export const Hello: React.FC = () => {
  const style = useContext(ThemeContext)
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <>
      <h2 style={style}>{state.count}</h2>
      <button onClick={() => { dispatch({ type: 100 }) }}>Add Count</button>
    </>
  )
}

export default Hello;
