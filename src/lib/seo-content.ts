// Content for the SEO landing pages. The SEO team can edit this file (or move
// it to a CMS later) without touching the page templates.
//
// Occasion and vibe names match the Tallee app. Copy is a first draft for the
// SEO team to review: it avoids naming specific venues and avoids claims about
// ratings, prices or opening times.

import type { appScreens } from "./site";

export type ScreenKey = keyof typeof appScreens;
export type Faq = { q: string; a: string };
export type Item = { title: string; text: string };

export type SeoPage = {
  /** Short name, used in breadcrumbs and related-page cards. */
  name: string;
  eyebrow: string;
  h1: string;
  /** Becomes "<metaTitle> | Tallee". */
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  highlightsTitle: string;
  highlights: Item[];
  /** Step 1 of "How Tallee finds it", e.g. "Choose Date Night as your occasion". */
  filterLine: string;
  /** Two app screens shown beside the steps. */
  shots: [ScreenKey, ScreenKey];
  tipsTitle: string;
  tips: Item[];
  faqs: Faq[];
};

const FREE_FAQ: Faq = {
  q: "Is Tallee free?",
  a: "Yes. Tallee is free to download and use, with an optional Premium plan for unlimited searches, voice search and talk back, and recommendations that learn you over time.",
};

// ---------------------------------------------------------------------------
// Occasions: /occasion/[slug]
// ---------------------------------------------------------------------------
export const occasions: Record<string, SeoPage> = {
  "date-night": {
    name: "Date Night",
    eyebrow: "Date Night",
    h1: "Find the perfect spot for date night",
    metaTitle: "Date Night Spots Matched to Your Vibe",
    metaDescription:
      "Plan date night in minutes. Tallee matches bars and restaurants to your mood, from romantic and quiet to fancy. Free on iOS and Android.",
    intro: [
      "A good date night starts with the right room. Tell Tallee who you’re with and the mood you’re after, and it recommends bars and restaurants that fit, so you spend less time scrolling and more time together.",
      "Choose Date Night as your occasion, add a vibe, and set how far you’re willing to travel.",
    ],
    highlightsTitle: "Vibes that work for date night",
    highlights: [
      { title: "Romantic", text: "Intimate rooms with a slower pace, made for conversation." },
      { title: "Quiet & Private", text: "Somewhere you can actually hear each other." },
      { title: "Fancy", text: "Dress up and make an evening of it." },
      { title: "Small Plates/Tapas", text: "Share a few dishes and keep the night relaxed." },
    ],
    filterLine: "Choose Date Night as your occasion",
    shots: ["occasion", "results"],
    tipsTitle: "Tips for a smooth date night",
    tips: [
      { title: "Pick the mood first", text: "Decide whether you want lively or low-key. One or two vibes give sharper results than selecting everything." },
      { title: "Check the details", text: "Open a place in Tallee to see its opening hours, website and phone number, so you can book ahead if needed." },
      { title: "Keep the distance realistic", text: "Set your travel distance in the app so the evening doesn’t start with a long drive." },
      { title: "Save a backup", text: "Tap the heart on a second option. It waits in My Favorites if your first choice is full." },
    ],
    faqs: [
      {
        q: "How does Tallee choose date night spots?",
        a: "You pick Date Night as the occasion, say who you’re with, and add a vibe. Tallee’s AI matches those answers to places near your location.",
      },
      { q: "Can I filter by budget?", a: "Yes. The plans screen includes a Select Cost Range filter, so you can narrow results to what suits you." },
      FREE_FAQ,
    ],
  },

  "girls-and-guys-night-out": {
    name: "Girls and Guys Night Out",
    eyebrow: "Girls and Guys Night Out",
    h1: "Plan the perfect girls and guys night out",
    metaTitle: "Girls and Guys Night Out Spots Matched to Your Vibe",
    metaDescription:
      "Settle the plan before the group chat gets long. Tallee finds bars and restaurants for a girls and guys night out based on your mood. Free on iOS and Android.",
    intro: [
      "Getting everyone to agree on a place is the hardest part of a night out with friends. Tallee takes your occasion and the mood you want, then recommends bars and restaurants that fit.",
      "Choose Girls and Guys Night Out, add a vibe or two, and send the winner to the group.",
    ],
    highlightsTitle: "Vibes that work for a girls and guys night out",
    highlights: [
      { title: "Craft Cocktail Bar", text: "Well-made drinks in a room that’s good for catching up." },
      { title: "Social Entertainment/Barcades", text: "Games, music and a crowd for a higher-energy night." },
      { title: "Chill", text: "Relaxed seating and an easy pace for long conversations." },
      { title: "Brunch Party", text: "Start the celebration in the afternoon." },
    ],
    filterLine: "Choose Girls and Guys Night Out as your occasion",
    shots: ["occasion", "vibe"],
    tipsTitle: "Tips for a great girls and guys night out",
    tips: [
      { title: "Choose one or two vibes", text: "Tallee works best when you pick one or two other criteria alongside who you’re with." },
      { title: "Share the plan", text: "Use the share button on a place’s page to send it straight to the group chat." },
      { title: "Look at the gallery", text: "Photos in the gallery help the group agree on the atmosphere before you go." },
      { title: "Check opening hours", text: "A quick look at opening hours avoids arriving before the doors open." },
    ],
    faqs: [
      {
        q: "Can Tallee find places for a group?",
        a: "Tell Tallee who you’re with and the occasion, then add a vibe. It suggests places near you that match.",
      },
      {
        q: "Does Tallee work in my city?",
        a: "Tallee works worldwide. Use your current location or type one in, then choose how far you’re willing to travel.",
      },
      FREE_FAQ,
    ],
  },

  birthday: {
    name: "Birthday",
    eyebrow: "Birthday",
    h1: "Find a great place to celebrate a birthday",
    metaTitle: "Birthday Dinner and Party Spots Near You",
    metaDescription:
      "Find a bar or restaurant for a birthday that fits the mood you want, from a tasting menu to a lively night out. Free on iOS and Android.",
    intro: [
      "Birthdays deserve more than the first place that comes up. Tell Tallee it’s a birthday, add the vibe you’re after, and get places that suit a celebration, from a quiet dinner to a lively night out.",
      "Choose Birthday as your occasion and let Tallee narrow it down.",
    ],
    highlightsTitle: "Ways to celebrate",
    highlights: [
      { title: "Chef’s Tasting Menu", text: "A guided multi-course meal for a milestone." },
      { title: "Fancy", text: "Dress up and go all out." },
      { title: "Brunch Party", text: "A daytime celebration with friends." },
      { title: "Social Entertainment/Barcades", text: "Games and music for a playful crowd." },
    ],
    filterLine: "Choose Birthday as your occasion",
    shots: ["occasion", "results"],
    tipsTitle: "Tips for birthday plans",
    tips: [
      { title: "Plan ahead", text: "Check opening hours in Tallee and contact the place early, especially on weekends." },
      { title: "Think about the group", text: "Choose who you’re with so the suggestions suit the size and mood of your party." },
      { title: "Add your own vibe", text: "If the right vibe isn’t listed, type your own in the app." },
      { title: "Open directions", text: "Tap Get Directions on the place’s page so everyone can find it." },
    ],
    faqs: [
      { q: "Can I search for a birthday spot by mood?", a: "Yes. Pick Birthday as the occasion and add a vibe such as Fancy or Brunch Party." },
      { q: "Can I add a vibe that isn’t listed?", a: "Yes. The vibe screen has an Add your own vibe field." },
      FREE_FAQ,
    ],
  },

  anniversary: {
    name: "Anniversary",
    eyebrow: "Anniversary",
    h1: "Celebrate your anniversary in the right place",
    metaTitle: "Anniversary Dinner Spots Matched to Your Vibe",
    metaDescription:
      "Find a romantic or fancy bar or restaurant for your anniversary. Tallee matches places to the mood you want. Free on iOS and Android.",
    intro: [
      "An anniversary is about the details: the room, the pace, the feeling of being looked after. Tell Tallee the occasion and the mood, and it finds places worth the night out.",
      "Choose Anniversary, add a vibe such as Romantic, and check the details before you book.",
    ],
    highlightsTitle: "Vibes that suit an anniversary",
    highlights: [
      { title: "Romantic", text: "Intimate settings built around the two of you." },
      { title: "Fancy", text: "A dressed-up evening for a milestone." },
      { title: "Chef’s Tasting Menu", text: "A set menu that turns dinner into an event." },
      { title: "Quiet & Private", text: "Space to talk without raising your voice." },
    ],
    filterLine: "Choose Anniversary as your occasion",
    shots: ["occasion", "venue"],
    tipsTitle: "Tips for an anniversary night",
    tips: [
      { title: "Book early", text: "Popular places fill up. Open the place in Tallee to find the website and phone number." },
      { title: "Read the gallery", text: "Photos show the atmosphere, so you know the room suits the occasion." },
      { title: "Set a cost range", text: "Use the Select Cost Range filter to keep the evening within budget." },
      { title: "Save two options", text: "Heart a backup in case your first choice can’t fit you in." },
    ],
    faqs: [
      { q: "What vibe is best for an anniversary?", a: "Many people choose Romantic or Fancy. You can select one or two vibes to narrow the results." },
      { q: "Can I see opening hours?", a: "Yes. Each place’s page shows its opening hours, address, website and phone number." },
      FREE_FAQ,
    ],
  },

  "business-meeting": {
    name: "Business Meeting",
    eyebrow: "Business Meeting",
    h1: "Find the right place for a business meeting",
    metaTitle: "Business Meeting Spots Near You",
    metaDescription:
      "Find a bar or restaurant for a business meeting or client dinner. Tallee matches places to the tone you want. Free on iOS and Android.",
    intro: [
      "A business meeting goes better in a room where you can talk. Tell Tallee the occasion and the tone, and it recommends places that suit a working breakfast, a client lunch or a drink after the deal.",
      "Choose Business Meeting, add a vibe such as Quiet & Private or Café/Bistro, and set how far you’ll travel.",
    ],
    highlightsTitle: "Settings that suit business",
    highlights: [
      { title: "Quiet & Private", text: "A calmer room where conversation carries." },
      { title: "Café/Bistro", text: "Relaxed and easy for a working coffee or lunch." },
      { title: "Breakfast", text: "An early meeting over a proper meal." },
      { title: "Fancy", text: "A more formal setting for an important client." },
    ],
    filterLine: "Choose Business Meeting as your occasion",
    shots: ["occasion", "venue"],
    tipsTitle: "Tips for a business meal",
    tips: [
      { title: "Check the hours", text: "Opening hours are on each place’s page, so you can confirm a morning or lunch slot." },
      { title: "Reserve ahead", text: "Use the phone number or website on the page to book a table." },
      { title: "Keep it close", text: "Set a short travel distance so everyone arrives on time." },
      { title: "Use the map", text: "Send the location with Get Directions and the share button." },
    ],
    faqs: [
      { q: "Can Tallee find a quiet place to talk?", a: "Yes. Add Quiet & Private as your vibe alongside Business Meeting." },
      { q: "Can I see the website and phone number?", a: "Yes. Each place’s page shows its website, phone number, address and opening hours." },
      FREE_FAQ,
    ],
  },

  "casual-catch-up": {
    name: "Casual Catch-up",
    eyebrow: "Casual Catch-up",
    h1: "Find an easy spot for a casual catch-up",
    metaTitle: "Casual Catch-up Spots Near You",
    metaDescription:
      "Find a relaxed bar, café or restaurant for a casual catch-up with friends. Tallee matches places to your mood. Free on iOS and Android.",
    intro: [
      "Not every plan needs to be a big night. For a casual catch-up you want somewhere comfortable, close and easy. Tell Tallee the occasion and it finds places that fit.",
      "Choose Casual Catch-up, add Chill or Café/Bistro, and keep the distance short.",
    ],
    highlightsTitle: "Easygoing vibes",
    highlights: [
      { title: "Chill", text: "Relaxed seating and an unhurried pace." },
      { title: "Café/Bistro", text: "Coffee, a light bite and room to talk." },
      { title: "Just Drinks", text: "Skip dinner and meet for a drink." },
      { title: "Sports Bar", text: "Something on the screens and no pressure." },
    ],
    filterLine: "Choose Casual Catch-up as your occasion",
    shots: ["occasion", "vibe"],
    tipsTitle: "Tips for an easy meet-up",
    tips: [
      { title: "Keep the distance short", text: "Set a small travel distance so it’s easy for everyone." },
      { title: "Pick one vibe", text: "One relaxed vibe is enough for a casual plan." },
      { title: "Look at the gallery", text: "Photos show whether it’s lively or low-key." },
      { title: "Save a second option", text: "Heart a backup in case the first place is busy." },
    ],
    faqs: [
      { q: "What’s a good vibe for a casual catch-up?", a: "Chill and Café/Bistro are popular choices, and you can pick one or two." },
      { q: "Can I search by voice?", a: "Yes. Search with your voice and describe what you’re looking for." },
      FREE_FAQ,
    ],
  },

  "family-gathering": {
    name: "Family Gathering",
    eyebrow: "Family Gathering",
    h1: "Find a place for a family gathering",
    metaTitle: "Family Gathering Spots Near You",
    metaDescription:
      "Find a restaurant for a family gathering that suits the whole group. Tallee matches places to your occasion. Free on iOS and Android.",
    intro: [
      "A family meal works when the room suits everyone. Tell Tallee it’s a family gathering and who you’re with, and it recommends places that fit the group.",
      "Choose Family Gathering, add a vibe such as Buffet or Chill, and check the details before you go.",
    ],
    highlightsTitle: "Vibes for a group",
    highlights: [
      { title: "Buffet", text: "Plenty of choice for different tastes." },
      { title: "Chill", text: "A relaxed setting that’s easy for all ages." },
      { title: "Brunch Party", text: "A daytime meal for a big table." },
      { title: "Café/Bistro", text: "Casual and flexible for a smaller group." },
    ],
    filterLine: "Choose Family Gathering as your occasion",
    shots: ["occasion", "results"],
    tipsTitle: "Tips for a family meal",
    tips: [
      { title: "Say who you’re with", text: "Choose who you’re with so the suggestions suit the group." },
      { title: "Call ahead for a big table", text: "Use the phone number on the place’s page to ask about seating." },
      { title: "Check opening hours", text: "Hours differ by day, so confirm before you travel." },
      { title: "Share the plan", text: "Send the place to the family with the share button." },
    ],
    faqs: [
      { q: "Can Tallee suggest places for a large group?", a: "Choose who you’re with and the occasion, and Tallee suggests places that fit. Call the place to confirm seating for larger tables." },
      { q: "Can I set a cost range?", a: "Yes. Use the Select Cost Range filter on the plans screen." },
      FREE_FAQ,
    ],
  },
};

