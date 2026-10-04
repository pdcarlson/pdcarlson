export const home = {
  hero: {
    heading: "Hi, I'm Paul",
    support:
      "I'm a junior at RPI studying computer science, and the president of a 23-person chapter of Phi Gamma Delta. The chapter's housing chores get assigned by an app I wrote, which means when it breaks I'm the one who hears about it. I also spent a summer rebuilding a map that nine towns in Massachusetts still use.",
    linkLabel: "See the work",
    status: "Right now I'm building Frapp.",
    photoAlt: "Paul Carlson, smiling, sitting outside with green hills and the ocean behind him.",
  },

  about: {
    marginLabel: "The throughline.",
    paragraphs: [
      "Every project above comes from the same place. I'm chapter president of a 23-person fraternity, which mostly means I'm supposed to already have the answer to whatever's going wrong, and, apparently, I'm also the one who builds the software when there isn't one.",
      "Each project exists because the one before it stopped being enough. The budget tracker was too small once I started thinking about the whole chapter instead of just my own job as steward. The ops platform outgrew what three different hosting providers glued together could survive. Frapp exists because I was tired of rebuilding the same idea with slightly better tools every time, and wanted a version built so that specific failure can't happen again.",
      "I'm a junior at RPI, studying computer science and information technology, from Chatham, Massachusetts. Most of what I actually know about shipping software, I learned by being the person on the hook when something my chapter depended on broke.",
    ],
  },

  contact: {
    head: "Email me",
    body: "Reach out about a project, a job, or something above that's broken. I read this myself and I'll actually reply.",
    email: "pdcarlson06@gmail.com",
    links: [
      { label: "GitHub", href: "https://github.com/pdcarlson" },
      { label: "LinkedIn", href: "https://linkedin.com/in/paul-carlson-rpi" },
      { label: "Resume", href: "/resume" },
    ],
    form: {
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submitLabel: "Send it",
      submittingLabel: "Sending...",
      successMessage: "Sent. I'll get back to you soon, usually within a day or two.",
      errorMessage: "That didn't go through. Try again, or just email me directly: ",
      helper: "Goes straight to my inbox. Nothing to unsubscribe from.",
      validation: {
        name: "Add your name.",
        email: "Add a real email address.",
        message: "Say something first.",
      },
    },
  },

  metaDescription:
    "Paul Carlson builds software for real organizations. A nine-town GIS map, a fraternity ops platform, and the chat app meant to replace it.",
  ogDescription:
    "Software for real people, not class projects. A nine-town GIS map, a fraternity ops platform, and the chat app meant to replace it.",
};
