import React from 'react';
import './VisualizationComponent.css';

const VisualizationComponent = ({ steps, currentStepIndex, speed }) => {
    if (!steps || steps.length === 0 || currentStepIndex < 0 || currentStepIndex >= steps.length) {
        return (
            <div className="visualization-placeholder">
                <p>Preparing visualization...</p>
            </div>
        );
    }

    const currentStep = steps[currentStepIndex];
    const { array, compared, swapped, sorted } = currentStep;

    // the transition duration based on speed for bar animations
    const getTransitionDuration = () => {
        switch (speed) {
            case 'slow': return '0.25s';
            case 'normal': return '0.15s';
            case 'fast': return '0.05s';
            default: return '0.4s';
        }
    };
    const transitionDuration = getTransitionDuration();

    return (
        <div className="visualization-bars-container">
            {array.map((value, index) => {
                const isCompared = compared.includes(index);
                const isSwapped = swapped.includes(index);
                const isSorted = sorted.includes(value) && array.lastIndexOf(value) === sorted.lastIndexOf(value) && sorted.indexOf(value) <= index;

                return (
                    <div
                        key={index}
                        className={`bar ${isCompared ? 'bar-compared' : ''} ${isSwapped ? 'bar-swapped' : ''} ${isSorted ? 'bar-sorted' : ''}`}
                        style={{
                            height: `${value * 3}px`,
                            transition: `height ${transitionDuration} ease-in-out, background-color ${transitionDuration} ease-in-out`
                        }}
                    >
                        { }
                        {array.length < 30 && <span className="bar-value">{value}</span>}
                    </div>
                );
            })}
        </div>
    );
};

export default VisualizationComponent;