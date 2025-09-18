import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container reveal">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <img src="/assets/professional-headshot-s25.jpeg" alt="Paul Carlson" className="about-image" />
          <div>
            <p>I'm a passionate and driven student at Rensselaer Polytechnic Institute, pursuing dual degrees in Computer Science and IT & Web Science. My journey in technology is fueled by a desire to solve complex problems and build intuitive, user-friendly applications that make a tangible difference.</p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="skills-list">
              <li>JavaScript</li>
              <li>React</li>
              <li>Appwrite</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>Mapbox</li>
              <li>C++</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;