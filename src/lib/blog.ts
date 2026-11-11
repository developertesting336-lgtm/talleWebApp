// Blog content. These are SAMPLE posts for the design preview, written as generic
// tips with no real venues or figures. Replace them with real posts, then set
// `blogPublished` to true so the blog is added to the sitemap and can be indexed.
// Real posting from the website comes with the Phase 2 web app.

export const blogPublished = false;

export type BlogSection = { heading?: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, shown as "Oct 28, 2026". */
  date: string;
  readMinutes: number;
  author: string;
  sections: BlogSection[];
};

export const blogCategories = ["Date Night", "Brunch", "Lunch", "Party", "Nightlife", "Tips", "Tallee News"] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-plan-the-perfect-date-night",
    title: "How to plan the perfect date night",
    excerpt: "Pick the mood first and the place second. A simple way to choose a spot you will both enjoy.",
    category: "Date Night",
    date: "2026-10-28",
    readMinutes: 4,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: [
          "A good date night starts with a feeling, not a restaurant name. Do you want quiet and close, or lively and fun? Decide that first and the rest gets easier.",
        ],
      },
      {
        heading: "Start with the mood",
        paragraphs: [
          "Think about how you want the evening to feel. A candlelit table suits a long conversation. A busy bar with music suits a first date that needs a little energy.",
          "In Tallee you choose the occasion and the vibe, and the app suggests places that fit.",
        ],
      },
      {
        heading: "Think about the details",
        paragraphs: [
          "Check opening hours, how far you will travel and whether you need a reservation. A great place that is closed when you arrive is not a great plan.",
          "Have a second option nearby in case the first one is full.",
        ],
      },
    ],
  },
  {
    slug: "brunch-without-the-wait",
    title: "Brunch without the wait",
    excerpt: "Weekend brunch can mean long lines. A few small habits make it much easier.",
    category: "Brunch",
    date: "2026-10-21",
    readMinutes: 3,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: ["Brunch is popular, and the best spots fill up fast. You do not have to give up your weekend to a waiting list."],
      },
      {
        heading: "Go early or go late",
        paragraphs: [
          "The busiest window is usually late morning. Arriving as the doors open, or after the main rush, often means a shorter wait.",
        ],
      },
      {
        heading: "Have a backup",
        paragraphs: ["Pick two or three places before you leave home. If the first has a long line, you already know where to go next."],
      },
    ],
  },
  {
    slug: "choosing-a-bar-for-a-group",
    title: "Choosing a bar for a group night out",
    excerpt: "Bigger groups need more than a good drinks list. What to check before you invite everyone.",
    category: "Nightlife",
    date: "2026-10-14",
    readMinutes: 4,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: ["A night out with friends goes better when the place suits the whole group, not just the person who picked it."],
      },
      {
        heading: "Space and noise",
        paragraphs: [
          "Can you talk to each other? Is there room for everyone to sit? A loud, crowded bar is fun for some groups and tiring for others.",
        ],
      },
      {
        heading: "Something for everyone",
        paragraphs: [
          "Look for a menu with food and drinks that cover different tastes, including options for people who do not drink alcohol.",
        ],
      },
    ],
  },
  {
    slug: "five-tips-for-finding-hidden-gems",
    title: "Five tips for finding hidden gems",
    excerpt: "The best places are not always the most famous. Here is how to look past the obvious.",
    category: "Tips",
    date: "2026-10-07",
    readMinutes: 5,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: ["A hidden gem is just a great place you have not heard of yet. These habits help you find them."],
      },
      {
        heading: "Search by vibe, not by name",
        paragraphs: ["When you search for a feeling, you see places you would never have typed in."],
      },
      {
        heading: "Look a few streets over",
        paragraphs: [
          "Busy main streets get the most attention. A short walk away you can often find places with the same quality and a calmer room.",
        ],
      },
      {
        heading: "Read the recent reviews",
        paragraphs: ["Places change. Recent reviews tell you how a spot is doing now, not how it did years ago."],
      },
    ],
  },
  {
    slug: "what-to-know-before-you-go-out",
    title: "What to know before you go out",
    excerpt: "A short checklist that saves you from the most common evening plan problems.",
    category: "Tips",
    date: "2026-09-30",
    readMinutes: 3,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: ["A few quick checks before you leave can save the evening."],
      },
      {
        heading: "The quick checklist",
        paragraphs: [
          "Confirm the opening hours. Check whether the place takes reservations. Look at the menu for anything you cannot eat. Plan how you will get home.",
        ],
      },
    ],
  },
  {
    slug: "welcome-to-the-tallee-blog",
    title: "Welcome to the Tallee blog",
    excerpt: "What to expect here: guides, tips and news from the team behind the app.",
    category: "Tallee News",
    date: "2026-09-23",
    readMinutes: 2,
    author: "The Tallee Team",
    sections: [
      {
        paragraphs: [
          "Tallee helps you find the right bar, restaurant or event for your vibe, mood and occasion. This blog is where we share guides and ideas to go with it.",
          "Soon you will be able to share your own posts here too. Until then, download the app and start exploring.",
        ],
      },
    ],
  },
];

export const postUrl = (slug: string) => `/blog/${slug}`;

export function findPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" });
}
