/** Prefix public paths for GitHub Pages project sites (`BASE_PATH`). */
function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export type SceneKind = "india-glow" | "code-lattice" | "vrindavan-tree";

export type WorkBlock = {
  name: string;
  body: string;
  href: string;
  hrefLabel: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type StoryChapter = {
  id: string;
  railLabel: string;
  eyebrow?: string;
  title: string;
  /** Primary body paragraph */
  body: string;
  /** Additional paragraphs after body */
  paragraphs?: string[];
  /** Short line under title (hero credentials, CTA note, etc.) */
  bodyExtra?: string;
  mapsUrl?: string;
  mapsLabel?: string;
  scene?: SceneKind;
  sceneVariant?: "full" | "light";
  pin?: boolean;
  variant?: "hero" | "default" | "work" | "faq" | "portrait" | "close";
  work?: WorkBlock[];
  faqs?: FaqItem[];
  portraitSrc?: string;
  /** Primary CTA */
  ctaLabel?: string;
  ctaHref?: string;
  /** Secondary line under CTA (e.g. fee / format) */
  ctaNote?: string;
};

export const VRINDAVAN_MAPS_URL =
  "https://www.google.com/maps/place/Vrindavan,+Uttar+Pradesh";

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sachin-anand-mbb",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/sachin_anand_mbb",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@sachin-anand-mbb",
  },
] as const;

export const productLinks = {
  humantra: "https://humantra.yoga/",
  coinslive: "https://coinslive.in/",
  /** Private conversation booking via CoinsLive */
  booking: "https://www.coinslive.in/u/sachin/",
  mission: "#mission",
} as const;

export const storyChapters: StoryChapter[] = [
  {
    id: "hero",
    railLabel: "Home",
    variant: "hero",
    title: "Swami Sachin Anand",
    eyebrow: "Rooted in Vrindavan. Building for the world.",
    bodyExtra: "IIT Kanpur graduate. Founder. Sanyasi.",
    body: "My life brings together spiritual practice, technology, and service. From Vrindavan, I am working toward a question that connects all three:",
    paragraphs: [
      "How can we build a better world while becoming better human beings?",
    ],
    scene: "india-glow",
    portraitSrc: withBase("/pictures/sachin-avatar-circle.webp"),
    ctaLabel: "Book a private conversation",
    ctaHref: productLinks.booking,
    ctaNote: "30 minutes · Online · ₹50,000",
  },
  {
    id: "vow",
    railLabel: "Vow",
    title: "One commitment shapes everything else.",
    body: "I have taken a vow of Akhand Vrindavan Vaas, a commitment to remain in Vrindavan. This is where I practice, build products, and work with people online.",
    paragraphs: [
      "My engineering education at IIT Kanpur taught me to examine how things work. Spiritual practice keeps bringing me back to why we do them.",
      "Both shape the questions I ask and the work I choose.",
    ],
    scene: "vrindavan-tree",
    sceneVariant: "full",
    mapsUrl: VRINDAVAN_MAPS_URL,
    mapsLabel: "Find Vrindavan on Google Maps",
  },
  {
    id: "practice",
    railLabel: "Practice",
    title: "Practice before preaching.",
    body: "A principle means something when it changes how we live.",
    paragraphs: [
      "For me, that means bringing the same attention to spiritual practice, a product decision, a difficult conversation, and an act of service.",
      "My work is an ongoing attempt to put this into practice.",
    ],
  },
  {
    id: "work",
    railLabel: "Work",
    variant: "work",
    title: "",
    body: "",
    pin: true,
    work: [
      {
        name: "Humantra",
        body: "Bringing spiritual practice into everyday life through technology, guidance, and tools such as Breaths by Humantra.",
        href: productLinks.humantra,
        hrefLabel: "Explore Humantra",
      },
      {
        name: "CoinsLive",
        body: "Helping students and early professionals find career clarity and turn learning into action through counselling, practical learning, and conversations with mentors.",
        href: productLinks.coinslive,
        hrefLabel: "Explore CoinsLive",
      },
      {
        name: "Mission Bhavya Bharat",
        body: "The larger vision behind my work: a conscious, innovative, self-reliant Bharat, where people have meaningful opportunities and greater clarity in life.",
        href: productLinks.mission,
        hrefLabel: "Explore Mission Bhavya Bharat",
      },
    ],
  },
  {
    id: "mission",
    railLabel: "Mission",
    title: "What question brings you here?",
    body: "Perhaps you are building something and questioning its direction.",
    paragraphs: [
      "Perhaps your work is growing, while your sense of purpose feels less clear.",
      "Perhaps you see a possibility where technology, learning, and service meet, and want to think it through.",
      "Bring one question that deserves your full attention.",
      "In our conversation, we can examine your assumptions, consider the choices before you, and explore a practical next step.",
      "I bring my experience in building products and a perspective shaped by spiritual practice. The conversation begins with your context.",
    ],
    ctaLabel: "Book a 30-minute conversation · ₹50,000",
    ctaHref: productLinks.booking,
    ctaNote: "Sign in on CoinsLive, pay, and book your online meeting.",
  },
  {
    id: "prepare",
    railLabel: "Prepare",
    variant: "faq",
    title: "Before we meet",
    body: "",
    faqs: [
      {
        question: "What can we discuss?",
        answer:
          "Product and venture direction, practical uses of technology, career decisions, or bringing your work closer to your values. Choose one central question so we can give it proper attention.",
      },
      {
        question: "How should I prepare?",
        answer:
          "Come with a brief account of your situation, what you have already considered, and the decision or question you want to explore.",
      },
      {
        question: "Where does the meeting take place?",
        answer:
          "Online. I conduct all meetings remotely from Vrindavan.",
      },
      {
        question: "What is the fee?",
        answer: "₹50,000 for a 30-minute private conversation.",
      },
    ],
  },
  {
    id: "close",
    railLabel: "Connect",
    variant: "close",
    title: "Swami Sachin Anand",
    eyebrow: "Vrindavan, Bharat",
    body: "Practice before preaching.",
    ctaLabel: "Book a conversation",
    ctaHref: productLinks.booking,
  },
];

export const railChapters = storyChapters.map(({ id, railLabel }) => ({
  id,
  railLabel,
}));
