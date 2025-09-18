# Portfolio Project Documentation

## Overview

This repository contains the source code for Paul Carlson's personal portfolio website. It's a modern, single-page application built with React and Vite, designed to showcase projects, skills, and professional experience. The site is connected to an Appwrite backend for dynamic project management and a private admin panel.

---

## Tech Stack

- **Frontend**: React (v19), Vite, JavaScript
- **Styling**: Plain CSS with custom properties for theming
- **Backend-as-a-Service**: Appwrite
  - **Database**: Used for storing project information.
  - **Authentication**: Manages login for the admin panel.
- **Routing**: React Router (`react-router-dom`)
- **Analytics**: A custom analytics solution using an Appwrite database to track pageviews.

---

## Project Structure

The project is organized into the following main directories:

- **`public/`**: Contains static assets like images (`/assets`), the favicon, and the resume PDF.
- **`src/`**: Contains all the React application source code.
  - **`components/`**: Reusable UI components used across different pages (e.g., `Header.jsx`, `ProjectItem.jsx`, `ProjectModal.jsx`).
  - **`context/`**: Contains React Context providers for managing global state, such as `AuthContext.jsx` for user authentication.
  - **`lib/`**: Holds modules that interface with external services.
    - `appwrite.js`: Configures the Appwrite client and exports functions for database interactions.
    - `analytics.js`: Contains the logic for tracking events.
  - **`pages/`**: Contains top-level components that correspond to different pages or routes (e.g., `Home.jsx`, `AdminPage.jsx`).
- **`index.html`**: The main HTML entry point for the Vite application.
- **`App.css`**: A global stylesheet that contains all the CSS for the project, including variables for theming.

---

## Core Features

- **Dynamic Project Management**: Projects are fetched dynamically from an Appwrite database, so they can be updated without touching the frontend code.
- **Admin Panel**: A protected route (`/admin`) allows for creating, editing, and deleting projects. Authentication is handled by Appwrite.
- **Project Reordering**: Projects can be manually ordered using a numeric `order` field in the database, which is managed via the admin panel.
- **Responsive Design**: The site is fully responsive, with a mobile-first approach for key components and layout adjustments handled in `App.css`.
- **Custom Analytics**: A simple, privacy-focused analytics system tracks pageviews and user sessions, storing the data in a dedicated Appwrite database.

---

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/pdcarlson/pdcarlson.git
    cd pdcarlson
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Create an environment file**:
    Create a `.env` file in the root of the project by copying `.env.example` (if it exists) or creating it from scratch. It must contain the following Appwrite credentials:
    ```
    VITE_APPWRITE_ENDPOINT="YOUR_APPWRITE_ENDPOINT"
    VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
    VITE_APPWRITE_COLLECTION_ID="YOUR_PROJECTS_COLLECTION_ID"
    VITE_APPWRITE_ANALYTICS_DB="YOUR_ANALYTICS_DATABASE_ID"
    VITE_APPWRITE_ANALYTICS_EVENTS_COLLECTION="YOUR_ANALYTICS_COLLECTION_ID"
    ```

4.  **Run the development server**:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## Future Roadmap

This section outlines potential improvements and new features that could be added to the project.

### User Experience & UI
- **Implement a Mobile (Hamburger) Menu**: Replace the `display: none` on the mobile navigation with a functional hamburger menu for better accessibility.
- **Enhance Form Feedback**: Display login/form errors inline within the form itself instead of using browser `alert()`.

### Feature Enhancements
- **Advanced Admin Dashboard**: Expand the current admin panel into a more comprehensive dashboard. This could include features like viewing analytics data (pageviews, visitor stats), managing a contact form inbox, and a more robust project management interface.
- **Direct Image Uploads**: Integrate Appwrite Storage to allow direct file uploads for project images in the admin panel, instead of requiring a URL.
- **Implement a Contact Form**: Replace the `mailto:` link with a functional contact form that uses an Appwrite Function to handle submissions.
- **Project Filtering by Technology**: Add functionality to filter the visible projects by clicking on their technology tags.

### Code & Architecture
- **Scoped CSS**: Adopt a scoped styling solution like CSS Modules to make styles more modular and prevent potential conflicts.