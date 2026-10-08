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
  logoLight: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298519/blog_assets/vitucfftjlaasihn5flv.png",
  logoDark: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298511/blog_assets/mbhrnk2zfumye1b4v1d4.png",
  logo: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791298519/blog_assets/vitucfftjlaasihn5flv.png"
};

export const CONTACT_INFO = {
  phone: "+234 905 304 4410",
  email: "speakto@staymedia.ng",
  supportEmail: "speakto@staymedia.ng",
  whatsappCommunityUrl: "https://whatsapp.com/channel/0029VbCYW8jGpLHWfbeNrz2W",
  wpAuditEndpoint: "https://legacy.staymedia.ng/wp-json/staymedia/v1/audit"
};

export const TRIAL_SERVICE_DATA = {
  headline: "Experience STAY MEDIA Digital Growth Service For Free",
  subtitle: "Help your business get seen, get engaged and get more customers with the right digital solution",
  ctaText: "CLAIM FREE TRIAL",
  scarcityText: "We only accept limited number of businesses per month",
  whatsappUrl: "https://whatsapp.com/channel/0029VbCYW8jGpLHWfbeNrz2W",
  wpAuditEndpoint: "https://legacy.staymedia.ng/wp-json/staymedia/v1/audit",
  
  // VERIFIED 3D EBOOK COVER ASSET
  ebookCover: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1791464162/blog_assets/cezjegi6einxtdj5w4t4.jpg",
  
  tabs: [
    { id: "cases", label: "Cases" },
    { id: "how-it-works", label: "How it works" },
    { id: "faqs", label: "FAQs" }
  ],

  drawerNarrative: "STAY MEDIA is a digital growth partner focusing on growing SMEs/SMBs, startups, local service providers/vendors, and established companies’ visibility, engagement, and revenue significantly through digital solutions, including websites, mobile apps, landing pages, paid advertising, CRM systems, and conversion-focused marketing strategies.",

  caseCards: [
    { id: "phelzink", client: "Phelzink Productions", icon: "heart" },
    { id: "darader", client: "Darader Homes", icon: "user" },
    { id: "hagios", client: "Hagios Invasions Global", icon: "target" },
    { id: "unstoppable", client: "Unstoppable Prints", icon: "phone" }
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

  faqs: [
    { q: "Is the trial really free?", a: "Yes, 100% free. No payment, credit card, or financial commitment is required to apply or experience the 7-day sprint." },
    { q: "Does every business qualify?", a: "We review each application carefully to ensure we can deliver tangible commercial value within 7 days." },
    { q: "Am I required to continue after the trial?", a: "No. There is zero obligation. If you love the deliverables, you can choose to continue on a paid growth plan." },
    { q: "Which services are eligible for the trial?", a: "Digital Presence, Web Engineering, Branding & Creative, Paid Acquisition, Sales Automation, Analytics, and Strategy." },
    { q: "What happens after the 7 days?", a: "We review the deliverables together and present a tailored roadmap if you wish to retain us." },
    { q: "What do I need to provide?", a: "Basic details about your business, your current digital assets, and prompt feedback during the sprint." },
    { q: "Do I need to pay for advertising?", a: "If you choose a paid ads trial sprint, ad spend is paid directly to Meta/Google while our management is free." },
    { q: "How quickly will my trial start?", a: "Approved cohorts begin within 48 to 72 hours of initial onboarding." },
    { q: "Can I try more than one service?", a: "We focus on one primary growth bottleneck during the 7 days to maximize impact." }
  ],

  // 4 REAL VERIFIED GOOGLE REVIEWS (VERBATIM FROM SCREENSHOTS)
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
    trialServices: [
      "Basic Landing Page",
      "Basic Social Media Management",
      "Basic Creative Designs",
      "Basic CRM set up",
      "Basic Analytics",
      "Basic Growth Strategy",
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
