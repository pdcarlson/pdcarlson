// src/components/contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container reveal">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-text">I'm currently open to new opportunities and collaborations. My inbox is always open, whether you have a question or just want to say hi, I'll get back to you!</p>
        <a href="mailto:pdcarlson06@gmail.com" className="btn btn-primary">Say Hello</a>
      </div>
    </section>
  );
};

export default Contact;