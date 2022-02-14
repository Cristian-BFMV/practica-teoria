import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { StateMachineContext } from '../../context';
import './SymbolsForm.css';

const SymbolsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateSymbols } = useContext(StateMachineContext);
  const navigate = useNavigate();
  const [stateMachineError, setStateMachineError] = useState(false);

  const onSubmit = data => {
    setStateMachineError(false);
    data['number_of_symbols'] = parseInt(data.number_of_symbols, 10);
    updateSymbols(data);
    if ((data.symbols.match(/,/g) || []).length === data.number_of_symbols - 1) {
      navigate('/states');
    } else {
      setStateMachineError(true);
    }
  };

  return (
    <div className="symbols-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Formulario de simbolos de entrada</h2>
        <label htmlFor="symbols-number">Número de simbolos del automata</label>
        <select {...register('number_of_symbols')} className="input" id="symbols-number">
          <option value="2">Dos</option>
          <option value="3">Tres</option>
          <option value="4">Cuatro</option>
          <option value="5">Cinco</option>
        </select>
        <p>Por favor ingrese los simbolos separados por comas</p>
        <label htmlFor="symbols-state">Simbolos de entrada</label>
        <input
          id="states"
          {...register('symbols', {
            required: {
              value: true,
              message: 'Este campo es requerido',
            },
            pattern: {
              value: /^(?:([A-Z])(?!.*?\1),)*[A-Z]$/,
              message: 'Siga el formato indicado >:(',
            },
          })}
          className="input"
          placeholder="Ej: A,B,C,D"
        />
        {errors.symbols && <span className="form-error">{errors.symbols.message}</span>}
        {stateMachineError && (
          <span className="form-error">
            El número de simbolos no coincide con los ingresados
          </span>
        )}
        <button type="submit" className="button">
          Ingresar simbolos
        </button>
      </form>
    </div>
  );
};

export default SymbolsForm;
