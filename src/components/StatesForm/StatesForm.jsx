import { useState, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { StateMachineContext } from '../../context';

const StatesForm = () => {
  const [stateIndex, setStateIndex] = useState(1);
  const { updateStates, stateTransitions, symbols } = useContext(StateMachineContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      states: [{ state: 'q0', finalState: false, ...stateTransitions }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'states',
  });

  const onSubmit = ({ states }) => {
    updateStates(states);
    navigate('/state-machine');
  };

  const appendState = () => {
    setStateIndex(prevStateIndex => prevStateIndex + 1);
    append({
      state: `q${stateIndex}`,
      ...stateTransitions,
    });
  };

  const removeState = () => {
    remove(stateIndex);
    setStateIndex(prevStateIndex => prevStateIndex - 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index}>
            <label key={index} htmlFor="states">
              Estado {`q${index}`}
            </label>
            {symbols.map(symbol => {
              return (
                <input
                  id="states"
                  {...register(`states.${index}.transitionOn${symbol}`, {
                    required: true,
                  })}
                  key={`${field.id}${symbol}`}
                  placeholder={`Transición con ${symbol}`}
                />
              );
            })}
            <input type="checkbox" {...register(`states.${index}.finalState`)} />
            <span>Estado de aceptación?</span>
          </div>
        ))}
        {/* {errors.exampleRequired && <span>This field is required</span>}         */}

        <button type="submit">Ingresar automata</button>
      </form>
      <button onClick={appendState}>Añadir estado</button>
      <button onClick={removeState}>Remover estado</button>
    </>
  );
};

export default StatesForm;
