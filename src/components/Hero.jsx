// src/components/hero.jsx
import React from "react";
import { trackGAEvent } from "../lib/googleAnalytics";

// accept content as a prop
const Hero = ({ content }) => {
  const handleResumeClick = () => {
    trackGAEvent("engagement", "click_resume", "Hero");
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        {/* use optional chaining to prevent errors before content loads */}
        <h1
          className="hero-title reveal"
          dangerouslySetInnerHTML={{ __html: content?.heroTitle }}
        ></h1>
        <h3 className="hero-subheadline reveal">{content?.heroSubheadline}</h3>
        <p className="hero-subtitle reveal">{content?.heroSubtitle}</p>

        <div className="hero-buttons reveal">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a
            href="/assets/Paul-Carlson-Resume-Feb2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
