import React from 'react';

function Contact() {
  return (
    <section className="page active" id="contact">
      <h2>contact.css</h2>
      <div className="contact-content">
        <h3>// Get In Touch</h3>
        <p>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team. Feel free to reach out to me via email or connect with me on LinkedIn.
        </p>
        <div className="contact-links">
          <p>
            <i className="fa-solid fa-envelope"></i> 
            <strong>Email:</strong> 
            <a href="mailto:pdcarlson06@gmail.com"> pdcarlson06@gmail.com</a>
          </p>
          <p>
            <i className="fa-brands fa-linkedin"></i> 
            <strong>LinkedIn:</strong> 
            <a href="https://linkedin.com/in/paul-carlson-rpi" target="_blank" rel="noopener noreferrer"> linkedin.com/in/paul-carlson-rpi</a>
          </p>
           <p>
            <i className="fa-brands fa-github"></i> 
            <strong>GitHub:</strong> 
            <a href="https://github.com/pdcarlson" target="_blank" rel="noopener noreferrer"> github.com/pdcarlson</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;