// ---------------------------------------------------------------------------
// Categories (vibes): /category/[slug]
// ---------------------------------------------------------------------------
export const categories: Record<string, SeoPage> = {
  brunch: {
    name: "Brunch",
    eyebrow: "Brunch",
    h1: "Find brunch spots that fit your vibe",
    metaTitle: "Brunch Spots Matched to Your Mood",
    metaDescription:
      "From breakfast to a full brunch party, Tallee finds brunch spots near you based on your mood and who you’re with. Free on iOS and Android.",
    intro: [
      "Brunch can mean a quiet coffee or a table of friends and a pitcher of something cold. Tallee asks what kind of brunch you want and recommends places near you that match.",
      "Pick Brunch Party or Breakfast as your vibe, add who you’re with, and go.",
    ],
    highlightsTitle: "Brunch vibes in Tallee",
    highlights: [
      { title: "Brunch Party", text: "Lively tables and a celebratory feel." },
      { title: "Breakfast", text: "An early start with a proper meal." },
      { title: "Café/Bistro", text: "A relaxed spot for coffee and something light." },
      { title: "Buffet", text: "Plenty of choice for a hungry group." },
    ],
    filterLine: "Choose Brunch Party or Breakfast as your vibe",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch tips",
    tips: [
      { title: "Combine with an occasion", text: "Add Birthday or Casual Catch-up to find brunch spots that suit the reason you’re meeting." },
      { title: "Check the hours", text: "Opening hours differ by day. Open the place in Tallee to see them." },
      { title: "Go early or book", text: "Weekend brunch fills quickly. Use the phone number or website on the place’s page." },
      { title: "Use voice search", text: "Describe what you want, like a quiet brunch with outdoor seating, and let Tallee do the filtering." },
    ],
    faqs: [
      { q: "Can I search for brunch near me?", a: "Yes. Tallee uses your current location, or one you type in, and the distance you choose." },
      { q: "Is there a difference between Breakfast and Brunch Party?", a: "They’re separate vibes in the app. Breakfast is about an early meal, and Brunch Party is a more social, celebratory feel." },
      FREE_FAQ,
    ],
  },

  "craft-cocktail-bars": {
    name: "Craft Cocktail Bars",
    eyebrow: "Craft Cocktail Bars",
    h1: "Find craft cocktail bars near you",
    metaTitle: "Craft Cocktail Bars Matched to Your Mood",
    metaDescription:
      "Find craft cocktail bars that suit the night you have in mind. Tallee matches places to your occasion and vibe. Free on iOS and Android.",
    intro: [
      "A great cocktail bar is about more than the menu. It’s the lighting, the volume and the crowd. Tallee matches bars to the occasion and mood you choose, so the place fits the night.",
      "Pick Craft Cocktail Bar as your vibe, add who you’re with, and see what’s nearby.",
    ],
    highlightsTitle: "Nights that suit a cocktail bar",
    highlights: [
      { title: "Date Night", text: "Pair Craft Cocktail Bar with Romantic for a low-lit evening." },
      { title: "Girls and Guys Night Out", text: "A good room for catching up over well-made drinks." },
      { title: "Casual Catch-up", text: "A step up from the usual bar without the fuss." },
      { title: "Just Drinks", text: "No dinner needed. Just a good drink in a good room." },
    ],
    filterLine: "Choose Craft Cocktail Bar as your vibe",
    shots: ["vibe", "venue"],
    tipsTitle: "Cocktail bar tips",
    tips: [
      { title: "Check when they open", text: "Many bars open in the late afternoon. Opening hours are on each place’s page." },
      { title: "Pick one more vibe", text: "Add Romantic, Chill or Quiet & Private to tune the atmosphere." },
      { title: "Look at the photos", text: "The gallery shows the room, so you know if it’s dim and intimate or loud and busy." },
      { title: "Get directions", text: "Open the map from the place’s page and head out." },
    ],
    faqs: [
      { q: "Can I find bars that aren’t too loud?", a: "Add Quiet & Private or Chill alongside Craft Cocktail Bar to steer toward calmer places." },
      { q: "Can I search by drink type?", a: "Tallee focuses on occasion and atmosphere. You can describe what you want with voice search or the vibe field." },
      FREE_FAQ,
    ],
  },

  "romantic-restaurants": {
    name: "Romantic Restaurants",
    eyebrow: "Romantic Restaurants",
    h1: "Find romantic restaurants near you",
    metaTitle: "Romantic Restaurants Matched to Your Vibe",
    metaDescription:
      "Find romantic restaurants and bars for date night or an anniversary. Tallee matches places to your mood and occasion. Free on iOS and Android.",
    intro: [
      "Romantic is a feeling, not a category, so Tallee matches it to the occasion you’re planning. Choose Romantic as your vibe, add Date Night or Anniversary, and see places that fit.",
      "Narrow it further with Fancy, Quiet & Private or Small Plates/Tapas.",
    ],
    highlightsTitle: "Ways to set the mood",
    highlights: [
      { title: "Romantic + Fancy", text: "A dressed-up evening with a sense of occasion." },
      { title: "Romantic + Quiet & Private", text: "A calm room built for conversation." },
      { title: "Romantic + Small Plates/Tapas", text: "Share dishes and take your time." },
      { title: "Romantic + Chef’s Tasting Menu", text: "A set menu for a special night." },
    ],
    filterLine: "Choose Romantic as your vibe",
    shots: ["vibe", "venueMap"],
    tipsTitle: "Tips for a romantic dinner",
    tips: [
      { title: "Choose one or two vibes", text: "Tallee works best with one or two criteria besides who you’re with." },
      { title: "Check the website", text: "Each place’s page links to its website, where you can often book a table." },
      { title: "Plan the route", text: "The map and Get Directions link make it easy to find the place." },
      { title: "Set a cost range", text: "Use the cost range filter to keep the night within budget." },
    ],
    faqs: [
      { q: "Can I search for a romantic restaurant for an anniversary?", a: "Yes. Choose Anniversary as the occasion and Romantic as the vibe." },
      { q: "Can I add my own vibe?", a: "Yes. If the vibe you want isn’t listed, add your own in the app." },
      FREE_FAQ,
    ],
  },

  "sports-bars": {
    name: "Sports Bars",
    eyebrow: "Sports Bars",
    h1: "Find sports bars near you",
    metaTitle: "Sports Bars Matched to Your Crowd",
    metaDescription:
      "Find sports bars for game day or a casual night with friends. Tallee matches places to your occasion and vibe. Free on iOS and Android.",
    intro: [
      "Game day needs a room with the right energy. Choose Sports Bar as your vibe, tell Tallee who you’re with, and see places near you that fit.",
      "Looking for something to watch live? The app also has an Events Near Me screen.",
    ],
    highlightsTitle: "When a sports bar fits",
    highlights: [
      { title: "Casual Catch-up", text: "Easygoing, with something happening on the screens." },
      { title: "Birthday", text: "A relaxed party spot for a group." },
      { title: "Family Gathering", text: "Choose who you’re with so the suggestions suit the group." },
      { title: "Events Near Me", text: "See games and shows happening nearby, with dates and venues." },
    ],
    filterLine: "Choose Sports Bar as your vibe",
    shots: ["vibe", "events"],
    tipsTitle: "Game day tips",
    tips: [
      { title: "Check the hours", text: "Opening hours are on each place’s page. Confirm they’re open for the game." },
      { title: "Call ahead for big games", text: "Use the phone number on the place’s page to ask about seating." },
      { title: "Combine vibes", text: "Add Social Entertainment/Barcades or Chill to tune the atmosphere." },
      { title: "Look for events", text: "Open Events Near Me to see what’s on in your area." },
    ],
    faqs: [
      { q: "Does Tallee show live game schedules?", a: "The app has an Events Near Me screen that lists upcoming events with dates and venues." },
      { q: "Can I find a sports bar for a group?", a: "Yes. Choose who you’re with and the occasion, then add Sports Bar as the vibe." },
      FREE_FAQ,
    ],
  },

  "whiskey-bars": {
    name: "Whiskey Bars",
    eyebrow: "Whiskey Bars",
    h1: "Find whiskey bars near you",
    metaTitle: "Whiskey Bars Matched to Your Night",
    metaDescription:
      "Find whiskey bars that suit your night, from a quiet pour to a lively room. Tallee matches places to your occasion and vibe. Free on iOS and Android.",
    intro: [
      "A good whiskey bar is unhurried. Tell Tallee the occasion and the mood, and it finds bars near you where the room matches the evening.",
      "Choose Whiskey Bar as your vibe and add who you’re with.",
    ],
    highlightsTitle: "When a whiskey bar fits",
    highlights: [
      { title: "Date Night", text: "Pair Whiskey Bar with Quiet & Private for an intimate evening." },
      { title: "Business Meeting", text: "A calm room for a conversation over a drink." },
      { title: "Casual Catch-up", text: "An easy meet-up with a good drink." },
      { title: "Birthday", text: "A grown-up way to mark the day." },
    ],
    filterLine: "Choose Whiskey Bar as your vibe",
    shots: ["vibe", "venue"],
    tipsTitle: "Whiskey bar tips",
    tips: [
      { title: "Check when they open", text: "Many bars open in the late afternoon. Hours are on each place’s page." },
      { title: "Add a second vibe", text: "Pair it with Chill or Quiet & Private to set the pace." },
      { title: "Look at the photos", text: "The gallery shows how dark, cozy or lively the room is." },
      { title: "Get directions", text: "Open the map from the place’s page to plan the trip." },
    ],
    faqs: [
      { q: "Can I find a quiet whiskey bar?", a: "Add Quiet & Private alongside Whiskey Bar to steer toward calmer rooms." },
      { q: "Does Tallee show a bar’s menu?", a: "A place’s page shows its website, where many bars post their menus." },
      FREE_FAQ,
    ],
  },

  cafes: {
    name: "Cafés & Bistros",
    eyebrow: "Cafés & Bistros",
    h1: "Find cafés and bistros near you",
    metaTitle: "Cafés and Bistros Matched to Your Mood",
    metaDescription:
      "Find cafés and bistros for a catch-up, a working coffee or a relaxed meal. Tallee matches places to your mood. Free on iOS and Android.",
    intro: [
      "A café can be a quiet corner to work or a bright spot for brunch. Tallee asks what you need and finds cafés and bistros near you that match.",
      "Choose Café/Bistro as your vibe and add an occasion.",
    ],
    highlightsTitle: "Ways to use a café",
    highlights: [
      { title: "Casual Catch-up", text: "A relaxed place to talk without a big plan." },
      { title: "Business Meeting", text: "A working coffee or a light lunch." },
      { title: "Breakfast", text: "An easy morning meal." },
      { title: "Solo time", text: "Choose By Myself as who you’re with for a quiet moment." },
    ],
    filterLine: "Choose Café/Bistro as your vibe",
    shots: ["vibe", "results"],
    tipsTitle: "Café tips",
    tips: [
      { title: "Check the hours", text: "Cafés often close earlier. See hours on each place’s page." },
      { title: "Look at the gallery", text: "Photos show the seating and the atmosphere." },
      { title: "Pick one more vibe", text: "Add Chill or Quiet & Private to refine the results." },
      { title: "Save your favorites", text: "Heart the ones you like to find them again." },
    ],
    faqs: [
      { q: "Can I find a café to go to alone?", a: "Yes. Choose By Myself as who you’re with, then add Café/Bistro as your vibe." },
      { q: "Does Tallee work for breakfast?", a: "Yes. Breakfast is a separate vibe in the app, and you can combine it with Café/Bistro." },
      FREE_FAQ,
    ],
  },

  "chefs-tasting-menus": {
    name: "Chef’s Tasting Menus",
    eyebrow: "Chef’s Tasting Menus",
    h1: "Find chef’s tasting menus near you",
    metaTitle: "Chef’s Tasting Menu Restaurants",
    metaDescription:
      "Find restaurants with chef’s tasting menus for an anniversary or a special night. Tallee matches places to your occasion. Free on iOS and Android.",
    intro: [
      "A tasting menu turns dinner into an event. Tell Tallee the occasion, and it finds restaurants near you that offer a chef’s tasting menu.",
      "Choose Chef’s Tasting Menu as your vibe and add Anniversary, Birthday or Date Night.",
    ],
    highlightsTitle: "When to choose a tasting menu",
    highlights: [
      { title: "Anniversary", text: "A set menu for a milestone." },
      { title: "Birthday", text: "A dinner worth the occasion." },
      { title: "Date Night", text: "Pair it with Romantic for a memorable evening." },
      { title: "Business Meeting", text: "A refined setting for an important client." },
    ],
    filterLine: "Choose Chef’s Tasting Menu as your vibe",
    shots: ["vibe", "venue"],
    tipsTitle: "Tasting menu tips",
    tips: [
      { title: "Reserve early", text: "Tasting menus often need a booking. Use the website or phone number on the page." },
      { title: "Ask about dietary needs", text: "Call the restaurant ahead if anyone has allergies." },
      { title: "Set a cost range", text: "Use the Select Cost Range filter to plan the budget." },
      { title: "Check the hours", text: "Confirm opening times before you book." },
    ],
    faqs: [
      { q: "How do I find a tasting menu with Tallee?", a: "Choose Chef’s Tasting Menu as your vibe and add an occasion such as Anniversary." },
      { q: "Can I filter by price?", a: "Yes. The plans screen has a Select Cost Range filter." },
      FREE_FAQ,
    ],
  },

  barcades: {
    name: "Barcades & Social Games",
    eyebrow: "Barcades & Social Games",
    h1: "Find barcades and social game bars",
    metaTitle: "Barcades and Social Game Bars Near You",
    metaDescription:
      "Find barcades and social entertainment bars for a playful night out. Tallee matches places to your group and occasion. Free on iOS and Android.",
    intro: [
      "Some nights are better with something to do. Tell Tallee the occasion and it finds barcades and social game bars near you.",
      "Choose Social Entertainment/Barcades as your vibe and add who you’re with.",
    ],
    highlightsTitle: "Good nights for games",
    highlights: [
      { title: "Girls and Guys Night Out", text: "Games and music for a higher-energy night." },
      { title: "Birthday", text: "A playful way to celebrate." },
      { title: "Casual Catch-up", text: "Something to do while you talk." },
      { title: "Group plans", text: "Choose who you’re with so the picks suit the group." },
    ],
    filterLine: "Choose Social Entertainment/Barcades as your vibe",
    shots: ["vibe", "results"],
    tipsTitle: "Tips for a game night",
    tips: [
      { title: "Check the hours", text: "Hours are on each place’s page. Evenings and weekends are busiest." },
      { title: "Call ahead for groups", text: "Use the phone number on the page for larger parties." },
      { title: "Add a second vibe", text: "Pair with Chill or Craft Cocktail Bar to set the atmosphere." },
      { title: "Share it", text: "Use the share button to send the place to the group." },
    ],
    faqs: [
      { q: "How do I find a barcade with Tallee?", a: "Choose Social Entertainment/Barcades as your vibe and add who you’re with." },
      { q: "Can I find one for a birthday?", a: "Yes. Choose Birthday as the occasion and Social Entertainment/Barcades as the vibe." },
      FREE_FAQ,
    ],
  },
};

