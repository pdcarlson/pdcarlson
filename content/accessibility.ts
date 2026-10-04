export const accessibility = {
  body: "This site is built to work with a keyboard, a screen reader, and reduced motion turned on, not just a mouse and default settings. That's tested, not assumed. If something here doesn't work the way it should for you, that's a bug. Tell me and I'll fix it: ",
  does: [
    "Every interactive element is reachable and operable by keyboard alone.",
    "Focus is always visible. You can see where you are.",
    "Color is never the only signal, status and state show up in text too.",
    "Motion respects your system's reduced-motion setting.",
    "Text meets WCAG AA contrast against its background.",
  ],
  doesNot: [
    "Targets AA, not the stricter AAA level.",
    "Dark only, no light theme.",
    "The contact form's labels are placeholder text, they disappear once you start typing. A screen reader still knows what the field is for the whole time.",
  ],
  lastChecked: "Last checked: August 28, 2026",
  metaDescription:
    "How this site handles keyboard navigation, visible focus, reduced motion, and WCAG AA contrast. Tested, not assumed. Anything that misses is a bug.",
  ogDescription:
    "Keyboard, screen reader, and reduced-motion support on this site, tested rather than assumed.",
};
