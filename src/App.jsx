import PageRouter from './pages';
import StateMachineProvider from './context';

function App() {
  return (
    <StateMachineProvider>
      <PageRouter />
    </StateMachineProvider>
  );
}

export default App;
