import { createContext, useState } from 'react';

export const StateMachineContext = createContext();

const StateMachineProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [stateTransitions, setStateTransitions] = useState({});

  const updateStates = states => {
    setStates(states);
  };

  const updateSymbols = symbols => {
    const stateTransitions = {};

    symbols.symbols.split(',').forEach(symbol => {
      Object.assign(stateTransitions, { [`transitionOn${symbol}`]: '' });
    });
    setSymbols(symbols.symbols.split(','));
    setStateTransitions(stateTransitions);
  };

  return (
    <StateMachineContext.Provider
      value={{ states, symbols, stateTransitions, updateStates, updateSymbols }}
    >
      {children}
    </StateMachineContext.Provider>
  );
};

export default StateMachineProvider;
