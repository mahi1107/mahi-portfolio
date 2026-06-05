export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlight?: string;
  size: 'large' | 'medium' | 'small';
  imageUrl?: string;
  category?: string;
  teamIndicator?: string;
  status?: 'Live' | 'In Development' | 'Case Study';
  metrics?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1-10
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  stat?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  bio: string;
  detailedBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  availability: string;
  stats: { label: string; value: string }[];
  skillsData: SkillCategory[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  certifications: CertificateItem[];
  journey: JourneyMilestone[];
}

export const portfolioData: PortfolioData = {
  name: "Mahi Singh",
  headline: "B.Tech CSE Student & Full-Stack Developer",
  bio: "A motivated Computer Science student who loves building full-stack web applications, exploring smart AI features, and creating smooth, user-friendly designs.",
  detailedBio: "I am currently pursuing my B.Tech in Computer Science. I love coding, building modern websites, and working with smart AI tools. Rather than just making things look pretty, I focus on writing clean code, building reliable server systems, and ensuring everything runs fast and smooth.",
  location: "India",
  email: "mahimanoj1107@gmail.com",
  github: "https://github.com/mahi1107",
  linkedin: "https://linkedin.com/in/mahi-singh-b772382b4",
  availability: "Available for Projects & Collaboration",
  stats: [
    { label: "DSA Solutions", value: "500+" },
    { label: "Integrated Builds", value: "15+" },
    { label: "Hackathon Silver", value: "2nd" },
    { label: "Active Commits", value: "400+" }
  ],
  skillsData: [
    {
      category: "Languages",
      skills: [
        { name: "Python", level: 9 },
        { name: "C / C++", level: 8 },
        { name: "SQL", level: 8 },
        { name: "JavaScript", level: 9 }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js", level: 9 },
        { name: "Tailwind CSS", level: 9 },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 8 },
        { name: "Express.js", level: 9 },
      ]
    },
    {
      category: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 8 },
        { name: "Git & GitHub", level: 9 },
        { name: "Docker", level: 7 }
      ]
    },
    {
      category: "Currently Learning",
      skills: [
        { name: "Java & DSA", level: 8 },
        { name: "System Design", level: 6 },
        { name: "AWS Cloud Foundations", level: 7 }
      ]
    }
  ],
  projects: [
    {
      id: "accident-hotspot",
      title: "Accident Hotspot Detection System",
      description: "A smart map application that uses location clustering to find high-risk traffic zones and alert travelers in real time.",
      techStack: ["React", "Python", "Flask", "PostgreSQL", "Leaflet Maps", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      featured: true,
      highlight: "Location mapping & safety alerts",
      size: "large",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
      category: "Geospatial & Safety",
      teamIndicator: "Solo Project",
      status: "In Development",
      metrics: ["10K+ map records processed", "92% route optimization", "Real-time clustering engine"]
    },
    {
      id: "traveloop-ai",
      title: "Traveloop AI Travel Planner",
      description: "An AI-powered travel planner that designs custom trip routes, suggests popular local spots, and sets up daily schedules automatically.",
      techStack: ["Next.js", "Gemini LLM", "MongoDB", "Framer Motion", "Tailwind"],
      githubUrl: "https://github.com/sk7dixit/Oddo_Hack",
      liveUrl: "#",
      featured: false,
      highlight: "Smart AI trip planner",
      size: "medium",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      category: "Artificial Intelligence",
      teamIndicator: "Hackathon Build",
      status: "In Development",
      metrics: ["Gemini 1.5 Pro integration", "Multi-destination routing", "Adaptive scheduling"]
    },
    {
      id: "vaanidoc",
      title: "VaaniDoc",
      description: "An AI-powered healthcare documentation assistant that converts doctor-patient conversations into structured medical records, reducing administrative workload and improving clinical efficiency.",
      techStack: ["Next.js", "Python", "FastAPI", "OpenAI", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "#",
      featured: true,
      highlight: "AI medical transcription & clinical documentation",
      size: "large",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      category: "Healthcare AI",
      teamIndicator: "Solo Project",
      status: "In Development",
      metrics: [
        "95%+ transcription accuracy",
        "Automated SOAP note generation",
        "Real-time voice-to-medical-record conversion"
      ]
    }

  ],
  achievements: [
    {
      id: "hackathon-runner-up",
      title: "Vadodara Hackathon Runner-Up",
      organization: "Vadodara City Council Committee",
      date: "2025",
      description: "Won 2nd place out of 720+ teams. Designed and showed a smart public transport routing app that helps passengers find the best way to travel.",
      stat: "2nd / 720+"
    },
    {
      id: "leetcode-badge",
      title: "LeetCode Daily Active Streak",
      organization: "LeetCode Platform",
      date: "Ongoing",
      description: "Solved coding challenges daily. Completed over 500 programming problems focused on logic and algorithms.",
      stat: "200+ Solved"
    }
  ],
  certifications: [
    {
      id: "aws-cloud",
      title: "AWS Cloud Practitioner Foundations",
      issuer: "AWS Academy",
      date: "2025",
      credentialUrl: "#"
    },
    {
      id: "nptel-networks",
      title: "Network Engineering Certification (Elite + Silver)",
      issuer: "NPTEL / IIT Kharagpur",
      date: "2024",
      credentialUrl: "#"
    }
  ],
  journey: [
    {
      year: "2023",
      title: "Started B.Tech CSE",
      description: "Started my B.Tech degree in Computer Science. Learned the basics of programming in C and C++, and how database tables work."
    },
    {
      year: "2024",
      title: "Web Development",
      description: "Learned how to build modern websites using JavaScript, Node.js, Express, React, and Tailwind CSS."
    },
    {
      year: "2025",
      title: "AI & Mapping Apps",
      description: "Built advanced web applications that connect to AI models and maps, including my Accident Hotspot app."
    },
    {
      year: "Current",
      title: "Algorithms & Practice",
      description: "Practicing coding algorithms in Java, learning how to design solid systems, and building helpful projects."
    }
  ]
};
