export const accessibility = {
  intro: "Accessibility annotations and notes for this site.",
  sections: [
    {
      eyebrow: "Interactive hover state feedback",
      body:
        "Every clickable element shifts on hover. Buttons swap to a darker fill, navigation links surface their full-opacity color, and links draw an underline. The shift is the same on touch (active state) for parity with mobile.",
    },
    {
      eyebrow: "Keyboard navigation focus indicator",
      body:
        "Every interactive element has a visible focus indicator — a 2px sage outline with a 2px offset. The site is fully keyboard-navigable; tab order follows reading order, and the project drawer traps focus while open.",
    },
    {
      eyebrow: "Reduced motion",
      body:
        "Drawer transitions respect the prefers-reduced-motion media query. With reduced motion on, the project drawer opens instantly rather than animating in.",
    },
    {
      eyebrow: "Color contrast",
      body:
        "Primary text on the dark background sits at WCAG AAA contrast (>7:1). Muted text sits at AA (>4.5:1).",
    },
    {
      eyebrow: "Alt text",
      body: "Every meaningful image carries an alt attribute describing what it is. Decorative images use empty alt text so screen readers skip them.",
    },
  ],
};
