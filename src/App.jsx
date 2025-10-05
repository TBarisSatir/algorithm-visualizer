import React, { useState, useEffect } from 'react';
import './index.css';
import placeholderGraph from './placeholder.png';

const LandingPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [visualizationSpeed, setVisualizationSpeed] = useState('normal');
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);


  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {

      setIsDarkMode(true);
    }
  }, []);

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setVisualizationSpeed(event.target.value);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleVisualizeClick = () => {
    console.log(`Visualizing ${selectedAlgorithm} at ${visualizationSpeed} speed.`);
    alert(`Starting visualization for ${selectedAlgorithm} at ${visualizationSpeed} speed!`);

  };

  return (
    <div className="app-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">Algorithm Visualizer</div>
        <div className="dark-mode-toggle">
          <span>Dark Mode</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={isDarkMode} onChange={handleToggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2 className="section-title">Algorithm Selection</h2>
            <div className="button-group"> { }
              <button
                className={`selection-button ${selectedAlgorithm === 'bubbleSort' ? 'selected' : ''}`}
                onClick={() => setSelectedAlgorithm('bubbleSort')}
              >
                Bubble Sort
              </button>
              <button
                className={`selection-button ${selectedAlgorithm === 'mergeSort' ? 'selected' : ''}`}
                onClick={() => setSelectedAlgorithm('mergeSort')}
              >
                Merge Sort
              </button>
              <button
                className={`selection-button ${selectedAlgorithm === 'quickSort' ? 'selected' : ''}`}
                onClick={() => setSelectedAlgorithm('quickSort')}
              >
                Quick Sort
              </button>
            </div>
            <h2 className="section-title" style={{ marginTop: '25px' }}>Speed Setting</h2>
            <div className="button-group"> { }
              <button
                className={`selection-button ${visualizationSpeed === 'slow' ? 'selected' : ''}`}
                onClick={() => setVisualizationSpeed('slow')}
              >
                Slow
              </button>
              <button
                className={`selection-button ${visualizationSpeed === 'normal' ? 'selected' : ''}`}
                onClick={() => setVisualizationSpeed('normal')}
              >
                Normal
              </button>
              <button
                className={`selection-button ${visualizationSpeed === 'fast' ? 'selected' : ''}`}
                onClick={() => setVisualizationSpeed('fast')}
              >
                Fast
              </button>
            </div>
            <button className="visualize-button" onClick={handleVisualizeClick}>
              Visualize
            </button>
          </div>

          <div className="sidebar-section socials-section">
            <h2 className="section-title">My Socials</h2>
            <p>Connect with me:</p>
            <div className="social-links">
              <a href="https://github.com/TBarisSatir" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/turgut-baris-satir-4137661b4/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              { }
            </div>
          </div>
        </aside>

        { }
        <main className="visualization-main-area">
          <div className="visualization-placeholder">
            <img src={placeholderGraph} alt="Algorithm visualization placeholder" className="placeholder-image" />
            <p>Algorithm visualization will appear here when you select an algorithm and click "Visualize".</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;