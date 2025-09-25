// src/lib/googleanalytics.js
import ReactGA from 'react-ga4';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn("google analytics measurement id is missing.");
  }
};

// add this new function
export const trackGAEvent = (category, action, label) => {
  if (measurementId) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};