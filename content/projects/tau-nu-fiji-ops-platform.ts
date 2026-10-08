import type { Project } from "../types";

export const tauNuFijiOpsPlatform: Project = {
  slug: "tau-nu-fiji-ops-platform",
  title: "Tau Nu Fiji Ops Platform",
  status: "Running",
  year: "2025-2026",
  role: "Solo build",
  builtWith: ["Next.js", "Appwrite", "Discord API", "AWS"],
  blurb:
    "Housing tasks and accountability for my chapter. Back up since August, with a weekly restart by hand.",
  hook:
    "This one was down for four months, and I had the cause wrong the whole time.",
  intro: [
    "This is the app my chapter runs on. It assigns weekly housing tasks automatically, escalates a chore from a private Discord reminder to a public callout if it goes undone, and takes a photo as proof once it's finished. The whole chapter uses it. It was also down from April to August, and I still have to go in every week and restart the database.",
  ],
  images: [
    {
      src: "/assets/tau-nu-ops-dashboard.png",
      width: 1902,
      height: 1040,
      alt: "The Tau Nu Fiji ops platform dashboard, showing an assigned housing duty with photo-proof upload, the chapter points leaderboard, and recent activity. Brother surnames are blurred.",
    },
  ],
  sections: [
    {
      id: "why",
      marginSubhead: "The plan that got too big",
      paragraphs: [
        "The plan started bigger than housing tasks. I set out to rebuild taunufiji.com, our chapter's 20-year-old public site, into something grads could use to donate and RSVP and exec could update without touching code, with the housing system as the centerpiece underneath it all. I hit a real wall migrating 20 years of legacy PayPal billing, one-time donations, recurring monthly payments, event sign-ups, with no clean way to identify who was already subscribed to what. Around the same time I found out a grad was already independently keeping the old static site alive. I let him keep doing that and descoped to what I could actually finish alone, which was a brothers-only app for the ops side.",
      ],
    },
    {
      id: "what-happened",
      marginSubhead: "How it went down",
      paragraphs: [
        "Getting it live meant gluing together three different providers. Appwrite for the database, AWS S3 for file storage after Appwrite's free storage cap turned out too small, then Vercel for hosting after Appwrite's free compute couldn't reliably cold-start the app. Each patch made sense on its own and made the whole thing harder to keep straight.",
        "The clearest sign of that was Appwrite's free-tier database, which quietly suspends itself after seven days idle. The first time it happened, nobody noticed for about 48 hours. When I finally restarted it, every overdue task escalation that had queued up fired at once, a flood of Discord pings landing on the whole chapter simultaneously. It happened more than once. Brothers thought it was funny. I thought it was a sign I had no way of finding out when something broke short of someone telling me.",
        "It went down for a dumber reason than any bug. With about two weeks left in the spring semester the certificate on the login expired and wouldn't renew. I was still actively working on the app right up to that point, and finals ate the time I would have spent fixing it. I blamed DNS and left it there for the summer.",
      ],
    },
    {
      id: "revival",
      marginSubhead: "How it came back",
      paragraphs: [
        "In August I sat down to fix it properly and found out DNS had been fine the whole time. When I moved the domain over to Vercel, it added a record listing which certificate authorities were allowed to issue certificates for it, and the one Appwrite uses wasn't on the list. So the certificate could never renew, no matter how many times I restarted things. One added record fixed it, and the new certificate issued in under two minutes.",
        "Before turning anything back on I had to turn the scheduler off. It fines every overdue task it finds, and after four months there were 19 of them waiting, each with a brother's name on it. I wrote a reset script that does a dry run first and takes a backup before it changes anything, and cleared those before the scheduler came back.",
        "It's been running since, and the chapter uses it every week. It isn't fixed. It's still on Appwrite's free plan, which keeps pausing the database, so every week I go in and restart it by hand. I've been putting off the real fix until [Frapp](/projects/frapp) is ready to take over.",
      ],
    },
  ],
  metaDescription:
    "The app my chapter uses every week for housing tasks. It was down for four months over a certificate that couldn't renew, and came back in August.",
  ogDescription:
    "This one was down for four months, and I had the cause wrong the whole time.",
};
