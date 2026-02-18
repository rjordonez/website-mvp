import React from 'react';
import Hero from './LandingPage/Hero';
import Backed from './LandingPage/Backed';
import Solution from './LandingPage/Solution';
import Problem from './LandingPage/Problem';
import Features from './LandingPage/Features';
import FAQ from './LandingPage/FAQ';
import CTA from './LandingPage/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Backed />
      <Problem />
      <Solution />
      <Features />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
