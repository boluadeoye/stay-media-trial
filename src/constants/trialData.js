export function decodeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&#8217;|&#039;|&apos;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export const TRIAL_ASSETS = {
  favicon: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791537638/blog_assets/cpogwbxbiqxcmuf9oe70.jpg",
  monogramBadge: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791537638/blog_assets/cpogwbxbiqxcmuf9oe70.jpg",
  logoLight: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298519/blog_assets/vitucfftjlaasihn5flv.png",
  logoDark: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298511/blog_assets/mbhrnk2zfumye1b4v1d4.png",
  logo: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298519/blog_assets/vitucfftjlaasihn5flv.png"
};

export const CONTACT_INFO = {
  socialHandle: "@staymediang",
  email: "speakto@staymedia.ng",
  supportEmail: "speakto@staymedia.ng",
  whatsappCommunityUrl: "https://whatsapp.com/channel/0029VbCYW8jGpLHWfbeNrz2W",
  wpAuditEndpoint: "https://legacy.staymedia.ng/wp-json/staymedia/v1/audit"
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/staymediang",
  instagram: "https://instagram.com/staymediang",
  x: "https://x.com/staymediang",
  threads: "https://threads.net/@staymediang",
  linkedin: "https://linkedin.com/company/staymediang",
  youtube: "https://youtube.com/@staymediang",
  tiktok: "https://tiktok.com/@staymediang"
};

export const MULTI_COMMUNITY_CHANNELS = [
  {
    name: "WhatsApp VIP",
    desc: "Instant growth playbooks & sprint cohort announcements",
    url: "https://whatsapp.com/channel/0029VbCYW8jGpLHWfbeNrz2W",
    badge: "Most Active"
  },
  {
    name: "Instagram Community",
    desc: "Exclusive broadcast channel & behind-the-scenes teardowns",
    url: "https://www.instagram.com/channel/AbZh7nWRPGkdMFBy/",
    badge: "Visual Hub"
  },
  {
    name: "YouTube Community",
    desc: "In-depth video walkthroughs and funnel teardowns",
    url: "https://youtube.com/@staymediang/community?si=1TeKsZhs2NiPipyl",
    badge: "Video Guides"
  },
  {
    name: "X (Twitter) Channel",
    desc: "Daily conversion breakdowns & founder perspectives",
    url: "https://x.com/staymediang",
    badge: "Real-Time"
  }
];

export const TRIAL_BENEFITS = [
  {
    id: "less-risk",
    title: "Get started with less risk",
    desc: "Explore the selected service before deciding on further investment."
  },
  {
    id: "relevant-support",
    title: "Receive business-relevant support",
    desc: "Get a solution aligned with your stated needs and goals."
  },
  {
    id: "new-opportunities",
    title: "Discover new opportunities",
    desc: "Identify ways to improve your visibility, customer experience, or sales process."
  },
  {
    id: "informed-decision",
    title: "Make a more informed decision",
    desc: "Understand how the service fits into your broader business growth plans."
  }
];

export const CATEGORIZED_FAQS = [
  {
    id: "about",
    name: "About Stay Media",
    questions: [
      {
        q: "What does Stay Media do?",
        a: "Stay Media is a Digital Growth Partner. We help SMEs, startups, and established companies identify commercial growth roadblocks and engineer bespoke digital presence, custom web platforms, brand visual identities, and customer acquisition funnels."
      },
      {
        q: "Are you a digital marketing agency?",
        a: "No. Generic agencies sell vanity service menus (posts, clicks, and impressions). We operate as an aligned commercial growth partner focusing on revenue-grade conversion infrastructure, qualified pipeline acquisition, and retained business value."
      },
      {
        q: "What does 'Digital Growth Partner' mean?",
        a: "It means we do not deliver disconnected tasks. We diagnose your customer acquisition leaks first, build the commercial solution, and partner with your team to optimize real commercial metrics."
      }
    ]
  },
  {
    id: "sprint",
    name: "The 7-Day Sprint",
    questions: [
      {
        q: "Is the trial really free?",
        a: "Yes, 100% free. No payment, credit card, or financial commitment is required to apply or experience the 7-day sprint."
      },
      {
        q: "How quickly will my sprint start after approval?",
        a: "Approved cohorts begin within 48 to 72 hours of initial onboarding and access confirmation."
      },
      {
        q: "What do I need to provide for the sprint to begin?",
        a: "Basic details about your business goals, your current digital assets (logos, copy, access credentials), and prompt feedback during the 7-day window."
      }
    ]
  },
  {
    id: "eligibility",
    name: "Eligibility & Scope",
    questions: [
      {
        q: "Does every business qualify?",
        a: "We review each application carefully to ensure we can deliver tangible commercial value within 7 days. We prioritize businesses with active commercial operations and clear growth goals."
      },
      {
        q: "Can I try more than one service during the sprint?",
        a: "We focus on one primary commercial bottleneck during the 7 days to maximize execution speed and tangible impact."
      },
      {
        q: "What is excluded from the free sprint?",
        a: "Full enterprise custom software platforms, extensive multi-brand redesigns, unlimited revision rounds, and ongoing paid campaign management are excluded."
      }
    ]
  },
  {
    id: "costs",
    name: "Pricing & Ad Spend",
    questions: [
      {
        q: "Do I need to pay for advertising budget during the trial?",
        a: "If you choose a paid advertising sprint deliverable, ad spend is funded directly by you to Meta or Google, while our campaign engineering and strategy management is completely free."
      },
      {
        q: "Are there any hidden software costs?",
        a: "Zero hidden agency fees. Premium third-party software, domain names, or hosting subscriptions remain under client ownership."
      }
    ]
  },
  {
    id: "continuation",
    name: "Completion & Retainers",
    questions: [
      {
        q: "Am I required to continue after the trial?",
        a: "No. There is zero obligation. If you love the deliverables, you can choose to continue on a paid partner retainer plan."
      },
      {
        q: "What happens after the 7 days conclude?",
        a: "We review the deliverables together during a formal handover session and present a tailored roadmap if you wish to retain us for long-term growth."
      }
    ]
  }
];

