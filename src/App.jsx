import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Backed from './components/Backed';
import Overview from './components/Overview';
import Problem from './components/Problem';
import Highlights from './components/Highlights';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Backed />
      <Problem />
      <Overview />
      <Highlights />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
