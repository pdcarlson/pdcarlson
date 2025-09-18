// src/components/hero.jsx
import React from 'react';

const Hero = () => {
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
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Resume</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;