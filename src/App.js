import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { MainPage } from './components/MainPage';
import { RulesPage } from './components/Rules';
import { Navigation } from './components/Navigation';
import { FooterComponent } from './components/Footer';
import { Contact } from './components/ContactUs';
import { FaqPage } from './components/FaqPage';

import './components/globalstyle.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rules' element={<RulesPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/help' element={<Contact />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
