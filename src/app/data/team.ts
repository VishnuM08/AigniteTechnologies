export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initial: string;
  bio: string;
  additionalBio?: string;
  linkedin: string;
  gradient: string;
  active: boolean;
}

export const teamData: TeamMember[] = [
  {
    id: "vishnu",
    name: "Vishnu M",
    role: "FOUNDER & CEO",
    initial: "V",
    bio: "Leading Aignite Technologies from India, Vishnu brings a unique vision to software development— one rooted in clarity, intentionality, and respect for the people who use our products.",
    additionalBio: "With years of experience in building web, mobile, and AI-powered applications, his approach combines technical excellence with a deep understanding of human needs.",
    linkedin: "https://www.linkedin.com/in/vishnum08/",
    gradient: "from-[#0071e3] to-[#0077ed]",
    active: true,
  },
  {
    id: "lavanya",
    name: "Lavanya L",
    role: "CO-FOUNDER, ADVISOR & QA LEAD",
    initial: "L",
    bio: "Instrumental to the founding vision of Aignite Technologies, Lavanya handles the main testing operations and provides strategic guidance that shapes our long-term direction.",
    additionalBio: "Her insights ensure that as we scale our engineering efforts, we remain deeply committed to building human-centered, impactful digital products without compromise.",
    linkedin: "https://www.linkedin.com/in/lavanya2002/",
    gradient: "from-[#34c759] to-[#28a745]",
    active: false,
  },
];
