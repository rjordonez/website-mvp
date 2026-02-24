import React from 'react';
import Hero from './LandingPage/Hero';
import Solution from './LandingPage/Solution';
import Problem from './LandingPage/Problem';
import FlipCards from './LandingPage/FlipCards';
import FAQ from './LandingPage/FAQ';
import CTA from './LandingPage/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Solution />
      <Problem />
      <FlipCards />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
