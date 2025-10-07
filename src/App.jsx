import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import placeholderGraph from './placeholder.png';
import { generateRandomArray, bubbleSortWithSteps, mergeSortWithSteps, quickSortWithSteps } from './sortingAlgorithms';
import VisualizationComponent from './components/VisualizationComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const LandingPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [visualizationSpeed, setVisualizationSpeed] = useState('normal');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [arraySize, setArraySize] = useState(50);
  const [arrayData, setArrayData] = useState([]);
  const [visualizationSteps, setVisualizationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const intervalRef = useRef(null);


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

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isVisualizing && visualizationSteps.length > 0 && currentStepIndex < visualizationSteps.length) {
      const speedMap = {
        slow: 800,
        normal: 400,
        fast: 100,
      };
      const delay = speedMap[visualizationSpeed];

      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < visualizationSteps.length) {
            return nextIndex;
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsVisualizing(false);
            return prevIndex;
          }
        });
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisualizing, visualizationSteps, visualizationSpeed, currentStepIndex]);


  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    handleResetVisualization();
  };

  const handleSpeedChange = (speed) => {
    setVisualizationSpeed(speed);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleVisualizeClick = () => {
    handleStopVisualization();

    const newArray = generateRandomArray(arraySize, 5, 100);
    setArrayData(newArray);

    let steps = [];
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        steps = bubbleSortWithSteps(newArray);
        break;
      case 'mergeSort':
        steps = mergeSortWithSteps(newArray);
        break;
      case 'quickSort':
        steps = quickSortWithSteps(newArray);
        break;

      default:
        console.warn("Algorithm not implemented yet!");
        return;
    }
    setVisualizationSteps(steps);
    setCurrentStepIndex(0);

    if (steps.length > 0) {
      setIsVisualizing(true);
    }
  };

  const handleStopVisualization = () => {
    setIsVisualizing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleResetVisualization = () => {
    handleStopVisualization();
    setCurrentStepIndex(0);
    setVisualizationSteps([]);
    setArrayData([]);
  };

  return (
    <div className="app-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">Algorithm Visualizer</div>
        <div className="navbar-right-section">
          <div className="social-links-navbar">
            <a href="https://github.com/TBarisSatir" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/turgut-baris-satir-4137661b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <div className="dark-mode-toggle">
            <span>Dark Mode</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={handleToggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2 className="section-title">Algorithm Selection</h2>
            <div className="button-group">
              <button
                className={`selection-button ${selectedAlgorithm === 'bubbleSort' ? 'selected' : ''}`}
                onClick={() => handleAlgorithmChange('bubbleSort')}
              >
                Bubble Sort
              </button>
              <button
                className={`selection-button ${selectedAlgorithm === 'mergeSort' ? 'selected' : ''}`}
                onClick={() => handleAlgorithmChange('mergeSort')}
              >
                Merge Sort
              </button>
              <button
                className={`selection-button ${selectedAlgorithm === 'quickSort' ? 'selected' : ''}`}
                onClick={() => handleAlgorithmChange('quickSort')}
              >
                Quick Sort
              </button>
            </div>
            <h2 className="section-title" style={{ marginTop: '25px' }}>Speed Setting</h2>
            <div className="button-group">
              <button
                className={`selection-button ${visualizationSpeed === 'slow' ? 'selected' : ''}`}
                onClick={() => handleSpeedChange('slow')}
              >
                Slow
              </button>
              <button
                className={`selection-button ${visualizationSpeed === 'normal' ? 'selected' : ''}`}
                onClick={() => handleSpeedChange('normal')}
              >
                Normal
              </button>
              <button
                className={`selection-button ${visualizationSpeed === 'fast' ? 'selected' : ''}`}
                onClick={() => handleSpeedChange('fast')}
              >
                Fast
              </button>
            </div>
            <h2 className="section-title" style={{ marginTop: '25px' }}>Array Size ({arraySize} elements)</h2>
            <input
              type="range"
              min="5"
              max="150"
              value={arraySize}
              onChange={(e) => {
                setArraySize(Number(e.target.value));
                handleResetVisualization();
              }}
              className="array-size-slider"
            />

            <button className="visualize-button" onClick={handleVisualizeClick} disabled={isVisualizing}>
              {isVisualizing ? 'Visualizing...' : 'Visualize'}
            </button>
            <button className="visualize-button" onClick={handleStopVisualization} disabled={!isVisualizing} style={{ marginTop: '10px', backgroundColor: '#dc3545' }}>
              Stop
            </button>
            <button className="visualize-button" onClick={handleResetVisualization} style={{ marginTop: '10px', backgroundColor: '#6c757d' }}>
              Reset
            </button>
          </div>
        </aside>

        <main className="visualization-main-area">
          {visualizationSteps.length > 0 ? (
            <VisualizationComponent
              steps={visualizationSteps}
              currentStepIndex={currentStepIndex}
              speed={visualizationSpeed}
            />
          ) : (
            <div className="visualization-placeholder">
              <img src={placeholderGraph} alt="Algorithm visualization placeholder" className="placeholder-image" />
              <p>Algorithm visualization will appear here when you select an algorithm, set array size, and click "Visualize".</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LandingPage;