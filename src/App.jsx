import { useState } from 'react';
import './App.css'; // Your portfolio styles
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  const [activePage, setActivePage] = useState('about');

  const renderPage = () => {
    switch (activePage) {
      case 'projects':
        return <Projects />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      case 'about':
      default:
        return <About />;
    }
  };

  return (
    <div className="ide-container">
      <ActivityBar activePage={activePage} setActivePage={setActivePage} />
      <Sidebar setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;