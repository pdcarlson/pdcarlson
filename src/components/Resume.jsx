import React from 'react';

function Resume() {
  return (
    <section className="page active" id="resume">
      <h2>resume.txt</h2>
      <div className="resume-container">
        <a 
          href="/assets/resume.pdf" 
          download="PaulCarlson_Resume.pdf" 
          className="download-button"
        >
          Download Resume
          <i className="fa-solid fa-download"></i>
        </a>
        <div className="resume-embed">
          <iframe 
            src="/assets/resume.pdf" 
            width="100%" 
            height="100%"
            title="Paul Carlson's Resume"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Resume;