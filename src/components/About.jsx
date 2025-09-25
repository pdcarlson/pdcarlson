// src/components/about.jsx
import React from 'react';

// accept content as a prop
const About = ({ content }) => {
  return (
    <section id="about" className="about-section">
      <div className="container reveal">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <img src="/assets/professional-headshot-s25.jpeg" alt="Paul Carlson" className="about-image" />
          <div>
            {/* use content from props */}
            <p>{content?.aboutParagraph1}</p>
            <p>{content?.aboutParagraph2}</p>
            <ul className="skills-list">
              {/* map over the skills array from props */}
              {content?.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;