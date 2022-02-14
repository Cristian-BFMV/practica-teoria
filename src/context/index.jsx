import { createContext, useState } from 'react';

export const StateMachineContext = createContext();

const StateMachineProvider = ({ children }) => {
  const [states, setStates] = useState(undefined);
  const [symbols, setSymbols] = useState(undefined);
  const [stateTransitions, setStateTransitions] = useState(undefined);

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
