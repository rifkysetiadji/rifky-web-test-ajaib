import './App.css';
import User from './features/user/User';
import { store } from './app/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <div>
      <Provider store={store}>
      <User/>
      </Provider>
    </div>
  );
}

export default App;