export const EBOOK_DOWNLOAD_URL = "https://mcusercontent.com/f1812bfda6c4733ced1073d3c/files/d4465044-af56-758d-d297-82390b50707d/Social_Media_Audit_Light_Theme.pdf";

export const TRIAL_SERVICE_DATA = {
  headline: "Experience STAY MEDIA Digital Growth Sprint For Free",
  subtitle: "Help your business get seen, get engaged and get more customers with the right digital solution",
  ctaText: "CLAIM FREE TRIAL",
  scarcityText: "We only accept limited number of businesses per month",
  whatsappUrl: "https://whatsapp.com/channel/0029VbCYW8jGpLHWfbeNrz2W",
  wpAuditEndpoint: "https://legacy.staymedia.ng/wp-json/staymedia/v1/audit",
  ebookDownloadUrl: EBOOK_DOWNLOAD_URL,

  ebookCover: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791464162/blog_assets/cezjegi6einxtdj5w4t4.jpg",

  tabs: [
    { id: "benefits", label: "Benefits" },
    { id: "how-it-works", label: "How it works" },
    { id: "cases", label: "Cases" }
  ],

  caseCards: [
    { id: "phelzink-productions", slug: "phelzink-productions", client: "Phelzink Productions", icon: "heart", url: "https://staymedia.ng/#case-studies/phelzink-productions" },
    { id: "darader-homes", slug: "darader-homes", client: "Darader Homes", icon: "user", url: "https://staymedia.ng/#case-studies/darader-homes" },
    { id: "hagios-invasions-global", slug: "hagios-invasions-global", client: "Hagios Invasions Global", icon: "target", url: "https://staymedia.ng/#case-studies/hagios-invasions-global" },
    { id: "unstoppable-prints", slug: "unstoppable-prints", client: "Unstoppable Prints", icon: "phone", url: "https://staymedia.ng/#case-studies/unstoppable-prints" }
  ],

  sprintSteps: [
    {
      num: "01",
      title: "Tell Us About Your Business",
      desc: "Complete the short application and tell us what you do and what you'd like to improve.",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1790605742/blog_assets/pghqyyvrstrrw0pfjax1.jpg"
    },
    {
      num: "02",
      title: "We Identify the Right Service",
      desc: "We review your needs and select the most suitable service for your 7-day trial.",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1790605746/blog_assets/cfpzprp41sqcipjzvgfe.jpg"
    },
    {
      num: "03",
      title: "We Deliver Your Trial",
      desc: "Our team gets to work and delivers the agreed service sprint for 7 days.",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1790605752/blog_assets/ndyl37kuzkyi8zae2ura.jpg"
    },
    {
      num: "04",
      title: "You Experience the Difference",
      desc: "See the quality, process and potential commercial impact of working with STAY MEDIA.",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1790605760/blog_assets/xkfm5txwgx8irz5mgsoj.jpg"
    },
    {
      num: "05",
      title: "Continue If You Want",
      desc: "If you love the results, we'll recommend the best plan to help you keep growing.",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1790605766/blog_assets/bpoaregoqgsyofgypsx5.jpg"
    }
  ],

  googleReviews: [
    {
      author: "Kefee HP",
      role: "Local Guide · 6 reviews",
      rating: 5,
      quote: "Their service was excellent, with fast delivery and outstanding professionalism in communication."
    },
    {
      author: "Ibrahim Adeleke",
      role: "Verified Client · 2 reviews",
      rating: 5,
      quote: "An amazing team who gives there utmost best to serve there clients right. I had a great experience working with them."
    },
    {
      author: "Cargo Link",
      role: "Logistics Enterprise · 1 review",
      rating: 5,
      quote: "We’ve had a great experience working with this team. They are reliable, responsive, and deliver quality work on time. Their attention to detail and willingness to understand our needs made the entire process smooth. We highly recommend their services to anyone looking for a credible and efficient website partner."
    },
    {
      author: "Faith Chiazor (Fidel)",
      role: "Verified Client · 3 reviews",
      rating: 5,
      quote: "He does most of my graphic works and they are superb. I've been using his service for about 4 years now and he is consistent."
    }
  ],

  formOptions: {
    businessStages: ["Startup", "Growing Business", "Established Business", "Organization"],
    biggestChallenges: [
      "low customers", "zero website", "website upgrade", "low leads",
      "poor branding/creative", "poor sales/follow-up", "manual business processes",
      "poor marketing performance", "I'm not sure"
    ],
    // EXACT OPTION VALUE: "Virtual Assistant" (TITLE CASE, NO "BASIC")
    trialServices: [
      "Basic Landing Page",
      "Basic Social Media Management",
      "Basic Creative Designs",
      "Virtual Assistant",
      "I'm not sure, recommend one"
    ],
    whyInterested: [
      "I need more customers", "I want to improve my online presence",
      "I'm launching something", "My current provider isn't delivering",
      "I want to test STAY MEDIA before committing", "I need help with a specific project", "Other"
    ],
    paidPlan: ["Yes", "Maybe", "I'm only exploring"]
  }
};