// ---------------------------------------------------------------------------
// Cities: /city/[city]
// ---------------------------------------------------------------------------
export const cities: Record<string, SeoPage> = {
  "washington-dc": {
    name: "Washington, DC",
    eyebrow: "Washington, DC",
    h1: "Find the best spots in Washington, DC",
    metaTitle: "Bars and Restaurants in Washington, DC",
    metaDescription:
      "Find bars and restaurants in Washington, DC that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "From historic streets to busy nightlife strips, Washington, DC has something for every occasion. Tallee matches bars and restaurants to your mood, so you can pick the right neighborhood and the right room.",
      "Set your location to Washington, DC, choose an occasion, and see what fits.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "Georgetown", text: "Historic streets and waterfront, with a mix of upscale dining and casual bars." },
      { title: "Dupont Circle", text: "A walkable area with cafés, restaurants and cocktail bars." },
      { title: "U Street", text: "Known for its music history and a lively evening scene." },
      { title: "Adams Morgan", text: "A busy nightlife area with plenty of late-night options." },
    ],
    filterLine: "Set your location to Washington, DC",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in DC",
    tips: [
      { title: "Choose your distance", text: "Use the Travel up to slider to stay in one neighborhood or look further out." },
      { title: "Check the hours", text: "Opening hours differ by place and day. See them on each place’s page." },
      { title: "Plan the route", text: "Use Get Directions to open the map before you head out." },
    ],
    faqs: [
      { q: "Does Tallee work in Washington, DC?", a: "Yes. Type Washington, DC as your location, or use your current location if you’re already there." },
      { q: "Can I find places for a specific occasion?", a: "Yes. Choose an occasion such as Date Night or Birthday, then add a vibe." },
      FREE_FAQ,
    ],
  },

  "new-york": {
    name: "New York",
    eyebrow: "New York",
    h1: "Find the best spots in New York",
    metaTitle: "Bars and Restaurants in New York",
    metaDescription:
      "Find bars and restaurants in New York that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "New York has more bars and restaurants than anyone can scroll through. Tallee narrows them down by your occasion and mood, so you can choose a neighborhood and a room with confidence.",
      "Set your location to New York, add who you’re with, and see what fits the night.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "West Village", text: "Tucked-away spots on quiet streets, good for an intimate evening." },
      { title: "Lower East Side", text: "Late-night bars and small music venues." },
      { title: "Williamsburg", text: "Rooftops, cocktail bars and creative restaurants." },
      { title: "Midtown", text: "Pre-theater dinners and business meetings." },
    ],
    filterLine: "Set your location to New York",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in New York",
    tips: [
      { title: "Pick one neighborhood", text: "Set a short travel distance so the night stays in one area." },
      { title: "Check the hours", text: "Opening hours vary a lot. Check each place’s page before you go." },
      { title: "Look for events", text: "Open Events Near Me to see games and shows happening nearby." },
    ],
    faqs: [
      { q: "Does Tallee work in New York?", a: "Yes. Type New York as your location, or use your current location." },
      { q: "Can I find a business meeting spot?", a: "Yes. Business Meeting is one of the occasions in the app." },
      FREE_FAQ,
    ],
  },

  atlanta: {
    name: "Atlanta",
    eyebrow: "Atlanta",
    h1: "Find the best spots in Atlanta",
    metaTitle: "Bars and Restaurants in Atlanta",
    metaDescription:
      "Find bars and restaurants in Atlanta that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "Atlanta spreads out, and each neighborhood has its own feel. Tallee matches bars and restaurants to your occasion and mood, so you can pick the right area as well as the right place.",
      "Set your location to Atlanta, choose an occasion, and see what’s nearby.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "Midtown", text: "Walkable dining close to the arts." },
      { title: "Buckhead", text: "Upscale restaurants and lounges." },
      { title: "Old Fourth Ward", text: "Restaurants and bars near the BeltLine." },
      { title: "Virginia-Highland", text: "Neighborhood patios and cozy restaurants." },
    ],
    filterLine: "Set your location to Atlanta",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in Atlanta",
    tips: [
      { title: "Choose your distance", text: "Atlanta is spread out. Use the Travel up to slider to keep the night close." },
      { title: "Check the hours", text: "Open the place in Tallee to see opening hours before you leave." },
      { title: "Get directions", text: "Use Get Directions to open the map and plan the drive." },
    ],
    faqs: [
      { q: "Does Tallee work in Atlanta?", a: "Yes. Type Atlanta as your location, or use your current location." },
      { q: "Can I find a place for a group?", a: "Yes. Choose who you’re with and the occasion, then add a vibe." },
      FREE_FAQ,
    ],
  },

  chicago: {
    name: "Chicago",
    eyebrow: "Chicago",
    h1: "Find the best spots in Chicago",
    metaTitle: "Bars and Restaurants in Chicago",
    metaDescription:
      "Find bars and restaurants in Chicago that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "Chicago’s neighborhoods each have their own feel, from busy downtown dining to quieter residential streets. Tallee matches bars and restaurants to your occasion and mood, so you can pick the right area and the right room.",
      "Set your location to Chicago, choose an occasion, and see what fits.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "River North", text: "A busy area for dinner and nightlife close to downtown." },
      { title: "West Loop", text: "A dining destination with restaurants close together." },
      { title: "Wicker Park", text: "Bars, music and a creative crowd." },
      { title: "Lincoln Park", text: "Neighborhood bars and restaurants near the park." },
    ],
    filterLine: "Set your location to Chicago",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in Chicago",
    tips: [
      { title: "Stick to one area", text: "Use the Travel up to slider to keep the night in one neighborhood." },
      { title: "Check the hours", text: "Opening hours vary by place and day. Check each place’s page." },
      { title: "Plan the trip", text: "Use Get Directions to open the map before you head out." },
    ],
    faqs: [
      { q: "Does Tallee work in Chicago?", a: "Yes. Type Chicago as your location, or use your current location." },
      { q: "Can I find a place for a birthday?", a: "Yes. Choose Birthday as the occasion and add a vibe." },
      FREE_FAQ,
    ],
  },

  "los-angeles": {
    name: "Los Angeles",
    eyebrow: "Los Angeles",
    h1: "Find the best spots in Los Angeles",
    metaTitle: "Bars and Restaurants in Los Angeles",
    metaDescription:
      "Find bars and restaurants in Los Angeles that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "Los Angeles is spread out, so the neighborhood you choose matters as much as the place. Tallee matches bars and restaurants to your occasion and mood, then lets you set how far you’re willing to travel.",
      "Set your location to Los Angeles, choose an occasion, and see what’s nearby.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "Silver Lake", text: "Cafés, bars and a relaxed, creative feel." },
      { title: "Downtown LA", text: "Rooftops and restaurants in the Arts District and beyond." },
      { title: "Santa Monica", text: "Beach-side dining and daytime brunch." },
      { title: "West Hollywood", text: "A busy nightlife area with lots of choice." },
    ],
    filterLine: "Set your location to Los Angeles",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in Los Angeles",
    tips: [
      { title: "Set a realistic distance", text: "Distances are long, so keep the travel slider modest and stay in one area." },
      { title: "Check the hours", text: "Opening hours differ by place and day. See each place’s page." },
      { title: "Plan the drive", text: "Use Get Directions to open the map before you leave." },
    ],
    faqs: [
      { q: "Does Tallee work in Los Angeles?", a: "Yes. Type Los Angeles as your location, or use your current location." },
      { q: "Can I search by vibe?", a: "Yes. Choose from vibes such as Chill, Romantic and Craft Cocktail Bar." },
      FREE_FAQ,
    ],
  },

  miami: {
    name: "Miami",
    eyebrow: "Miami",
    h1: "Find the best spots in Miami",
    metaTitle: "Bars and Restaurants in Miami",
    metaDescription:
      "Find bars and restaurants in Miami that match your mood and occasion. Tallee is free on iOS and Android.",
    intro: [
      "From beachfront dining to rooftop lounges, Miami has a lot of choice. Tallee matches bars and restaurants to your occasion and mood, so you can find the right room for the night.",
      "Set your location to Miami, choose an occasion, and see what fits.",
    ],
    highlightsTitle: "Neighborhoods to explore",
    highlights: [
      { title: "South Beach", text: "Beachfront dining and a lively evening scene." },
      { title: "Wynwood", text: "Street art, bars and creative restaurants." },
      { title: "Brickell", text: "High-rise lounges and business dinners." },
      { title: "Coconut Grove", text: "Bayfront dining at a relaxed pace." },
    ],
    filterLine: "Set your location to Miami",
    shots: ["home", "results"],
    tipsTitle: "Tips for going out in Miami",
    tips: [
      { title: "Choose one area", text: "Set a short distance so the night stays in one neighborhood." },
      { title: "Check the hours", text: "Opening hours vary a lot. Check each place’s page." },
      { title: "Look at the photos", text: "The gallery shows the atmosphere before you go." },
    ],
    faqs: [
      { q: "Does Tallee work in Miami?", a: "Yes. Type Miami as your location, or use your current location." },
      { q: "Can I find a rooftop spot?", a: "Describe what you want with voice search, or add your own vibe." },
      FREE_FAQ,
    ],
  },
};

