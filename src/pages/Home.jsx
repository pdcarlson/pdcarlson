// src/pages/home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import ScrollToTop from '../components/ScrollToTop'; // import the new component

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false); // state for the button

  useEffect(() => {
    // observer for the general reveal animation
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal:not(.project-card)');
    revealElements.forEach(el => revealObserver.observe(el));
    
    // event listener to show/hide the scroll-to-top button
    const handleScroll = () => {
      // show the button if the user has scrolled more than 400px
      if (window.scrollY > 400) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // cleanup function to remove observers and listeners
    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects onProjectClick={handleProjectClick} />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      {/* render the scroll-to-top button */}
      <ScrollToTop isVisible={isScrollButtonVisible} />
    </>
  );
};

export default Home;