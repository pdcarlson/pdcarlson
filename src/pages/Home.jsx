import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
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
    
    return () => revealElements.forEach(el => revealObserver.unobserve(el));
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
    </>
  );
};

export default Home;