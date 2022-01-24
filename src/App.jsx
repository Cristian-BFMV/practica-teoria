import PageRouter from './pages';
import StateMachineProvider from './context';
import './App.css';

function App() {
  return (
    <StateMachineProvider>
      <PageRouter />
    </StateMachineProvider>
  );
}

export default App;
