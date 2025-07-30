import { ID } from 'appwrite';
import { databases } from './appwrite';

const analyticsDB = import.meta.env.VITE_APPWRITE_ANALYTICS_DB;
const eventsCollection = import.meta.env.VITE_APPWRITE_ANALYTICS_EVENTS_COLLECTION;

// This creates a temporary ID for the user's session to group events together
let sessionId = sessionStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = ID.unique();
  sessionStorage.setItem('sessionId', sessionId);
}

/**
 * Tracks an event and sends it to your Appwrite database.
 * @param {string} type - The type of event (e.g., 'pageview', 'button_click').
 * @param {object} data - An object containing additional data, like the page path.
 */
export const trackEvent = async (type, data = {}) => {
  try {
    const eventData = {
      type,
      ...data, // Spreads any additional data into the object
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: sessionId,
    };

    await databases.createDocument(
      analyticsDB,
      eventsCollection,
      ID.unique(), // Creates a unique ID for this specific event document
      eventData
    );
  } catch (error) {
    console.error('Analytics Error: Failed to track event.', error);
    // We log the error but don't interrupt the user.
  }
};