import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <h1 className="hero-title reveal">Hi, I'm Paul Carlson.<br />I build things for the web.</h1>
        <p className="hero-subtitle reveal">I'm a software developer specializing in creating beautiful, functional, and user-centered digital experiences.</p>
        <a href="#projects" className="btn btn-primary reveal">View My Work</a>
      </div>
    </section>
  );
};

export default Hero;