import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Backed from './components/Backed';
import Solution from './components/Solution';
import Problem from './components/Problem';
import Features from './components/Features';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Backed />
      <Problem />
      <Solution />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
