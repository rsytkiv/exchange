import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from './components/MainPage';
import ExchangePage from './components/ExchangePage';
import Navigation from './components/Navigation';

import './components/globalstyle.css';
import { FooterComponent } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/exchange' element={<ExchangePage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
