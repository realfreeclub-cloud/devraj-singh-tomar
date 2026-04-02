export interface Venture {
  slug: string;
  title: string;
  shortDesc: string;
  category: "Education" | "Media" | "Technology" | "Design" | "Services";
  description: string;
  fullContent?: string;
  role?: string;
  expertise?: string[];
  vision?: string;
  features?: string[];
  keywords: string[];
  dateISO: string;
}

export const ventures: Venture[] = [
  {
    slug: "career-avsar",
    title: "M/S Career Avsar",
    shortDesc: "Providing technology solutions and Printing services.",
    category: "Services",
    description: "Devraj Singh Tomar is a skilled IT Professional and Entrepreneur, currently serving as Partner & IT Project Head at M/S Career Avsar, where he plays a key role in driving digital innovation and managing technology-driven initiatives.",
    role: "Partner & IT Project Head",
    fullContent: `
      <p>Devraj Singh Tomar is a skilled IT Professional and Entrepreneur, currently serving as Partner & IT Project Head at M/S Career Avsar, where he plays a key role in driving digital innovation and managing technology-driven initiatives.</p>
      
      <p>With over 6+ years of experience in the IT industry since 2018, Devraj has built a strong foundation in project management, web development, and digital product execution. At Career Avsar, he is responsible for overseeing technical operations, leading development teams, and ensuring the successful delivery of scalable digital solutions.</p>
      
      <h3>Role at M/S Career Avsar</h3>
      <p>At M/S Career Avsar, Devraj Singh Tomar contributes strategically and technically to the organization’s growth. His role includes:</p>
      <ul>
        <li>Leading IT projects from concept to execution</li>
        <li>Managing development teams and workflows</li>
        <li>Designing and implementing scalable web platforms</li>
        <li>Improving system performance and user experience</li>
        <li>Aligning technology with business goals</li>
      </ul>
      <p>His leadership ensures that Career Avsar continues to provide efficient and innovative solutions in the career guidance and digital services domain.</p>

      <h3>Professional Expertise</h3>
      <p>Devraj brings a combination of technical knowledge and business understanding, making him a valuable asset in both development and strategic decision-making.</p>
      <strong>Core Skills:</strong>
      <ul>
        <li>IT Project Management</li>
        <li>Web & Application Development</li>
        <li>UI/UX Optimization</li>
        <li>Digital Product Development</li>
        <li>Startup Strategy & Execution</li>
      </ul>

      <h3>Career Journey</h3>
      <p>Starting his journey in 2018, Devraj Singh Tomar has worked on multiple real-world projects and collaborated with various organizations. His experience across different domains has helped him develop a practical approach to solving complex technical and business challenges.</p>
      <p>Over time, he expanded into partnerships and leadership roles, contributing to multiple ventures and continuously working towards building impactful digital platforms.</p>

      <h3>Vision & Approach</h3>
      <p>Devraj believes in creating technology solutions that are not only functional but also scalable and user-focused. His approach combines innovation, efficiency, and strategic planning to deliver results that drive growth for businesses and individuals.</p>
    `,
    keywords: [
      "Devraj Singh Tomar Career Avsar",
      "Devraj Tomar IT Project Head",
      "Devraj Singh Tomar Partner Career Avsar",
      "IT Project Manager Devraj Tomar India",
      "Career Avsar IT Head Devraj",
      "Devraj Singh Tomar Entrepreneur India"
    ],
    dateISO: "2024-04-02"
  },
  {
    slug: "lotus-loop-media-solutions",
    title: "Lotus Loop Media Solutions",
    shortDesc: "Delivering media and digital services.",
    category: "Services",
    description: "Devraj Singh Tomar is a dedicated IT Professional and Entrepreneur, currently working as an IT Project Manager at Lotus Loop Media Solutions, where he leads digital initiatives and oversees the execution of technology-driven projects.",
    role: "IT Project Manager",
    fullContent: `
      <p>Devraj Singh Tomar is a dedicated IT Professional and Entrepreneur, currently working as an IT Project Manager at Lotus Loop Media Solutions, where he leads digital initiatives and oversees the execution of technology-driven projects.</p>
      
      <p>With hands-on experience since 2018, Devraj has developed strong expertise in managing complex IT projects, building scalable digital platforms, and ensuring smooth coordination between technical teams and business objectives.</p>
      
      <h3>Role at Lotus Loop Media Solutions</h3>
      <p>At Lotus Loop Media Solutions, Devraj Singh Tomar plays a crucial role in delivering high-quality digital and media solutions. His responsibilities include:</p>
      <ul>
        <li>Managing end-to-end IT projects</li>
        <li>Coordinating with developers, designers, and stakeholders</li>
        <li>Planning and executing web and digital platforms</li>
        <li>Ensuring timely delivery and performance optimization</li>
        <li>Maintaining quality standards across all technical outputs</li>
      </ul>
      <p>His structured approach helps streamline workflows and ensures that projects are completed efficiently and effectively.</p>

      <h3>Key Contributions</h3>
      <ul>
        <li>Successfully handled multiple digital and web-based projects</li>
        <li>Improved project execution strategies and team coordination</li>
        <li>Contributed to the development of scalable and user-friendly platforms</li>
        <li>Enhanced overall productivity through better planning and execution</li>
      </ul>

      <h3>Professional Expertise</h3>
      <p>Devraj combines technical knowledge with management skills, making him a strong leader in IT project execution.</p>
      <strong>Core Areas of Expertise:</strong>
      <ul>
        <li>IT Project Management</li>
        <li>Web Development & Digital Solutions</li>
        <li>UI/UX Optimization</li>
        <li>Team Management & Coordination</li>
        <li>Product Development & Execution</li>
      </ul>

      <h3>Experience & Growth</h3>
      <p>Since beginning his career in 2018, Devraj Singh Tomar has worked on diverse projects across industries. His role at Lotus Loop Media Solutions reflects his ability to handle responsibilities at both technical and managerial levels.</p>

      <h3>Vision & Approach</h3>
      <p>Devraj focuses on delivering technology solutions that are efficient, scalable, and aligned with business needs. His goal is to create impactful digital experiences while maintaining high standards of execution.</p>
    `,
    keywords: [
      "Devraj Singh Tomar Lotus Loop Media Solutions",
      "Devraj Tomar IT Project Manager",
      "Lotus Loop Media IT Head Devraj",
      "Devraj Singh Tomar digital solutions",
      "Devraj Tomar web development expert India",
      "IT Project Manager Devraj Singh Tomar"
    ],
    dateISO: "2024-04-02"
  },
  {
    slug: "txn-learning",
    title: "TxnLearning",
    shortDesc: "An educational platform designed to enhance digital learning experiences.",
    category: "Education",
    description: "An innovative digital learning platform providing comprehensive educational resources and tech-driven training solutions.",
    keywords: ["TxnLearning", "Digital Learning", "Education Tech"],
    dateISO: "2023-12-01"
  },
  {
    slug: "lce-computer",
    title: "LCE Computer",
    shortDesc: "A project focused on computer education and training solutions.",
    category: "Education",
    description: "Empowering students through advanced computer education and professional technical training programs.",
    keywords: ["LCE Computer", "Computer Education", "Tech Training"],
    dateISO: "2023-10-15"
  },
  {
    slug: "mrm-al-quran",
    title: "Mrm Al Quran",
    shortDesc: "A meaningful initiative combining technology with religious education.",
    category: "Education",
    description: "Integrating modern technology with religious studies to make learning more accessible and interactive.",
    keywords: ["Mrm Al Quran", "Religious Tech", "Interactive Learning"],
    dateISO: "2023-08-20"
  },
  {
    slug: "gyanmitra-news",
    title: "Gyanmitra News",
    shortDesc: "A digital news platform delivering informative and engaging content.",
    category: "Media",
    description: "A fast-growing digital news network focusing on accurate reporting and diverse story coverage.",
    keywords: ["Gyanmitra News", "Digital News", "Media Platform"],
    dateISO: "2023-06-10"
  },
  {
    slug: "abhivyakti-news",
    title: "Abhivyakti News",
    shortDesc: "A media-based project focusing on expression and communication.",
    category: "Media",
    description: "A platform dedicated to free expression and insightful journalistic communication in the digital age.",
    keywords: ["Abhivyakti News", "Journalism", "Digital Media"],
    dateISO: "2023-04-05"
  },
  {
    slug: "sprene",
    title: "Sprene",
    shortDesc: "A creative and innovative digital solution project.",
    category: "Technology",
    description: "Pushing the boundaries of innovation with creative digital products and technical solutions.",
    keywords: ["Sprene", "Innovation", "Digital Products"],
    dateISO: "2023-02-15"
  },
  {
    slug: "invitation-king",
    title: "Invitation King",
    shortDesc: "A platform designed for digital invitations and event management.",
    category: "Design",
    description: "Simplifying event planning with elegant digital invitation designs and management tools.",
    keywords: ["Invitation King", "Digital Invitations", "Event Tech"],
    dateISO: "2022-12-20"
  },
  {
    slug: "refurhub",
    title: "Refurhub",
    shortDesc: "A project aimed at providing smart solutions in its domain.",
    category: "Technology",
    description: "Specializing in refurbished tech solutions and sustainable digital infrastructure.",
    keywords: ["Refurhub", "Sustainability", "Tech Solutions"],
    dateISO: "2022-10-10"
  }
];

export const getVentureBySlug = (slug: string) => ventures.find(v => v.slug === slug);
