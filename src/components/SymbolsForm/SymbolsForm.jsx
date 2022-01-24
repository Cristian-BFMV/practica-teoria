import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { StateMachineContext } from '../../context'

const SymbolsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateSymbols } = useContext(StateMachineContext)
  const navigate = useNavigate();

  const onSubmit = data => {
    data['number_of_symbols'] = parseInt(data.number_of_symbols, 10);
    updateSymbols(data);
    navigate('/states');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('number_of_symbols')}>
        <option value="2">Dos</option>
        <option value="3">Tres</option>
        <option value="4">Cuatro</option>
      </select>
      <input
        id="states"
        {...register('symbols', {
          required: true,
        })}
      />

      {/* {errors.exampleRequired && <span>This field is required</span>}         */}

      <button type="submit">Ingresar automata</button>
    </form>
  );
};

export default SymbolsForm;
