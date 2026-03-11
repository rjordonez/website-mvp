import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Demo from './pages/DemoPage/Demo';
import SeniorLivingPage from './pages/SeniorLivingPage';
import HomeCarePage from './pages/HomeCarePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/demo" element={<Demo />} />
        <Route path="/for/senior-living" element={
          <>
            <Navbar />
            <SeniorLivingPage />
          </>
        } />
        <Route path="/for/home-care" element={
          <>
            <Navbar />
            <HomeCarePage />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
