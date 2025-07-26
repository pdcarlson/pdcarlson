import React from 'react';

function Resume() {
  return (
    <section className="page active" id="resume">
      <h2>resume.txt</h2>
      <div className="resume-content">
        <h3>// View My Resume</h3>
        <p>
          Click the link below to view or download my full resume. 
          It details my skills, experience, and education.
        </p>
        <a 
          href="/assets/resume.pdf" 
          className="button" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Open Resume
        </a>
      </div>
    </section>
  );
}

export default Resume;