// src/components/hero.jsx
import React from 'react';
import { trackGAEvent } from '../lib/googleAnalytics'; // import the tracker

const Hero = () => {
  // handler for the resume click
  const handleResumeClick = () => {
    trackGAEvent('engagement', 'click_resume', 'Hero');
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <h1 className="hero-title reveal">Hi, I'm Paul Carlson.<br />I build things for the web.</h1>
        {/* capitalized subheadline */}
        <h3 className="hero-subheadline reveal">
          Web Development & Geospatial Technology Intern
        </h3>
        <p className="hero-subtitle reveal">I'm an aspiring software developer specializing in creating beautiful, functional, and user-centered digital experiences.</p>
        
        <div className="hero-buttons reveal">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          {/* add the onclick handler here */}
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={handleResumeClick}>View Resume</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;