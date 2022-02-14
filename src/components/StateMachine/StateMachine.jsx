import { useState, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { Graphviz } from 'graphviz-react';
import { StateMachineContext } from '../../context';

const printKeys = states => {
  let string = 'digraph { rankdir=LR';
  const keys = Object.keys(states.states);
  keys.forEach(key => {
    const keys2 = Object.keys(states.states[`${key}`].on);
    keys2.forEach(key2 => {
      string = string.concat(
        ` ${key} -> ${states.states[`${key}`].on[`${key2}`]}[label=${key2}]`
      );
    });
  });
  string = string.concat('}');
  return string;
};

const getState = (states, currentState) => {
  return states.filter(state => {
    return state.state === currentState;
  })[0];
};

const highlightCharacter = index => {
  const spanElements = document.querySelectorAll('.state-test');

  spanElements[index]?.classList.add('highlight');

  if (index > 0) {
    spanElements[index - 1]?.classList.remove('highlight');
  }
};

const StateMachine = ({ states }) => {
  const [index, setIndex] = useState(0);
  const [stateTest, setStateTest] = useState('');
  const [submited, setSubmited] = useState(false);
  const { states: submittedStates } = useContext(StateMachineContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [state, send] = useMachine(() =>
    createMachine({
      id: 'state-machine',
      ...states,
    })
  );

  const onSubmit = ({ state_machine_string }) => {
    setStateTest(state_machine_string);
    setSubmited(true);
  };

  useLayoutEffect(() => {
    if (!submited) return;

    highlightCharacter(index);
  }, [index, submited]);

  return (
    <div className="state-machine-container">
      <div className="state-machine-input-container">
        {submited ? (
          <>
            <h1>
              Estado de{' '}
              {getState(submittedStates, state.value).finalState
                ? 'aceptación'
                : 'rechazo'}
              : {state.value}
            </h1>
            <p>
              Hilera ingresada:{' '}
              {Array.from(stateTest).map(char => {
                return <span className="state-test">{char}</span>;
              })}
            </p>
            <p>
              Siguiente Caracter a procesar:{' '}
              {stateTest.charAt(index) ? stateTest.charAt(index) : 'λ'}
            </p>
            <button
              onClick={() => {
                send(stateTest.charAt(index));
                setIndex(prevIndex => prevIndex + 1);
              }}
              disabled={index > stateTest.length - 1}
              className="button"
            >
              Siguiente Carácter
            </button>
            <button
              onClick={() => {
                setSubmited(false);
                setStateTest('');
                setIndex(0);
                reset();
              }}
              className="button"
            >
              Ingresar nueva hilera
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="form state-machine-form">
            <h2 className="form-title">Ingrese una hilera de prueba</h2>
            <label htmlFor="symbols-state">Hilera de prueba</label>
            <input
              id="states"
              {...register('state_machine_string', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
              className="input"
            />
            <button type="submit" className="button">
              Ingresar
            </button>
          </form>
        )}
      </div>
      <div className="state-machine-graph">
        <Graphviz dot={printKeys(states)} />
      </div>
    </div>
  );
};

export default StateMachine;
