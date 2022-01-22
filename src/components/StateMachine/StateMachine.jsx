import { useState, memo } from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { Graphviz } from 'graphviz-react';

const hilera = '01011';

// digraph {
//     rankdir=LR
//     a -> b[label=0]
// a -> c[label=1]
//     b -> c
//     b -> d
//     c -> e
//     d -> e
//     e -> a
// }

const printKeys = states => {
  let string = 'digraph { rankdir=LR';
  const keys = Object.keys(states.states);
  keys.forEach(key => {
    const keys2 = Object.keys(states.states[`${key}`].on);
    keys2.forEach(key2 => {
      string = string.concat(` ${key} -> ${states.states[`${key}`].on[`${key2}`]}[label=${key2}]`);
    });
  });
  string = string.concat('}');
  return string;
};

const StateMachine = ({ states }) => {
  const [index, setIndex] = useState(0);

  const [state, send] = useMachine(() =>
    createMachine({
      // Machine identifier
      id: 'state-machine',
      // Initial state
      ...states,
    })
  );

  return (
    <div className="App">
      <h1>Estado: {state.value}</h1>
      <p>Caracter procesado: {hilera.charAt(index)}</p>
      <button
        onClick={() => {
          send(hilera.charAt(index));
          setIndex(prevIndex => prevIndex + 1);
        }}
        disabled={index > hilera.length - 1}
      >
        Click
      </button>
      <Graphviz dot={printKeys(states)} />
    </div>
  );
};

export default memo(StateMachine);
