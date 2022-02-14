import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { StateMachineContext } from '../../context';
import StateMachineTest from './StateMachine';
import Spinner from '../Spinner/Spinner';
import './StateMachine.css';

const createStateMachine = (states, symbols) => {
  const stateMachine = {
    initial: 'q0',
    states: {},
  };

  return new Promise(resolve => {
    states.forEach(state => {
      const onTransition = {};
      symbols.forEach(symbol => {
        Object.assign(onTransition, {
          [symbol]: state[`transitionOn${symbol}`],
        });
      });
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

    if (states && symbols) proccessStateMachine();
  }, []);

  if (!states || !symbols) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <Spinner />
        </div>
      ) : (
        <StateMachineTest states={stateMachine} />
      )}
    </>
  );
};

export default ProcessStateMachine;
