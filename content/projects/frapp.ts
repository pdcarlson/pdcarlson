import type { Project } from "../types";

export const frapp: Project = {
  slug: "frapp",
  title: "Frapp",
  status: "Pre-pilot",
  year: "2026",
  role: "Solo build",
  builtWith: ["NestJS", "Next.js", "Expo", "Supabase"],
  blurb:
    "Chat for fraternity chapters that puts everything in one place, so nobody has to chase down information. It's live, but no chapter is on it yet.",
  hook:
    "I keep finding out why the industry does things a certain way by running into the problem myself first.",
  intro: [
    "Frapp is a chat app for fraternity chapters that puts everything in one place, so nobody has to chase down information. Events, tasks, and points live inside the chat, so a brother can check into a meeting or get handed a chore without leaving the conversation. It's live at frapp.live and the billing is real. No chapter runs on it yet, including mine, and it's taking a lot longer than I expected.",
  ],
  images: [
    {
      src: "/assets/frapp-chat-web.webp",
      width: 2000,
      height: 1250,
      alt: "A channel on the web. The event and the task are cards in the conversation, not links out to another page. The chapter and everything in it is seed data.",
    },
    {
      src: "/assets/frapp-chat-home.webp",
      width: 920,
      height: 2000,
      alt: "Chat home on the phone, with what's coming up next above the channels.",
    },
    {
      src: "/assets/frapp-poll.webp",
      width: 920,
      height: 2000,
      alt: "A poll in a channel. Brothers vote where the conversation already is.",
    },
    {
      src: "/assets/frapp-check-in.webp",
      width: 920,
      height: 2000,
      alt: "The host's attendance screen. The QR code rotates, and there's a short code for members whose camera won't scan.",
    },
    {
      src: "/assets/frapp-tasks.webp",
      width: 2000,
      height: 1250,
      alt: "The tasks board on the web. Whoever a task is assigned to can't confirm their own, another officer has to.",
    },
  ],
  sections: [
    {
      id: "why",
      marginSubhead: "The search function problem",
      paragraphs: [
        "As chapter president, information came at me from everywhere. Study guides from our international headquarters, deadlines, meeting notes from chapter meetings, meetings with our grad advisor group, meetings with the house corporation, and a Discord where file sharing had piled up across channels until nothing was findable. I'd sit down for a meeting and have to dig back through my own notes just to remember what I was supposed to be doing.",
        "I tried NotebookLM, Google's tool for asking questions across a set of uploaded documents. I fed it chapter files and compared them year to year, and it worked. But it meant running confidential chapter information through a third-party AI tool with no real alternative. What I actually wanted was simpler than that. Ask a question and get an answer, with the context already there instead of digging for it myself. That's most of the reason Frapp is built around the chat.",
      ],
    },
    {
      id: "lineage",
      marginSubhead: "Two tries before this one",
      paragraphs: [
        "Frapp isn't the first attempt at solving this. The first was a budget tracker I built for myself when I was chapter steward, mostly a glorified spreadsheet with a login screen. It quietly stopped mattering once I started thinking about the chapter's problems instead of just mine.",
        "The second attempt was a full operations platform for my chapter's brothers, with housing tasks, Discord-based accountability, and photo proof that chores actually got done. It worked. Brothers used it every week. Then a certificate problem between two hosting providers broke the whole thing with two weeks left in the semester, and it stayed down until August. [It's back up now](/projects/tau-nu-fiji-ops-platform), mostly because I go in every week and restart it by hand.",
      ],
    },
    {
      id: "decisions",
      marginSubhead: "Why it's built this way",
      paragraphs: [
        "The old platform was one Next.js app doing everything, with pages, API routes and auth all in the same deploy. That's a big part of why it needed an 11,000-line rewrite partway through its life, and it's why a hosting hiccup on the web side could take the whole thing down at once. Frapp's API is its own service, built in NestJS and running in its own container. The mobile app, the web dashboard, and the API all deploy on their own now, so a bad web release can't take mobile down with it.",
        "Every protected route in that API runs the same three checks (valid login, actually belongs to this chapter, has permission for this action) as three lines on a controller instead of something I have to remember to call by hand. In the old app that check lived inside each individual function, and the one I forgot to write it in would have been a data leak between chapters. I didn't want a security boundary that depended on my memory.",
        "It still had a hole in it. For the first five months the chapter check trusted a header the app sent along with each request, so it was really just checking whatever the client told it. I found that in August. Now the chapter comes out of the login token itself, a header that disagrees with it gets rejected, and there's a test suite that seeds two chapters with matching data so a missing filter shows up as a failure.",
        "Underneath that is Supabase, which is just Postgres, a standard open-source database I can run on my own laptop and actually see inside. Every failure on the old platform came from infrastructure I couldn't reach into. I didn't start there though. The first version of Frapp went up in a day in February on three separate services for the database, logins and file storage, and twelve days later I threw it out and rebuilt it on Supabase.",
        "I also built it for many chapters from day one, before a single chapter had signed up. That's a real cost with no customer yet to justify it. I paid it anyway because the old platform was built so specifically for one chapter that a second chapter would have meant a rewrite, and I didn't want to make that mistake twice.",
        "The billing is real too. Stripe has been in live mode since September, with a free tier for chat, a 14-day trial, and a 3-day grace period for a chapter that falls behind on payment. Chat is free and everything else is $149 a month per chapter, which nobody has paid yet.",
      ],
    },
    {
      id: "checks",
      marginSubhead: "Checks that couldn't fail",
      paragraphs: [
        "Most of the code in Frapp was written by AI agents. My job is deciding what gets built and whether to believe the result, and the second part turned out to be most of the work.",
        "Early on I did what seemed responsible and added rules. One of them required every code change to also update the docs, and it passed every time. When I finally read what it was passing, the agents had been satisfying it with filler, including an unrelated maintenance log written into the same doc that described the rule. I deleted the rule.",
        "That kept happening. The lint step was running with auto-fix turned on, so it repaired the errors it found and reported success. Staging (the copy of the app I test on) sat 38 database changes behind with every check green. The production API went 171 days without a successful deploy and nothing told me. A backup restore test passed while the database it restored was broken. Two copies of React ended up in the mobile app and crashed it on the first screen, and lint, types and tests all passed.",
        "I'd read about all of this. It's why teams watch their deploys and pin their dependencies. I just didn't believe it applied to a project with one person on it until each one happened to me. So the rule I work by now is that a check only counts if I've seen it fail, and a lot of August and September went to going back through every gate I'd added and asking that.",
      ],
    },
    {
      id: "whats-next",
      marginSubhead: "Where it stands",
      paragraphs: [
        "The API, the web dashboard and the landing page are all live. The Discord importer works, because no chapter is switching over and leaving years of history behind. I ran my own chapter's Discord through it, 78 channels, and then spent three days fixing what that turned up.",
        "What's left is the app stores. The builds work. Google makes a new developer run a closed test with 12 testers for 14 days before publishing anything, and I'm waiting on an Android phone to start that. The part I originally wanted, asking the chapter's own records a question, has a screen and a test suite the AI will have to pass, and no AI behind it yet. It all feels like one step away, and it has for a while.",
      ],
    },
  ],
  pullQuote:
    "I'd rather get this right for one chapter before I try to sell it to a second",
  metaDescription:
    "A chat app for fraternity chapters, built solo with AI agents. It's live with no chapter on it yet. Mostly this is about the checks I added that could never fail.",
  ogDescription:
    "I keep finding out why the industry does things a certain way by running into the problem myself first.",
};
