export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit 2025",
    slug: "react-summit-2025",
    location: "Amsterdam, NL",
    date: "April 14, 2025",
    time: "9:00 AM CET",
  },
  {
    image: "/images/event2.png",
    title: "AI & Cloud Expo",
    slug: "ai-cloud-expo",
    location: "San Francisco, CA",
    date: "May 20, 2025",
    time: "10:00 AM PST",
  },
  {
    image: "/images/event3.png",
    title: "Next.js Conf",
    slug: "nextjs-conf",
    location: "Online",
    date: "October 24, 2025",
    time: "10:00 AM PST",
  },
  {
    image: "/images/event4.png",
    title: "Global Dev Summit",
    slug: "global-dev-summit",
    location: "London, UK",
    date: "June 15, 2025",
    time: "9:00 AM BST",
  },
  {
    image: "/images/event5.png",
    title: "Web3 Hackathon",
    slug: "web3-hackathon",
    location: "Berlin, DE",
    date: "July 10, 2025",
    time: "8:00 AM CET",
  },
  {
    image: "/images/event6.png",
    title: "CyberSecurity World",
    slug: "cybersecurity-world",
    location: "New York, NY",
    date: "August 5, 2025",
    time: "9:00 AM EST",
  },
];
