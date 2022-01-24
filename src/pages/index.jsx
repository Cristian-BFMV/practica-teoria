import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StateMachine from '../components/StateMachine';
import StatesForm from '../components/StatesForm/StatesForm';
import SymbolsForm from '../components/SymbolsForm/SymbolsForm';

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SymbolsForm />} />
        <Route path="/states" element={<StatesForm />} />
        <Route path="/state-machine" element={<StateMachine />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
