import React from 'react';
import Hero from './LandingPage/Hero';
import Solution from './LandingPage/Solution';
import Problem from './LandingPage/Problem';
import Outcome from './LandingPage/Outcome';
import FAQ from './LandingPage/FAQ';
import CTA from './LandingPage/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Solution />
      <Problem />
      <Outcome />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
