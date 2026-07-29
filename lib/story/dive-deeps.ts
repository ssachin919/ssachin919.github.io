export type DiveSection = {
  heading?: string;
  body?: string;
  bullets?: string[];
  tags?: string[];
};

export type DiveDeep = {
  id: string;
  title: string;
  eyebrow?: string;
  summary: string;
  sections: DiveSection[];
  links?: { label: string; href: string }[];
};

/** Cross-cutting panels (skills, projects, education, research) plus per-chapter detail. */
export const diveDeeps: Record<string, DiveDeep> = {
  skills: {
    id: "skills",
    title: "Technical skills",
    eyebrow: "Full stack",
    summary:
      "A full laundry list from the engineering practice: languages, product UI, backends, cloud, data, GenAI, and blockchain.",
    sections: [
      {
        heading: "Languages",
        tags: ["JavaScript", "Python", "Java", "C++"],
      },
      {
        heading: "Frontend",
        tags: ["React", "Next.js", "Tailwind CSS", "ShadCN", "Framer Motion"],
      },
      {
        heading: "Backend",
        tags: ["Node.js", "FastAPI", "Django", "Spring Boot", "Flask"],
      },
      {
        heading: "Cloud & infra",
        tags: ["AWS", "GCP", "Azure", "Vercel", "Firebase", "Render"],
      },
      {
        heading: "Databases",
        tags: ["PostgreSQL", "MongoDB", "DynamoDB", "Neo4j", "Pinecone"],
      },
      {
        heading: "DevOps",
        tags: ["Git", "GitHub", "Azure Repos", "Docker", "Kubernetes"],
      },
      {
        heading: "CI / CD",
        tags: [
          "GitHub Actions",
          "Jenkins",
          "Azure Pipelines",
          "AWS Lambda",
        ],
      },
      {
        heading: "Project management",
        tags: ["Jira", "Azure Boards", "Notion", "Asana"],
      },
      {
        heading: "GenAI",
        tags: [
          "LangGraph",
          "LangChain",
          "N8N",
          "Context engineering",
          "Prompt engineering",
        ],
      },
      {
        heading: "Blockchain",
        tags: ["Solidity", "Foundry", "Hardhat", "web3.js", "ethers"],
      },
      {
        heading: "AI tools",
        tags: ["Claude Code", "Cursor IDE", "ChatGPT"],
      },
    ],
  },

  projects: {
    id: "projects",
    title: "Projects & contracts",
    eyebrow: "Aug 2022 – Apr 2025",
    summary:
      "Startup labs, client platforms, and hackathon builds across logistics, education, Web3, and media.",
    sections: [
      {
        heading: "PureFoodsDelhi.com",
        body: "Serverless, event-driven logistics on AWS for 50+ food brands and 500+ products. SKU management, inventory, agent dashboards, and campaigns automated end to end.",
      },
      {
        heading: "ASBDesign.in",
        body: "Gamified, mobile-first design education with AI-adaptive curriculum and leaderboards. 5,000+ learners. Multilingual job search via RAG chat drove a 30% rise in applications and 70% course completion.",
      },
      {
        heading: "CoinsLive.org",
        body: "Blockchain education dApp with NFT certification. 3,000+ registered users and 450+ active members. Later rebuilt as a React community platform with 250% engagement and 85% content consumption lifts.",
      },
      {
        heading: "Vedic Meet",
        body: "High-performance video streaming on AWS Lambda, FFmpeg, and S3: 45% lower latency, 30% lower cost. iOS app rebuilt in React Native with 50% faster loads.",
      },
      {
        heading: "LesGo",
        body: "Django social campaign system for a decentralized loyalty platform. Capped promotions, real-time engagement analytics, and higher promotional redemptions.",
      },
      {
        heading: "EiLearn (ETHGlobal)",
        body: "48-hour AI-powered Web3 trading education: testnet trading game, AI advisors, on-chain validation, EigenLayer AVS fraud detection, and oracle market data. Team of 4.",
      },
      {
        heading: "DungeonVerse (ShapeCraft Finalist)",
        body: "Decentralized dungeon-crawler builder on Shape. Design, share, and explore custom dungeons with on-chain assets. Top-3 finish. Team of 2.",
      },
      {
        heading: "Hackathon circuit",
        body: "15+ global Web3 hackathons (ETHGlobal, ShapeCraft, Aptos, NEAR, Sonic, Hathora). 20+ proof-of-concept blockchain builds. Top 5 in 6 events.",
      },
    ],
  },

  education: {
    id: "education",
    title: "Education & training",
    eyebrow: "IIT Kanpur · Courses",
    summary:
      "Mechanical Engineering at IIT Kanpur, plus selected AI, cloud, UX, and blockchain programs.",
    sections: [
      {
        heading: "IIT Kanpur",
        body: "B.Tech, Mechanical Engineering (2016 – Dec 2020). Initially enrolled in the Dual Degree program before the pandemic pivot.",
      },
      {
        heading: "Selected courses & training",
        bullets: [
          "Knowledge Graphs for RAG (DeepLearning.AI)",
          "Getting Started with Google Kubernetes Engine (Google Cloud, Coursera)",
          "Google UX Design & Project Management Professional Certificates (Coursera)",
          "An Introduction to Artificial Intelligence (NPTEL, Prof. Mausam)",
          "Deep Learning Specialization (Coursera, Andrew Ng)",
          "Blockchain & Cryptocurrency Program (IIT Madras CCE & Pixeltests)",
          "Advanced Foundry for Solidity (Cyfrin Updraft)",
          "Master Microservices with Spring Boot & Spring Cloud (Udemy)",
        ],
      },
    ],
  },

  research: {
    id: "research",
    title: "Research interests",
    eyebrow: "Applied AI",
    summary:
      "Research-oriented practice: AI systems, RAG, knowledge graphs, agents, and data-driven prototypes.",
    sections: [
      {
        heading: "Focus areas",
        bullets: [
          "Applied Artificial Intelligence and Machine Learning systems",
          "Large Language Models, RAG, and Knowledge Graphs",
          "AI agents for research automation and experimentation",
          "Computational social science and network analysis",
          "Data-driven modeling and system prototyping",
        ],
      },
      {
        heading: "Independent research labs",
        bullets: [
          "AI-driven education platforms with RAG and conversational interfaces",
          "Knowledge graph systems on Neo4j and Pinecone for semantic retrieval",
          "Rapid AI prototypes under hackathon constraints",
          "Blockchain data-integrity work for provenance and fraud detection",
        ],
      },
    ],
  },

  hero: {
    id: "hero",
    title: "Mission Bhavya Bharat",
    eyebrow: "The spine",
    summary:
      "Technology, spirituality, and nation building as one practice. Dive into skills, education, and the products that carry the mission.",
    sections: [
      {
        heading: "What this site is",
        body: "A scroll story of formation. Optional panels hold the engineering depth: skills, roles, education, and research.",
      },
      {
        heading: "Open next",
        body: "Use the chips below each chapter, or open Skills and Education from here.",
      },
    ],
    links: [
      { label: "Open skills", href: "#dive:skills" },
      { label: "Open education", href: "#dive:education" },
    ],
  },

  iit: {
    id: "iit",
    title: "IIT Kanpur",
    eyebrow: "2016 – 2020",
    summary:
      "Admission after clearing JEE. Mechanical Engineering as the foundation for systems thinking.",
    sections: [
      {
        heading: "Degree",
        body: "B.Tech, Mechanical Engineering. Initially enrolled in Dual Degree before the pandemic forced a change of path.",
      },
      {
        heading: "What remained",
        body: "Rigour under pressure, comfort with complex systems, and a bias toward building what lasts.",
      },
    ],
    links: [{ label: "Education & courses", href: "#dive:education" }],
  },

  research_chapter: {
    id: "research_chapter",
    title: "Labs & dual degree",
    eyebrow: "Research turn",
    summary:
      "Core internships and a pull toward mathematics led into a dual B.Tech + M.Tech track.",
    sections: [
      {
        heading: "E-spin Nanotech & core work",
        body: "Hands-on core engineering internships deepened interest in research-grade problems.",
      },
      {
        heading: "Dual path",
        body: "Love for maths and inquiry converted the single degree into a dual B.Tech + M.Tech, until COVID intervened.",
      },
    ],
    links: [{ label: "Research interests", href: "#dive:research" }],
  },

  corona: {
    id: "corona",
    title: "The pandemic pivot",
    eyebrow: "Forced reset",
    summary:
      "The dual degree ended. Plans paused. Industry and startups became the next honest classroom.",
    sections: [
      {
        heading: "What changed",
        body: "Academic continuity broke. The response was to enter full-stack product work and keep learning in production.",
      },
    ],
  },

  contata: {
    id: "contata",
    title: "Contata Solutions",
    eyebrow: "System Analyst · Aug 2021 – Aug 2022",
    summary:
      "First industry chapter: Spring Boot systems, civic platforms, and CI/CD that had to stay up.",
    sections: [
      {
        heading: "Carpooling platform",
        body: "Backend architecture with Spring Boot, MongoDB, Neo4j, and PostgreSQL. Matched 10,000+ riders by location, timing, and preference. Average wait time down 25%.",
      },
      {
        heading: "Civic issue reporting",
        body: "Angular, Spring Boot, and PostgreSQL for citizens filing and tracking 5,000+ municipal requests monthly, with map status and automated routing.",
      },
      {
        heading: "Delivery",
        body: "GitLab CI and Docker pipelines cut release cycles by 60% with zero-downtime deploys for critical services.",
      },
    ],
    links: [
      { label: "Skills", href: "#dive:skills" },
    ],
  },

  startups: {
    id: "startups",
    title: "Into startups",
    eyebrow: "Serving society",
    summary:
      "Leaving comfort for builds that stretch capability: education, logistics, Web3, and community products.",
    sections: [
      {
        heading: "Why startups",
        body: "The brief became society-facing products, not a safer title. Contracts and labs filled the years before Webyalaya and the twin missions.",
      },
    ],
    links: [{ label: "Projects & contracts", href: "#dive:projects" }],
  },

  vrindavan: {
    id: "vrindavan",
    title: "Akhand Vrindavan Vaas",
    eyebrow: "Nishtha",
    summary:
      "Spiritual rootedness and remote engineering in the same life. Work from Vrindavan, not away from the world.",
    sections: [
      {
        heading: "The vow",
        body: "Inclination toward Vrindavan became nishtha: Akhand Vrindavan Vaas. Professional work continued remotely from that ground.",
      },
      {
        heading: "How it shows up",
        body: "TalentSavvy, Webyalaya, Humantra, CoinsLive, and seva all move from this base.",
      },
    ],
  },

  talentsavvy: {
    id: "talentsavvy",
    title: "TalentSavvy",
    eyebrow: "Software Engineer Intern · May 2025 – Sep 2025",
    summary:
      "Full-stack analytics, Python ETL, and a LangGraph CI/CD agent shipped remotely from Vrindavan.",
    sections: [
      {
        heading: "SDLC analytics",
        body: "Full-stack JavaScript apps for real-time lifecycle tracking and cross-team reporting.",
      },
      {
        heading: "ETL & reliability",
        body: "Python workflows for processing and migration, raising pipeline reliability and throughput.",
      },
      {
        heading: "AI CI/CD agent",
        body: "LangGraph agent automating build, test, and deploy. Prompt and context engineering improved generation accuracy. Claude Code and Cursor accelerated delivery.",
      },
    ],
    links: [
      { label: "Skills", href: "#dive:skills" },
      { label: "Research interests", href: "#dive:research" },
    ],
  },

  webyalaya: {
    id: "webyalaya",
    title: "Webyalaya",
    eyebrow: "Co-founder & CTO · Incubated by IIM Lucknow",
    summary:
      "Peer-to-peer learning on three pillars: Human, AI, and Blockchain. Production multi-cloud stack and a growing team.",
    sections: [
      {
        heading: "Product pillars",
        bullets: [
          "Human: community-driven teaching and learning",
          "AI: adaptive, device-aware learning across laptop, mobile, and tablet",
          "Blockchain: decentralized governance so users shape platform rules",
        ],
      },
      {
        heading: "Architecture",
        body: "Next.js on Vercel; AWS ECS/Fargate with Docker; Azure PostgreSQL Flexible Server; LiveKit on Azure VMs for realtime video; S3 and Lightsail; Cloudflare edge; GitHub Actions CI/CD.",
      },
      {
        heading: "Team & ops",
        body: "Cross-functional engineering leadership, intern hiring and orientation, Azure DevOps delivery. Microsoft 365 via Azure startup credits, Startup India recognition, Amazon SES, multi-cloud cost discipline.",
      },
      {
        heading: "Traction notes",
        body: "100+ active users through word of mouth. Team of 10–12 interns. 50/50 gender hiring from inception; woman-led with a female co-founder on product and growth.",
      },
    ],
    links: [{ label: "Skills", href: "#dive:skills" }],
  },

  twin: {
    id: "twin",
    title: "Humantra & CoinsLive",
    eyebrow: "Two missions",
    summary:
      "Clarity within and opportunity without: spiritual guidance and deep-tech literacy for a generation that needs both.",
    sections: [
      {
        heading: "Humantra",
        body: "Practice before preaching. AI-powered spiritual guidance rooted in Sanatan Dharma for purpose-seeking people trapped between past guilt, present distraction, and future anxiety.",
      },
      {
        heading: "CoinsLive",
        body: "Stop nodding. Start knowing. AI, agents, and web3 explained without hype: briefings, tests, webinars, and community for founders, freshers, and curious professionals.",
      },
    ],
    links: [
      { label: "humantra.yoga", href: "https://humantra.yoga/" },
      { label: "coinslive.in", href: "https://coinslive.in/" },
      { label: "Humantra detail", href: "#dive:humantra" },
      { label: "CoinsLive detail", href: "#dive:coinslive" },
    ],
  },

  humantra: {
    id: "humantra",
    title: "Humantra",
    eyebrow: "Practice before preaching",
    summary:
      "A human with mantra. Vedic wisdom, Ayurveda, and Yoga as a daily centre of gravity, with technology in service of lived practice.",
    sections: [
      {
        heading: "The problem",
        body: "People perform a successful life and still meet the quiet question: why am I doing any of this? Past regret, present distraction, future anxiety.",
      },
      {
        heading: "The system",
        body: "Focused repetition of divine names, seva as expression of practice, and guidance that is trustworthy because it is lived first.",
      },
      {
        heading: "Building now",
        body: "An AI counselor rooted in authentic Sanatan Dharma: personalised, grounded, built for modern life.",
      },
    ],
    links: [{ label: "Visit humantra.yoga", href: "https://humantra.yoga/" }],
  },

  coinslive: {
    id: "coinslive",
    title: "CoinsLive",
    eyebrow: "Stop nodding. Start knowing.",
    summary:
      "Deep technology explained in simple language for anyone who has used a smartphone.",
    sections: [
      {
        heading: "Who it serves",
        bullets: [
          "Founders who need to understand what their technical team is building",
          "Freshers preparing for placement with adaptive tests",
          "Curious professionals who want roadmaps into new technology",
        ],
      },
      {
        heading: "What ships",
        body: "Weekly briefings, interview MCQ banks, live webinars with FAANG and startup techies, and a community that values clear thinking.",
      },
    ],
    links: [{ label: "Visit coinslive.in", href: "https://coinslive.in/" }],
  },

  seva: {
    id: "seva",
    title: "Seva in Vrindavan",
    eyebrow: "Social initiatives",
    summary:
      "Ventures share the calendar with service on the ground, including Vriksharopan.",
    sections: [
      {
        heading: "Vriksharopan",
        body: "Tree plantation in Vrindavan: care for the land that holds the nishtha.",
      },
      {
        heading: "Why it matters",
        body: "Mission Bhavya Bharat is incomplete if it only ships products. Seva keeps the work tied to place and people.",
      },
    ],
  },

  vision: {
    id: "vision",
    title: "Gaushala & gurukul",
    eyebrow: "Ahead",
    summary:
      "Reviving living systems for sustainable industry and holistic education.",
    sections: [
      {
        heading: "Direction",
        body: "Gaushala and gurukul as models where livelihood, learning, and land stewardship grow together.",
      },
    ],
  },

  close: {
    id: "close",
    title: "Walk with the mission",
    eyebrow: "Connect",
    summary:
      "Build, learn, or simply say hello. Skills, education, and research are open in the side panel.",
    sections: [
      {
        heading: "Ways in",
        bullets: [
          "Download the CV",
          "Write through the contact form",
          "Follow on LinkedIn and Instagram",
          "Visit Humantra and CoinsLive",
        ],
      },
    ],
    links: [
      { label: "Skills", href: "#dive:skills" },
      { label: "Education", href: "#dive:education" },
      { label: "Research", href: "#dive:research" },
    ],
  },
};

/** Primary dive id for each story chapter, plus related chips. */
export const chapterDiveMap: Record<
  string,
  { primary: string; related?: string[] }
> = {
  hero: { primary: "hero", related: ["skills", "education"] },
  iit: { primary: "iit", related: ["education", "research"] },
  research: {
    primary: "research_chapter",
    related: ["research", "education", "skills"],
  },
  corona: { primary: "corona", related: ["contata"] },
  contata: { primary: "contata", related: ["skills"] },
  /** Projects & contracts only live here */
  startups: { primary: "startups", related: ["projects"] },
  vrindavan: { primary: "vrindavan", related: ["seva", "talentsavvy"] },
  talentsavvy: {
    primary: "talentsavvy",
    related: ["skills", "research"],
  },
  webyalaya: { primary: "webyalaya", related: ["skills"] },
  twin: {
    primary: "twin",
    related: ["humantra", "coinslive", "skills"],
  },
  seva: { primary: "seva", related: ["vrindavan", "vision"] },
  vision: { primary: "vision", related: ["seva", "close"] },
  close: {
    primary: "close",
    related: ["skills", "education", "research"],
  },
};