// ---------------------------------------------------------------------------
// City + category: /city/[city]/[category]
// Each page has its own copy. Add a page only when it has something specific
// to say; thin, templated pages hurt SEO.
// ---------------------------------------------------------------------------
export const cityCategories: Record<string, SeoPage> = {
  "washington-dc/brunch": {
    name: "Brunch in Washington, DC",
    eyebrow: "Washington, DC · Brunch",
    h1: "Find brunch in Washington, DC",
    metaTitle: "Brunch Spots in Washington, DC",
    metaDescription:
      "Find brunch spots in Washington, DC that fit your mood, from a quiet breakfast to a brunch party. Free on iOS and Android.",
    intro: [
      "Brunch in Washington, DC can be a slow morning near the waterfront or a lively table in a busy neighborhood. Tell Tallee which kind of brunch you want and it finds places near you.",
      "Choose Brunch Party or Breakfast as your vibe, and set your location to Washington, DC.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Georgetown", text: "A relaxed start to the day on historic streets." },
      { title: "Dupont Circle", text: "Walkable, with cafés and bistros close together." },
      { title: "Adams Morgan", text: "Good for a lively, social brunch." },
    ],
    filterLine: "Set Washington, DC and choose Brunch Party",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch in DC: tips",
    tips: [
      { title: "Book weekends early", text: "Use the phone number or website on a place’s page to reserve." },
      { title: "Mix in an occasion", text: "Add Birthday or Casual Catch-up to match why you’re meeting." },
      { title: "Check opening hours", text: "Weekday and weekend hours often differ." },
    ],
    faqs: [
      { q: "How do I find brunch in Washington, DC with Tallee?", a: "Set your location to Washington, DC, choose who you’re with, and add Brunch Party or Breakfast as your vibe." },
      { q: "Can I find brunch for a birthday?", a: "Yes. Choose Birthday as the occasion and Brunch Party as the vibe." },
    ],
  },

  "washington-dc/romantic-restaurants": {
    name: "Romantic Restaurants in Washington, DC",
    eyebrow: "Washington, DC · Romantic",
    h1: "Find romantic restaurants in Washington, DC",
    metaTitle: "Romantic Restaurants in Washington, DC",
    metaDescription:
      "Find romantic restaurants and bars in Washington, DC for date night or an anniversary. Free on iOS and Android.",
    intro: [
      "For a date night or an anniversary in Washington, DC, the neighborhood sets the mood as much as the menu. Tallee matches romantic places to the occasion you choose.",
      "Set your location to Washington, DC, choose Romantic as your vibe, and add Date Night or Anniversary.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Georgetown", text: "Historic streets and waterfront views for a walk before dinner." },
      { title: "Dupont Circle", text: "Cozy rooms within walking distance of each other." },
      { title: "U Street", text: "Dinner followed by a night out." },
    ],
    filterLine: "Set Washington, DC and choose Romantic",
    shots: ["vibe", "venueMap"],
    tipsTitle: "Romantic dinner in DC: tips",
    tips: [
      { title: "Add Quiet & Private", text: "Pair it with Romantic for a room where you can talk." },
      { title: "Reserve ahead", text: "Check the website or call from the place’s page." },
      { title: "Plan the walk", text: "Open the map from the place’s page to plan before and after." },
    ],
    faqs: [
      { q: "How do I find a romantic restaurant in Washington, DC?", a: "Set your location to Washington, DC, choose Date Night or Anniversary, and add Romantic as your vibe." },
      { q: "Can I narrow it by price?", a: "Yes. Use the Select Cost Range filter on the plans screen." },
    ],
  },

  "new-york/craft-cocktail-bars": {
    name: "Craft Cocktail Bars in New York",
    eyebrow: "New York · Craft Cocktail Bars",
    h1: "Find craft cocktail bars in New York",
    metaTitle: "Craft Cocktail Bars in New York",
    metaDescription:
      "Find craft cocktail bars in New York that suit your night, from intimate and quiet to lively. Free on iOS and Android.",
    intro: [
      "New York’s cocktail bars range from hidden rooms to packed rooftops. Tallee matches bars to your occasion and mood, so you can find the one that suits tonight.",
      "Set your location to New York and choose Craft Cocktail Bar as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "West Village", text: "Small, intimate rooms on quiet streets." },
      { title: "Lower East Side", text: "Late-night bars and a lively crowd." },
      { title: "Williamsburg", text: "Rooftops and creative cocktail menus." },
    ],
    filterLine: "Set New York and choose Craft Cocktail Bar",
    shots: ["vibe", "venue"],
    tipsTitle: "Cocktail bars in New York: tips",
    tips: [
      { title: "Choose the mood", text: "Add Romantic or Chill for something calm, or Social Entertainment/Barcades for a livelier night." },
      { title: "Check opening hours", text: "Many bars open late afternoon. Hours are on each place’s page." },
      { title: "Keep it local", text: "Set a short travel distance to stay in one neighborhood." },
    ],
    faqs: [
      { q: "How do I find a cocktail bar in New York?", a: "Set your location to New York, then choose Craft Cocktail Bar as your vibe and add an occasion." },
      { q: "Can I find a quiet cocktail bar?", a: "Add Quiet & Private alongside Craft Cocktail Bar to steer toward calmer rooms." },
    ],
  },

  "new-york/brunch": {
    name: "Brunch in New York",
    eyebrow: "New York · Brunch",
    h1: "Find brunch in New York",
    metaTitle: "Brunch Spots in New York",
    metaDescription:
      "Find brunch spots in New York for any group, from a quiet breakfast to a brunch party. Free on iOS and Android.",
    intro: [
      "Brunch is a New York ritual, and the right spot depends on who’s at the table. Tallee asks who you’re with and what you want, then finds places nearby.",
      "Set your location to New York and choose Brunch Party or Breakfast as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "West Village", text: "Quiet streets and a slower morning." },
      { title: "Williamsburg", text: "Creative menus and a relaxed crowd." },
      { title: "Midtown", text: "Convenient for a working breakfast or a pre-show meal." },
    ],
    filterLine: "Set New York and choose Brunch Party",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch in New York: tips",
    tips: [
      { title: "Reserve for weekends", text: "Use the phone number or website on a place’s page." },
      { title: "Use Business Meeting for work breakfasts", text: "Pair Breakfast with Business Meeting for a working morning." },
      { title: "Set the distance", text: "Use the Travel up to slider to stay close." },
    ],
    faqs: [
      { q: "How do I find brunch in New York with Tallee?", a: "Set your location to New York, choose who you’re with, and add Brunch Party or Breakfast as your vibe." },
      { q: "Can I find a breakfast for a business meeting?", a: "Yes. Choose Business Meeting as the occasion and Breakfast as the vibe." },
    ],
  },

  "atlanta/sports-bars": {
    name: "Sports Bars in Atlanta",
    eyebrow: "Atlanta · Sports Bars",
    h1: "Find sports bars in Atlanta",
    metaTitle: "Sports Bars in Atlanta",
    metaDescription:
      "Find sports bars in Atlanta for game day or a casual night out. Tallee matches places to your occasion and vibe. Free on iOS and Android.",
    intro: [
      "Game day in Atlanta means finding a room with the right crowd. Tell Tallee who you’re with, and it finds sports bars nearby that fit the occasion.",
      "Set your location to Atlanta and choose Sports Bar as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Midtown", text: "Easy to reach, with plenty of options close together." },
      { title: "Old Fourth Ward", text: "Casual places near the BeltLine." },
      { title: "Buckhead", text: "Larger venues for a bigger group." },
    ],
    filterLine: "Set Atlanta and choose Sports Bar",
    shots: ["vibe", "events"],
    tipsTitle: "Game day in Atlanta: tips",
    tips: [
      { title: "Call ahead", text: "Use the phone number on the place’s page to ask about seating." },
      { title: "Check events", text: "Open Events Near Me to see what’s on nearby." },
      { title: "Choose the distance", text: "Atlanta is spread out, so set a travel distance that works." },
    ],
    faqs: [
      { q: "How do I find a sports bar in Atlanta?", a: "Set your location to Atlanta and choose Sports Bar as your vibe, then add who you’re with." },
      { q: "Can I find a sports bar for a birthday?", a: "Yes. Choose Birthday as the occasion and Sports Bar as the vibe." },
    ],
  },

  "atlanta/romantic-restaurants": {
    name: "Romantic Restaurants in Atlanta",
    eyebrow: "Atlanta · Romantic",
    h1: "Find romantic restaurants in Atlanta",
    metaTitle: "Romantic Restaurants in Atlanta",
    metaDescription:
      "Find romantic restaurants and bars in Atlanta for date night or an anniversary. Free on iOS and Android.",
    intro: [
      "A romantic night in Atlanta can be a patio in a leafy neighborhood or a dressed-up dinner in the city. Tallee matches places to the occasion and mood you choose.",
      "Set your location to Atlanta, choose Romantic as your vibe, and add Date Night or Anniversary.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Virginia-Highland", text: "Neighborhood patios and cozy restaurants." },
      { title: "Buckhead", text: "Upscale dining for a special night." },
      { title: "Midtown", text: "Dinner close to the arts." },
    ],
    filterLine: "Set Atlanta and choose Romantic",
    shots: ["vibe", "venueMap"],
    tipsTitle: "Romantic dinner in Atlanta: tips",
    tips: [
      { title: "Add Fancy for a milestone", text: "Pair Romantic with Fancy for a dressed-up evening." },
      { title: "Plan the drive", text: "Use Get Directions to open the map before you leave." },
      { title: "Heart a backup", text: "Save a second option in My Favorites." },
    ],
    faqs: [
      { q: "How do I find a romantic restaurant in Atlanta?", a: "Set your location to Atlanta, choose Date Night or Anniversary, and add Romantic as your vibe." },
      { q: "Can I add my own vibe?", a: "Yes. The vibe screen has an Add your own vibe field." },
    ],
  },

  "chicago/craft-cocktail-bars": {
    name: "Craft Cocktail Bars in Chicago",
    eyebrow: "Chicago · Craft Cocktail Bars",
    h1: "Find craft cocktail bars in Chicago",
    metaTitle: "Craft Cocktail Bars in Chicago",
    metaDescription:
      "Find craft cocktail bars in Chicago that suit your night, from quiet and intimate to lively. Free on iOS and Android.",
    intro: [
      "Chicago’s cocktail bars range from low-lit lounges to busy rooms with a crowd. Tallee matches bars to your occasion and mood so you can find the one that suits tonight.",
      "Set your location to Chicago and choose Craft Cocktail Bar as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "River North", text: "Polished lounges close to downtown." },
      { title: "West Loop", text: "Cocktail bars alongside the restaurants." },
      { title: "Wicker Park", text: "Creative menus and a relaxed, local crowd." },
    ],
    filterLine: "Set Chicago and choose Craft Cocktail Bar",
    shots: ["vibe", "venue"],
    tipsTitle: "Cocktail bars in Chicago: tips",
    tips: [
      { title: "Dress for the weather", text: "Winters are cold, so choose somewhere close to where you’ll start." },
      { title: "Add a second vibe", text: "Try Romantic for a date or Chill for a catch-up." },
      { title: "Check opening hours", text: "Many bars open late afternoon. Hours are on each place’s page." },
    ],
    faqs: [
      { q: "How do I find a cocktail bar in Chicago?", a: "Set your location to Chicago, then choose Craft Cocktail Bar as your vibe and add an occasion." },
      { q: "Can I find a quiet bar?", a: "Add Quiet & Private alongside Craft Cocktail Bar to steer toward calmer rooms." },
    ],
  },

  "chicago/brunch": {
    name: "Brunch in Chicago",
    eyebrow: "Chicago · Brunch",
    h1: "Find brunch in Chicago",
    metaTitle: "Brunch Spots in Chicago",
    metaDescription:
      "Find brunch spots in Chicago for any group, from a quiet breakfast to a brunch party. Free on iOS and Android.",
    intro: [
      "Weekend brunch in Chicago fills up quickly, so it helps to know what you want before you go. Tell Tallee the mood and the group, and it finds places nearby.",
      "Set your location to Chicago and choose Brunch Party or Breakfast as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "West Loop", text: "Many restaurants within a short walk." },
      { title: "Lincoln Park", text: "A relaxed neighborhood feel for a slow morning." },
      { title: "Wicker Park", text: "Creative menus and a casual crowd." },
    ],
    filterLine: "Set Chicago and choose Brunch Party",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch in Chicago: tips",
    tips: [
      { title: "Book for weekends", text: "Use the phone number or website on the place’s page to reserve." },
      { title: "Choose the group", text: "Set who you’re with so the picks suit the table." },
      { title: "Check the hours", text: "Weekday and weekend hours often differ." },
    ],
    faqs: [
      { q: "How do I find brunch in Chicago with Tallee?", a: "Set your location to Chicago, choose who you’re with, and add Brunch Party or Breakfast as your vibe." },
      { q: "Can I find brunch for a birthday?", a: "Yes. Choose Birthday as the occasion and Brunch Party as the vibe." },
    ],
  },

  "los-angeles/brunch": {
    name: "Brunch in Los Angeles",
    eyebrow: "Los Angeles · Brunch",
    h1: "Find brunch in Los Angeles",
    metaTitle: "Brunch Spots in Los Angeles",
    metaDescription:
      "Find brunch spots in Los Angeles that fit your mood, from a quiet breakfast to a brunch party. Free on iOS and Android.",
    intro: [
      "Brunch in Los Angeles can mean a patio by the beach or a table in a neighborhood café. Tell Tallee what you want and it finds places near you.",
      "Set your location to Los Angeles and choose Brunch Party or Breakfast as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Santa Monica", text: "A bright, beach-side start to the day." },
      { title: "Silver Lake", text: "Cafés and relaxed neighborhood spots." },
      { title: "West Hollywood", text: "Lively tables and a social crowd." },
    ],
    filterLine: "Set Los Angeles and choose Brunch Party",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch in Los Angeles: tips",
    tips: [
      { title: "Keep it local", text: "Traffic is heavy, so set a short travel distance." },
      { title: "Reserve ahead", text: "Weekend tables go fast. Call or use the website on the page." },
      { title: "Use voice search", text: "Describe what you want, like a sunny patio, and let Tallee filter." },
    ],
    faqs: [
      { q: "How do I find brunch in Los Angeles with Tallee?", a: "Set your location to Los Angeles, choose who you’re with, and add Brunch Party or Breakfast as your vibe." },
      { q: "Can I find a café for a quiet breakfast?", a: "Yes. Choose Breakfast and Café/Bistro, and add Quiet & Private." },
    ],
  },

  "los-angeles/romantic-restaurants": {
    name: "Romantic Restaurants in Los Angeles",
    eyebrow: "Los Angeles · Romantic",
    h1: "Find romantic restaurants in Los Angeles",
    metaTitle: "Romantic Restaurants in Los Angeles",
    metaDescription:
      "Find romantic restaurants and bars in Los Angeles for date night or an anniversary. Free on iOS and Android.",
    intro: [
      "A romantic night in Los Angeles can be a rooftop at sunset or a quiet table in a neighborhood restaurant. Tallee matches places to the occasion and mood you choose.",
      "Set your location to Los Angeles, choose Romantic as your vibe, and add Date Night or Anniversary.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Downtown LA", text: "Rooftops and dressed-up dining." },
      { title: "Silver Lake", text: "Cozy neighborhood restaurants." },
      { title: "Santa Monica", text: "Dinner near the ocean." },
    ],
    filterLine: "Set Los Angeles and choose Romantic",
    shots: ["vibe", "venueMap"],
    tipsTitle: "Romantic dinner in Los Angeles: tips",
    tips: [
      { title: "Plan the drive", text: "Use Get Directions and allow time for traffic." },
      { title: "Add Fancy for a milestone", text: "Pair it with Romantic for a dressed-up night." },
      { title: "Reserve ahead", text: "Check the place’s website or call to book." },
    ],
    faqs: [
      { q: "How do I find a romantic restaurant in Los Angeles?", a: "Set your location to Los Angeles, choose Date Night or Anniversary, and add Romantic as your vibe." },
      { q: "Can I set a budget?", a: "Yes. Use the Select Cost Range filter on the plans screen." },
    ],
  },

  "miami/brunch": {
    name: "Brunch in Miami",
    eyebrow: "Miami · Brunch",
    h1: "Find brunch in Miami",
    metaTitle: "Brunch Spots in Miami",
    metaDescription:
      "Find brunch spots in Miami for a relaxed morning or a brunch party with friends. Free on iOS and Android.",
    intro: [
      "Brunch in Miami ranges from an easy waterfront table to a lively party with friends. Tell Tallee the mood and it finds places near you.",
      "Set your location to Miami and choose Brunch Party or Breakfast as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "South Beach", text: "A lively, social brunch close to the beach." },
      { title: "Wynwood", text: "Creative menus among the murals." },
      { title: "Coconut Grove", text: "A slower pace by the bay." },
    ],
    filterLine: "Set Miami and choose Brunch Party",
    shots: ["vibe", "results"],
    tipsTitle: "Brunch in Miami: tips",
    tips: [
      { title: "Go early", text: "Weekend brunch can be busy. Check opening hours on the place’s page." },
      { title: "Choose the group", text: "Pick who you’re with so the suggestions suit the table." },
      { title: "Keep it close", text: "Set a short distance so you’re not stuck in traffic." },
    ],
    faqs: [
      { q: "How do I find brunch in Miami with Tallee?", a: "Set your location to Miami, choose who you’re with, and add Brunch Party or Breakfast as your vibe." },
      { q: "Can I find a birthday brunch?", a: "Yes. Choose Birthday as the occasion and Brunch Party as the vibe." },
    ],
  },

  "miami/craft-cocktail-bars": {
    name: "Craft Cocktail Bars in Miami",
    eyebrow: "Miami · Craft Cocktail Bars",
    h1: "Find craft cocktail bars in Miami",
    metaTitle: "Craft Cocktail Bars in Miami",
    metaDescription:
      "Find craft cocktail bars in Miami, from rooftop lounges to relaxed neighborhood bars. Free on iOS and Android.",
    intro: [
      "Miami’s cocktail scene mixes rooftop lounges with relaxed neighborhood bars. Tallee matches bars to your occasion and mood so the room fits the night.",
      "Set your location to Miami and choose Craft Cocktail Bar as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Brickell", text: "High-rise lounges and polished bars." },
      { title: "Wynwood", text: "Casual bars with a creative edge." },
      { title: "South Beach", text: "Late nights and a busy crowd." },
    ],
    filterLine: "Set Miami and choose Craft Cocktail Bar",
    shots: ["vibe", "venue"],
    tipsTitle: "Cocktail bars in Miami: tips",
    tips: [
      { title: "Pick the energy", text: "Add Chill for a calm evening or Social Entertainment/Barcades for a busy one." },
      { title: "Check the hours", text: "Opening hours are on each place’s page." },
      { title: "Look at the gallery", text: "Photos show whether it’s a rooftop, a lounge or a small bar." },
    ],
    faqs: [
      { q: "How do I find a cocktail bar in Miami?", a: "Set your location to Miami, then choose Craft Cocktail Bar as your vibe and add an occasion." },
      { q: "Can I find a quiet bar?", a: "Add Quiet & Private alongside Craft Cocktail Bar." },
    ],
  },

  "washington-dc/craft-cocktail-bars": {
    name: "Craft Cocktail Bars in Washington, DC",
    eyebrow: "Washington, DC · Craft Cocktail Bars",
    h1: "Find craft cocktail bars in Washington, DC",
    metaTitle: "Craft Cocktail Bars in Washington, DC",
    metaDescription:
      "Find craft cocktail bars in Washington, DC that suit your night, from intimate rooms to lively spots. Free on iOS and Android.",
    intro: [
      "Washington, DC has cocktail bars for every mood, from quiet rooms near Dupont Circle to busy rooms on U Street. Tallee matches bars to your occasion so the place fits the night.",
      "Set your location to Washington, DC and choose Craft Cocktail Bar as your vibe.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "Dupont Circle", text: "Intimate rooms within walking distance." },
      { title: "U Street", text: "A lively evening scene." },
      { title: "Adams Morgan", text: "A busy area with lots of late-night choice." },
    ],
    filterLine: "Set Washington, DC and choose Craft Cocktail Bar",
    shots: ["vibe", "venue"],
    tipsTitle: "Cocktail bars in DC: tips",
    tips: [
      { title: "Choose the pace", text: "Add Romantic or Chill for something calmer." },
      { title: "Walk it", text: "These areas are walkable, so keep the travel distance short." },
      { title: "Check the hours", text: "Many bars open in the late afternoon." },
    ],
    faqs: [
      { q: "How do I find a cocktail bar in Washington, DC?", a: "Set your location to Washington, DC, then choose Craft Cocktail Bar as your vibe and add an occasion." },
      { q: "Can I find a bar for a girls and guys night out?", a: "Yes. Choose Girls and Guys Night Out as the occasion and Craft Cocktail Bar as the vibe." },
    ],
  },

  "new-york/romantic-restaurants": {
    name: "Romantic Restaurants in New York",
    eyebrow: "New York · Romantic",
    h1: "Find romantic restaurants in New York",
    metaTitle: "Romantic Restaurants in New York",
    metaDescription:
      "Find romantic restaurants and bars in New York for date night or an anniversary. Free on iOS and Android.",
    intro: [
      "New York has a table for every kind of evening, but the mood is what makes it romantic. Tallee matches places to the occasion you choose, so you can skip the scrolling.",
      "Set your location to New York, choose Romantic as your vibe, and add Date Night or Anniversary.",
    ],
    highlightsTitle: "Where to look",
    highlights: [
      { title: "West Village", text: "Quiet streets and small, intimate rooms." },
      { title: "Lower East Side", text: "Dinner followed by a late drink." },
      { title: "Midtown", text: "Pre-theater dinners and dressed-up evenings." },
    ],
    filterLine: "Set New York and choose Romantic",
    shots: ["vibe", "venueMap"],
    tipsTitle: "Romantic dinner in New York: tips",
    tips: [
      { title: "Book ahead", text: "Popular tables fill up. Use the website or phone number on the page." },
      { title: "Add Quiet & Private", text: "Pair it with Romantic for a room where you can talk." },
      { title: "Plan the route", text: "Use the map on the place’s page to plan the evening." },
    ],
    faqs: [
      { q: "How do I find a romantic restaurant in New York?", a: "Set your location to New York, choose Date Night or Anniversary, and add Romantic as your vibe." },
      { q: "Can I find a tasting menu?", a: "Yes. Add Chef’s Tasting Menu as a vibe for a special evening." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers: URLs and internal links
// ---------------------------------------------------------------------------

/** Safe lookup: unknown slugs (including "constructor" etc.) return undefined. */
export function pick(map: Record<string, SeoPage>, key: string): SeoPage | undefined {
  return Object.hasOwn(map, key) ? map[key] : undefined;
}

export type Related = { href: string; label: string; kind: string };

export const urls = {
  occasion: (slug: string) => `/occasion/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  city: (slug: string) => `/city/${slug}`,
  cityCategory: (city: string, category: string) => `/city/${city}/${category}`,
};

export const hubPaths = ["/occasion", "/category", "/city"];

/** Short card text: the meta description without the trailing "free on iOS and Android". */
export function summary(page: SeoPage): string {
  return page.metaDescription.replace(/\s*(Tallee is free|Free) on iOS and Android\.?$/, "").trim();
}

export function allSeoPaths(): string[] {
  return [
    ...Object.keys(occasions).map(urls.occasion),
    ...Object.keys(categories).map(urls.category),
    ...Object.keys(cities).map(urls.city),
    ...Object.keys(cityCategories).map((k) => {
      const [city, category] = k.split("/");
      return urls.cityCategory(city, category);
    }),
  ];
}

const occ = (slug: string): Related => ({ href: urls.occasion(slug), label: occasions[slug].name, kind: "Occasion" });
const cat = (slug: string): Related => ({ href: urls.category(slug), label: categories[slug].name, kind: "Vibe" });
const cit = (slug: string): Related => ({ href: urls.city(slug), label: cities[slug].name, kind: "City" });
const cc = (key: string): Related => {
  const [city, category] = key.split("/");
  return { href: urls.cityCategory(city, category), label: cityCategories[key].name, kind: "City guide" };
};

const others = (obj: Record<string, unknown>, slug: string) => Object.keys(obj).filter((s) => s !== slug);

export function relatedForOccasion(slug: string): Related[] {
  return [...others(occasions, slug).slice(0, 2).map(occ), ...Object.keys(categories).slice(0, 2).map(cat), ...Object.keys(cities).slice(0, 2).map(cit)];
}
export function relatedForCategory(slug: string): Related[] {
  const guides = Object.keys(cityCategories).filter((k) => k.endsWith(`/${slug}`)).map(cc);
  return [...others(categories, slug).slice(0, 2).map(cat), ...Object.keys(occasions).slice(0, 2).map(occ), ...guides, ...Object.keys(cities).slice(0, 2).map(cit)].slice(0, 6);
}
export function relatedForCity(slug: string): Related[] {
  const guides = Object.keys(cityCategories).filter((k) => k.startsWith(`${slug}/`)).map(cc);
  return [...guides, ...others(cities, slug).map(cit), ...Object.keys(occasions).slice(0, 2).map(occ)].slice(0, 6);
}
export function relatedForCityCategory(key: string): Related[] {
  const [city, category] = key.split("/");
  const siblings = Object.keys(cityCategories).filter((k) => k !== key && (k.startsWith(`${city}/`) || k.endsWith(`/${category}`))).map(cc);
  return [cit(city), cat(category), ...siblings, ...Object.keys(occasions).slice(0, 2).map(occ)].slice(0, 6);
}
