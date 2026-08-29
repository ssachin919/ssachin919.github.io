/** Prefix public paths for GitHub Pages project sites (`BASE_PATH`). */
function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export type SceneKind = "india-glow" | "code-lattice" | "vrindavan-tree";

export type TwinBlock = {
  name: string;
  tagline: string;
  body: string;
  href: string;
  hrefLabel: string;
};

export type StoryChapter = {
  id: string;
  railLabel: string;
  eyebrow?: string;
  title: string;
  body: string;
  /** Optional second paragraph for denser beats */
  bodyExtra?: string;
  mapsUrl?: string;
  mapsLabel?: string;
  scene?: SceneKind;
  /** Lighter tree bloom for seva reuse */
  sceneVariant?: "full" | "light";
  pin?: boolean;
  variant?: "hero" | "default" | "twin" | "portrait" | "close";
  twin?: { left: TwinBlock; right: TwinBlock };
  portraitSrc?: string;
  coverSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
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
} as const;

export const storyChapters: StoryChapter[] = [
  {
    id: "hero",
    railLabel: "Mission",
    variant: "hero",
    title: "Mission Bhavya Bharat",
    body: "Transforming professions, elevating consciousness, and contributing to Bharat's rise.",
    bodyExtra: "Technology · Spirituality · Nation Building",
    scene: "india-glow",
    portraitSrc: withBase("/pictures/sachin-avatar-circle.webp"),
    ctaLabel: "Begin the journey",
    ctaHref: "#iit",
  },
  {
    id: "iit",
    railLabel: "IITK",
    eyebrow: "IIT Kanpur · Mechanical Engineering",
    title: "JEE cleared. IIT Kanpur began.",
    body: "The gate opened with one exam. Inside: systems thinking, discipline under pressure, and a mind trained to build what lasts.",
  },
  {
    id: "research",
    railLabel: "Research",
    eyebrow: "Internships · Dual degree",
    title: "Labs first. Then a longer path.",
    body: "Core internships, including E-spin Nanotech, pulled toward research. Love for mathematics turned a B.Tech into a dual B.Tech + M.Tech.",
  },
  {
    id: "corona",
    railLabel: "Pivot",
    eyebrow: "The pandemic",
    title: "Then the path broke.",
    body: "COVID forced the dual degree to end. The plan ended. The search for the next honest chapter began.",
  },
  {
    id: "contata",
    railLabel: "Contata",
    eyebrow: "Contata Solutions · Full stack",
    title: "Ship code. Learn people.",
    body: "Full-stack work at Contata turned theory into product: speed, collaboration, and software that had to work for someone else.",
    scene: "code-lattice",
  },
  {
    id: "startups",
    railLabel: "Startups",
    eyebrow: "Serving society",
    title: "Comfort was not the brief.",
    body: "Startups felt like the only place left to stretch: building for society, not just a title on a card.",
  },
  {
    id: "vrindavan",
    railLabel: "Vrindavan",
    eyebrow: "Akhand Vrindavan Vaas",
    title: "A vow. A home. A way of working.",
    body: "The spiritual path deepened into nishtha: Akhand Vrindavan Vaas. From there, the work continued remotely. Rooted, not retreated.",
    variant: "portrait",
    portraitSrc: withBase("/pictures/sachin-avatar-circle.webp"),
    scene: "vrindavan-tree",
    sceneVariant: "full",
    pin: true,
    mapsUrl: VRINDAVAN_MAPS_URL,
    mapsLabel: "Find Vrindavan on Google Maps",
  },
  {
    id: "talentsavvy",
    railLabel: "Remote",
    eyebrow: "TalentSavvy · From Vrindavan",
    title: "Deep tech. Sacred ground.",
    body: "TalentSavvy shipped from Vrindavan: proof that serious engineering and spiritual rootedness can live in the same day.",
  },
  {
    id: "webyalaya",
    railLabel: "Webyalaya",
    eyebrow: "Founded · Incubated by IIM Lucknow",
    title: "Founded. Funded. Exited.",
    body: "Webyalaya grew under IIM Lucknow’s incubation. When the CTO role required travel that conflicted with Vrindavan as first priority, stepping down was the honest move — and cleared the ground for what came next.",
  },
  {
    id: "twin",
    railLabel: "Now",
    eyebrow: "Two products · One mission",
    title: "Clarity within. Opportunity without.",
    body: "Two companies. Two hard problems: inner unrest, and a generation locked out of the tech conversation.",
    variant: "twin",
    pin: true,
    twin: {
      left: {
        name: "Humantra",
        tagline: "Practice before preaching",
        body: "AI-powered spiritual guidance rooted in Sanatan Dharma. For the quiet question beneath a successful life: why am I doing any of this? Clarity, purpose, and a life aligned with dharma. Lived first, then shared.",
        href: productLinks.humantra,
        hrefLabel: "Visit humantra.yoga",
      },
      right: {
        name: "CoinsLive",
        tagline: "Stop nodding. Start knowing.",
        body: "AI, agents, and web3 explained without hype or fear. Briefings, tests, and live sessions so founders, freshers, and curious professionals can finally understand enough to act.",
        href: productLinks.coinslive,
        hrefLabel: "Visit coinslive.in",
      },
    },
  },
  {
    id: "seva",
    railLabel: "Seva",
    eyebrow: "Social initiatives",
    title: "Service that stays close to the soil.",
    body: "Ventures are not the whole work. Vriksharopan (tree plantation in Vrindavan) and other seva keep the mission tied to place, not only product.",
    scene: "vrindavan-tree",
    sceneVariant: "light",
    mapsUrl: VRINDAVAN_MAPS_URL,
    mapsLabel: "Find Vrindavan on Google Maps",
  },
  {
    id: "vision",
    railLabel: "Vision",
    eyebrow: "What we are building toward",
    title: "Gaushala. Gurukul. Sustainable industry.",
    body: "Reviving gaushala and gurukul as living systems: holistic education, dignified livelihood, and industry that does not hollow out the land.",
  },
  {
    id: "close",
    railLabel: "Join",
    eyebrow: "Mission Bhavya Bharat",
    title: "Everyone deserves a glorious life.",
    body: "If this arc resonates: build with us, learn with us, or simply say namaste. Anyone can connect on any of the social channels.",
    variant: "close",
    pin: true,
  },
];

export const railChapters = storyChapters.map(({ id, railLabel }) => ({
  id,
  railLabel,
}));
