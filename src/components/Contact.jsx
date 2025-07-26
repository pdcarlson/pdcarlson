import React from 'react';

function Contact() {
  return (
    <section className="page active" id="contact">
      <h2>contact.css</h2>
      <div className="contact-content">
        <h3>// Get In Touch</h3>
        <p>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team. Feel free to reach out to me via email.
        </p>
        <a 
          href="mailto:pdcarlson06@gmail.com" 
          className="email-link"
        >
          pdcarlson06@gmail.com
        </a>
      </div>
    </section>
  );
}

export default Contact;