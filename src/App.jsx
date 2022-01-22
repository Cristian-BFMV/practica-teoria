import StateMachine from './components/StateMachine/StateMachine';
import './App.css';

const states = {
  initial: 'green',
  // State definitions
  states: {
    green: {
      on: {
        0: 'red',
        1: 'yellow',
      },
    },
    yellow: {
      on: {
        0: 'green',
        1: 'yellow',
      },
    },
    red: {
      on: {
        0: 'green',
        1: 'yellow',
      },
    },
  },
};

function App() {
  return <StateMachine states={states} />;
}

export default App;
