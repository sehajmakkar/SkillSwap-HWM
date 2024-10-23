import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  zoom,
  file02,
  tele,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  whatsapp,
  plusSquare,
  googlemeet,
  skillshare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Doubts",
    url: "/doubts",
  },
  {
    id: "1",
    title: "Study Tools",
    url: "/studytools",
  },
  {
    id: "2",
    title: "Pricing",
    url: "/pricing",
  },
  {
    id: "3",
    title: "Rewards",
    url: "/rewards",
  },
  {
    id: "4",
    title: "New account",
    url: "/signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Log in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Siddharth",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "";

export const collabContent = [
  {
    id: "0",
    title: "Flexible Access to Help",
    text: collabText,
  },
  {
    id: "1",
    title: "Cost Effective Learning",
  },
  {
    id: "2",
    title: "Community Driven",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Zoom",
    icon: zoom,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Whatsapp",
    icon: whatsapp,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "GoogleMeet",
    icon: googlemeet,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Tele",
    icon: tele,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Skillshare",
    icon: skillshare,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Free",
    description: "Limited query posting per month",
    price: "0",
    features: [
      "20 Credit points per month",
      "Limited number of doubts",
      "Basic Profile editiing features",
    ],
  },
  {
    id: "1",
    title: "Monthly",
    description: "Priority support",
    price: "20",
    features: [
      "80 credit points per month",
      "Customizable profile features unlocked",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Yearly",
    description: "Dedicated account, Mentorship program",
    price: "200",
    features: [
      "Gold membership for highest priority",
      "Unlimited doubt posting",
      "Personalized recommendations",
      "Early access to new features",
      "SkillSwap Mentorship Program",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Peer-to-Peer Learning",
    text: "Students can learn collaboratively, exchanging knowledge and solving doubts with their peers, promoting deeper understanding",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Doubt Solving",
    text: "Users can post doubts anytime and get assistance without needing to stick to strict schedules or formal tutoring sessions",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Personalized Learning",
    text: "Subscribers can enjoy personalized learning experiences with features like video call and one-to-one chat",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Study Tools",
    text: "Users get to enhance their learning experience through  whiteboard, timer, All-chat and Group Video calls",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Cost Effective",
    text: "With affordable subscriptions that are both monthly and yearly,user gets access to variety of tools at simplified costs",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Rewards and Credits",
    text: "Users earn credits for providing answers, which can be redeemed for various rewards",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

export const ACTIONS = {
  SELECT: "SELECT",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  SCRIBBLE: "SCRIBBLE",
  ARROW: "ARROW",
  ERASER: "eraser",
};
