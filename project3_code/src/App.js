import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Game from './features/game/Game';
import './App.css'; // Import CSS for styling

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="title">Bust the Ghost</h1>
        <Game />
      </div>
    </Provider>
  );
}

export default App;
