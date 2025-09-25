# Portfolio Project Documentation

## Overview

This repository contains the source code for Paul Carlson's personal portfolio website. It's a modern, single-page application built with React and Vite, designed to showcase projects, skills, and professional experience. The site is connected to an Appwrite backend for dynamic project management and a private admin panel.

---

## Tech Stack

- **Frontend**: React (v19), Vite, JavaScript
- **Styling**: Plain CSS with custom properties for theming
- **Backend-as-a-Service**: Appwrite
  - **Database**: Used for storing project information and dynamic site content.
  - **Authentication**: Manages login for the admin panel.
- **Routing**: React Router (`react-router-dom`)
- **Analytics**: Google Analytics, implemented with `react-ga4` for pageview and event tracking.
- **Drag & Drop**: `dnd-kit` for interactive reordering in the admin panel.

---

## Project Structure

The project is organized into the following main directories:

- **`public/`**: Contains static assets like images (`/assets`), the favicon, and the resume PDF.
- **`src/`**: Contains all the React application source code.
  - **`components/`**: Reusable UI components used across different pages.
    - **`admin/`**: Contains components used exclusively for the admin page's visual editor, such as the `EditWrapper` and `ProjectEditor`.
  - **`context/`**: Contains React Context providers for managing global state, such as `AuthContext.jsx` for user authentication.
  - **`lib/`**: Holds modules that interface with external services like Appwrite and Google Analytics.
  - **`pages/`**: Contains top-level components that correspond to different pages or routes (e.g., `Home.jsx`, `AdminPage.jsx`).
- **`index.html`**: The main HTML entry point for the Vite application.
- **`App.css`**: A global stylesheet that contains all the CSS for the project, including variables for theming.

---

## Core Features

- **Dynamic Content Management**: All content on the site is fetched dynamically from an Appwrite database.
  - **Site Text**: All text content for the Hero, About, and Contact sections is managed from a single document in a `site_content` collection, allowing for easy updates without code changes.
  - **Projects**: Project details are fetched from a dedicated `projects` collection in Appwrite.
- **Visual Admin Panel**: A protected route (`/admin`) provides a "what you see is what you get" (WYSIWYG) editing experience. It renders a live preview of the homepage with interactive elements.
  - **Inline Editing**: All text fields can be edited directly on the page by clicking an edit icon, which opens a modal for quick updates.
- **Drag-and-Drop Project Reordering**: The admin panel features an interactive projects section where projects can be reordered via drag-and-drop, powered by `dnd-kit`. Changes are saved to the database to reflect on the live site.
- **Responsive Design**: The site is fully responsive, with a mobile-first approach for key components and layout adjustments handled in `App.css`.
- **Google Analytics**: User interaction is tracked using Google Analytics. This includes standard pageview tracking on route changes and custom event tracking for key actions like resume downloads, project link clicks, and contact attempts.

---

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository**:
    ```sh
    git clone [https://github.com/pdcarlson/pdcarlson.git](https://github.com/pdcarlson/pdcarlson.git)
    cd pdcarlson
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Create an environment file**:
    Create a `.env` file in the root of the project by copying `.env.example` or creating it from scratch. It must contain your Appwrite credentials and your Google Analytics Measurement ID.

4.  **Run the development server**:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Future Roadmap

This section outlines potential improvements and new features that could be added to the project.

### User Experience & UI
- **Implement a Mobile (Hamburger) Menu**: Replace the `display: none` on the mobile navigation with a functional hamburger menu for better accessibility.
- **Enhance Form Feedback**: Display login/form errors inline within the form itself instead of using browser `alert()`.

### Feature Enhancements
- **Advanced Admin Dashboard**: Expand the admin panel to include new tabs for features like a "Document Hub" for storing professional text (for LinkedIn, resumes, etc.) and a dashboard for viewing Google Analytics data.
- **Direct Image Uploads**: Integrate Appwrite Storage to allow direct file uploads for project images, instead of requiring a URL.
- **Implement a Contact Form**: Replace the `mailto:` link with a functional contact form that uses an Appwrite Function to handle submissions.
- **Project Filtering by Technology**: Add functionality to filter the visible projects by clicking on their technology tags.
- **Admin Project Management**: Add the ability to create, edit, and delete projects directly from the visual admin editor, likely via a modal system.

### Code & Architecture
- **Scoped CSS**: Adopt a scoped styling solution like CSS Modules to make styles more modular and prevent potential conflicts.