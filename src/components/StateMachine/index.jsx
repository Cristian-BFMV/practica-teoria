import { useContext, useEffect, useState } from 'react';
import { StateMachineContext } from '../../context';
import StateMachineTest from './StateMachine';

const createStateMachine = (states, symbols) => {
  const stateMachine = {
    initial: 'q0',
    states: {},
  };

  return new Promise(resolve => {
    states.forEach(state => {
      const onTransition = {}
      symbols.forEach(symbol => {
        Object.assign(onTransition, {
          [symbol]: state[`transitionOn${symbol}`]
        })
      })
      Object.assign(stateMachine.states, {
        [state.state]: {
          on: onTransition,
        },
      });
    });
    resolve(stateMachine);
  });
};

const ProcessStateMachine = () => {
  const { states, symbols } = useContext(StateMachineContext);
  const [loading, setLoading] = useState(true);
  const [stateMachine, setStateMachine] = useState({});

  useEffect(() => {
    const proccessStateMachine = async () => {
      const machineStates = await createStateMachine(states, symbols);
      setStateMachine(machineStates);
      setLoading(false);
    };

    proccessStateMachine();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>Estamos procesando el automata</h2>
      ) : (
        <StateMachineTest states={stateMachine} />
      )}
    </div>
  );
};

export default ProcessStateMachine;
