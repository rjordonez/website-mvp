import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Demo from './pages/DemoPage/Demo';
import SeniorLivingPage from './pages/SeniorLivingPage';
import HomeCarePage from './pages/HomeCarePage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
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
