import React from 'react';
import MainPage from '../MainPage/MainPage.js';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="mainPage">
        <MainPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
