import React from 'react';
import Hero from '../components/hero/Hero';
import About from '../components/about/About';

export default function Home() {
  return (
    <div className="space-y-4">
      {/* 1. Primary Full Screen Hero Section */}
      <Hero />

      {/* 2. Modular Premium About Section */}
      <About />
    </div>
  );
}
