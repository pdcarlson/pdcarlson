// src/pages/home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import ScrollToTop from '../components/ScrollToTop';
import { getSiteContent } from '../lib/appwrite';
import Spinner from '../components/Spinner';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [siteContent, setSiteContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const content = await getSiteContent();
        setSiteContent(content);
      } catch (err) {
        console.error("failed to load site content:", err);
        setError("could not load page content. please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadSiteContent();
  }, []);
  
  // this is the corrected useEffect block
  useEffect(() => {
    // only set up observers if content is loaded
    if (!isLoading && siteContent) {
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

      // cleanup function
      return () => {
        revealElements.forEach(el => revealObserver.unobserve(el));
      };
    }
  }, [isLoading, siteContent]); // dependency array now watches for loading and content changes

  // this effect now only handles the scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner />
      </div>
    );
  }

  if (error || !siteContent) {
    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '2rem', textAlign: 'center' }}>
        <p>{error || "content could not be loaded."}</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero content={siteContent} />
        <About content={siteContent} />
        <Projects onProjectClick={handleProjectClick} />
        <Contact content={siteContent} />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      <ScrollToTop isVisible={isScrollButtonVisible} />
    </>
  );
};

export default Home;