// src/components/contact.jsx
import React from 'react';
import { trackGAEvent } from '../lib/googleAnalytics';

// accept content as a prop
const Contact = ({ content }) => {
  const handleContactClick = () => {
    trackGAEvent('engagement', 'click_contact', 'Say Hello');
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="container reveal">
        <h2 className="section-title">Get In Touch</h2>
        {/* use content from props */}
        <p className="contact-text">{content?.contactText}</p>
        <a href="mailto:pdcarlson06@gmail.com" className="btn btn-primary" onClick={handleContactClick}>Say Hello</a>
      </div>
    </section>
  );
};

export default Contact;