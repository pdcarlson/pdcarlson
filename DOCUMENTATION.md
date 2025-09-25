# Portfolio Project Documentation

## Overview

This repository contains the source code for Paul Carlson's personal portfolio website. It's a modern, single-page application built with React and Vite, designed to showcase projects, skills, and professional experience. The site is connected to an Appwrite backend for a dynamic, full-featured admin panel.

---

## Tech Stack

- **Frontend**: React (v19), Vite, JavaScript
- **Styling**: Plain CSS with custom properties for theming
- **Backend-as-a-Service**: Appwrite
  - **Database**: Used for storing project information and all dynamic site content.
  - **Authentication**: Manages login for the admin panel.
  - **Functions**: Used as a secure backend to fetch data from the Google Analytics API.
- **Routing**: React Router (`react-router-dom`)
- **Analytics**: Google Analytics, implemented with `react-ga4` for pageview and event tracking.
- **Drag & Drop**: `dnd-kit` for interactive reordering in the admin panel.
- **Notifications**: `react-hot-toast` for user-friendly feedback in the admin panel.

---

## Project Structure

The project is organized into the following main directories:

- **`functions/`**: Contains the server-side Appwrite Function (`get-analytics-data`) used to securely fetch Google Analytics data.
- **`public/`**: Contains static assets like images, the favicon, and the resume PDF.
- **`src/`**: Contains all the React application source code.
  - **`components/`**: Reusable UI components.
    - **`admin/`**: Components used exclusively for the admin panel, including the visual editor, document hub, and analytics dashboard.
  - **`context/`**: Contains the `AuthContext.jsx` for user authentication.
  - **`lib/`**: Holds modules that interface with external services (Appwrite, Google Analytics).
  - **`pages/`**: Contains top-level components for different routes (`Home.jsx`, `AdminPage.jsx`).
- **`index.html`**: The main HTML entry point for the Vite application.
- **`App.css`**: A global stylesheet that contains all the CSS for the project.

---

## Core Features

- **Dynamic Content Management**: All content on the site is fetched dynamically from Appwrite, allowing for updates without code changes.
- **Full-Featured Admin Panel**: A protected route (`/admin`) provides a comprehensive dashboard with three main sections:
  - **Visual Editor**: A "what you see is what you get" (WYSIWYG) editor that renders a live preview of the homepage. All text content can be edited inline, and projects can be reordered via drag-and-drop.
  - **Document Hub**: A CRUD interface for creating, reading, updating, and deleting text-based documents for professional content management (e.g., for LinkedIn, resumes).
  - **Analytics Dashboard**: Displays key metrics and event data from Google Analytics, fetched securely via an Appwrite Function.
- **Project Management**: The admin panel allows for creating new projects, editing existing project details, and deleting projects.
- **Google Analytics**: User interaction is tracked using Google Analytics. This includes standard pageview tracking and custom event tracking for key actions like resume downloads and project link clicks.

---