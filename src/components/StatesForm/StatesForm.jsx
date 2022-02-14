import { useState, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import { StateMachineContext } from '../../context';
import Add from '../../assets/add.svg';
import Delete from '../../assets/delete.svg';
import './StatesForm.css';

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

  if (!stateTransitions || !symbols) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="states-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2 className="form-title">Ingrese el Automata finito</h2>
        {fields.map((field, index) => (
          <div key={index} className="states-form-field">
            <div className="state-form-field-transition">
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
                    className="input"
                  />
                );
              })}
            </div>
            <div className="state-form-field-final">
              <input type="checkbox" {...register(`states.${index}.finalState`)} />
              <span>¿El estado {`q${index}`} es de aceptación?</span>
            </div>
          </div>
        ))}

        <div className="states-form-actions">
          <span onClick={appendState}>
            <img src={Add} alt="Add" />
          </span>
          <span onClick={removeState}>
            <img src={Delete} alt="Add" />
          </span>
        </div>
        <button type="submit" className="button">
          Ingresar automata
        </button>
      </form>
    </div>
  );
};

export default StatesForm;
