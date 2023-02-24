import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { MainPage } from './components/MainPage';
import { RulesPage } from './components/Rules';
import { Navigation } from './components/Navigation';
import { FooterComponent } from './components/Footer';

import './components/globalstyle.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rules' element={<RulesPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
