import React from 'react';

function About() {
  return (
    <section className="page active" id="about">
      <h2>about.md</h2>
      <div className="about-content">
        <div className="about-text">
          <h1>Paul Carlson</h1>
          <p className="subtitle">CS & ITWS Student at RPI | Web & Geospatial Technology Intern</p>
          
          <h3>// About Me</h3>
          <p>I'm a passionate and driven student at Rensselaer Polytechnic Institute, pursuing dual degrees in Computer Science and Information 
              Technology & Web Science. My journey in technology is fueled by a desire to solve complex problems and build intuitive, user-friendly 
              applications that make a tangible difference. From architecting professional-grade web mapping tools during my internship to developing 
              mobile apps from the ground up, I thrive on the challenge of turning a concept into a polished, functional product.</p>
          <h3>// Leadership & Interests</h3>
          <p>Beyond the keyboard, I embrace leadership roles and new challenges. As the Public Relations Chair for my fraternity and former Social 
              Media Chair for the RPI Ski Club, I enjoy building community and sharing stories. Achieving the rank of Eagle Scout taught me invaluable 
              lessons in discipline, leadership, and project management, skills I bring to every team and project. When I'm not coding, you can usually 
              find me in the mountains or on the ski slopes.</p>
        </div>
        <div className="about-photo">
          <img src="/assets/professional-headshot-s25.jpeg" alt="A professional headshot of Paul Carlson" />
        </div>
      </div>
    </section>
  );
}

export default About;