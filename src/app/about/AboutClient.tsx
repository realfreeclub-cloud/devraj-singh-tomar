"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Server, GraduationCap, Briefcase, Award, Rocket, Heart, Code2, Users, Target, Zap } from "lucide-react";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const skills = [
    "Next.js Developer India",
    "IT Project Manager India",
    "React.js & Full-Stack Development",
    "Advanced Technical SEO",
    "Website Architecture Design",
    "Social Media Management",
    "Digital Project Scaling",
    "Business Operations & Strategy"
  ];

  const achievements = [
    { title: "Managed and delivered 50+ diverse digital projects", icon: <Award className="text-primary w-6 h-6" /> },
    { title: "Partnered and executed digital solutions for 7 Government Medical Colleges", icon: <Rocket className="text-secondary w-6 h-6" /> },
    { title: "Handled comprehensive IT infrastructure for 30+ clients across industries", icon: <Server className="text-emerald-500 w-6 h-6" /> },
    { title: "Co-founded impactful digital agencies like Route 2 Shine and Lotus Loop Media", icon: <Target className="text-blue-500 w-6 h-6" /> },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 mx-auto max-w-6xl">
      <motion.div initial="hidden" animate="show" variants={staggerContainer} className="w-full">
        
        {/* Hero Introduction */}
        <motion.div variants={fadeIn} className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-title tracking-tight">
            Meet <span className="text-primary">Devraj Singh Tomar</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-medium max-w-4xl leading-relaxed mb-4">
            A Visionary IT Project Manager & Next.js Developer in India, Building Growth-Driven Digital Solutions.
          </p>
          <div className="w-24 h-1 bg-primary rounded-full md:mx-0 mx-auto mt-6"></div>
        </motion.div>

        {/* Story Section 1: The Foundations */}
        <motion.div variants={fadeIn} className="bg-layer border border-layer-border rounded-4xl p-8 md:p-12 mb-10 shadow-lg hover:border-primary/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Heart size={28} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-title">Roots & Early Life Struggles</h2>
          </div>
          <div className="space-y-6 text-foreground text-lg leading-relaxed">
            <p>
              Every great journey has a humble beginning. For <strong>Devraj Singh Tomar</strong>, that beginning was in Kudri, a small village situated in Jhansi, Uttar Pradesh (Pin: 284202). Growing up in an environment where agriculture and traditional trades were the norm, the digital world seemed continents away. Yet, from a significantly young age, a powerful fascination with computers began to take root in him. 
            </p>
            <p>
              The most profound credit for this early exposure goes directly to his father, a visionary in his own right, who observed the spark of curiosity in his son and decided to fuel it despite the challenges. Devraj proudly stands as the first person in his entire village to formally pursue computer education. The reality of this achievement wasn&apos;t painted in comfort. When he was just in the 5th grade, his father would wake up before dawn and drive him 7 kilometers on a bike in the chilling winds every single morning at 6 AM, purely to attend a local computer coaching center.
            </p>
            <p>
              During this crucial developmental period, Devraj learned the fundamentals of typing, and by the subsequent year, he had advanced to learning Tally. To an outsider, these might seem like rudimentary skills today, but for a young boy from Kudri, it was akin to discovering a new universe. This early, consistent exposure instilled a relentless curiosity in him—he didn&apos;t just want to know how computers functioned; he was deeply driven to discover what more could be built, achieved, and revolutionized using technology. Building a career from scratch requires immense fatherly support, undeniable grit, and decisions that go against the grain.
            </p>
          </div>
        </motion.div>

        {/* Story Section 2: Education & the Bold Decision */}
        <motion.div variants={fadeIn} className="bg-layer/40 border border-layer-border rounded-4xl p-8 md:p-12 mb-10 relative overflow-hidden group">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 group-hover:bg-secondary/20 transition-colors duration-700"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-title">The Learning Phase & Early Decisions</h2>
          </div>
          <div className="space-y-6 text-foreground text-lg leading-relaxed">
            <p>
              Academic progression for Devraj was never isolated from his technical pursuits. He successfully cleared his High School in 2014 and later completed his Intermediate with a specialization in Mathematics from Orai, Jalaun, Uttar Pradesh. Navigating the pressures of formal education, he managed to complete his graduation alongside grueling preparations for highly competitive government exams—a path stereotypically expected from brilliant minds in rural and semi-urban India.
            </p>
            <p>
              Simultaneously, he fortified his technical foundation. Devraj pursued an <strong>O Level Certification</strong> and a <strong>CCC Certification</strong> from NGIT Allahabad. It was under the insightful guidance of Mr. Javed Siddique that he actively transitioned from a theoretical learner to a creator, developing his very first working website. This milestone proved that his technical acumen was transitioning into usable digital assets.
            </p>
            <p>
              After completing his Intermediate in 2016, traditional expectations directed him towards Allahabad (Prayagraj) to intensely prepare for defense examinations. His sharp mind prevailed, and he triumphantly cleared the demanding Air Force Y Group examination. However, this became a massive turning point. Rather than comfortably settling into a secure government job, Devraj made the fiercely independent and unconventional choice to reject the offer. He recognized that his intrinsic passion did not lie in uniform, but deeply within the realms of technological innovation, coding, and dynamic business entrepreneurship.
            </p>
            <p>
              The subsequent attempts to find the perfect educational roadmap were fraught with trials. He enrolled in MAAC aiming to master graphics and advanced web design. Unfortunately, he encountered heavily outdated curriculums and a stark absence of practical, real-world exposure, leading to immense dissatisfaction. Seeking a blend of business and tech, he secured admission at the prestigious MNIT Allahabad for an MBA. Yet again, he realized the distinct lack of a dedicated IT-focused stream that aligned with his modern tech ambitions, prompting him to drop out. These bold rejections of mismatched systems solidified his resolve to educate himself through independent real-world execution.
            </p>
          </div>
        </motion.div>

        {/* Story Section 3: Corporate Realities and the Noida Transition */}
        <motion.div variants={fadeIn} className="bg-layer border border-layer-border rounded-4xl p-8 md:p-12 mb-10 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-title">Career Transition & Corporate Mastery</h2>
          </div>
          <div className="space-y-6 text-foreground text-lg leading-relaxed">
            <p>
              By 2022, fueled by the unwavering objective to become entirely financially independent and plunge directly into the industry, Devraj relocated from his hometown to the bustling technology hub of Delhi/Noida. The metropolitan landscape offered precisely the competitive momentum he sought.
            </p>
            <p>
              His professional trajectory accelerated when he initiated his corporate stint at <strong>AJIO</strong>. Joining as an Executive, his innate technical troubleshooting capabilities and structured leadership mentality quickly set him apart from his peers. In a mere span of 6 months, he was deservedly promoted to a Team Leader role, a position where he actively managed operations, streamlined workflows, and maximized team productivity for 9 successful months. The corporate ecosystem armed him with indispensable problem-solving metrics and team scalability tactics. 
            </p>
            <p>
              However, sitting within a corporate ladder wasn&apos;t the endgame. His entrepreneurial itch culminated when he took a massive leap, co-founding a Voice Process Outsourcing (VPO) company named <strong>&quot;Route 2 Shine&quot;</strong> stationed in Noida. As a co-founder, Devraj heavily shouldered all IT-related operations. Setting up complex networking infrastructures, managing backend technological requirements, and engineering out software anomalies became his daily routine, cementing his capability to single-handedly construct digital business foundations.
            </p>
          </div>
        </motion.div>

        {/* Story Section 4: Entrepreneurial Heights and Next.js Expertise */}
        <motion.div variants={fadeIn} className="bg-layer/40 border border-layer-border rounded-4xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
              <Zap size={28} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-title">The Entrepreneurial Journey & Scaling Brands</h2>
          </div>
          <div className="space-y-6 text-foreground text-lg leading-relaxed">
            <p>
              The quest for broader impact led Devraj to work remotely alongside Vipin Singh based in Pratapgarh for a rapidly growing firm, <strong>M/S Career Avsar</strong>. It was here that Devraj&apos;s technical capabilities expanded into an enterprise-grade spectrum. Taking on immense responsibility, he seamlessly blended his roles as an expert <strong>Next.js Developer India</strong> and a strategic <strong>IT Project Manager India</strong>. 
            </p>
            <p>
              At career Avsar, Devraj took total command of critical digital pillars: comprehensive Website Development prioritizing high performance, holistic SEO Optimization engineered to dominate search rankings, and targeted Social Media Management intended to drastically scale online visibility. 
            </p>
            <p>
              His execution at M/S Career Avsar yielded monumental achievements. He meticulously directed the web development and digital structuring for <strong>7 distinct Government Medical Colleges</strong>, a task demanding unparalleled security protocols, accessibility standards, and robust architectural planning. Furthermore, he successfully handled over <strong>30+ robust client projects</strong>, ranging from dynamic corporate identities to scaling operational portals, establishing a rock-solid track record of trust and delivery.
            </p>
            <p className="font-semibold text-primary mt-6">
              Empowered by this massive operational success, in September 2025, Devraj embarked on a new flagship venture by co-founding &quot;Lotus Loop Media Solution&quot; in Noida, joining forces with Tushar Nagpal.
            </p>
            <p>
              Currently, Devraj Singh Tomar is an instrumental powerhouse acting in a dual capacity. As a key player and IT Project Manager for both M/S Career Avsar and Lotus Loop Media Solution, he flawlessly orchestrates the synergy between high-end technical developments—such as complex React and Next.js ecosystems—and large-scale digital executions.
            </p>
          </div>
        </motion.div>

        {/* Personal Life & Closing Storyline */}
        <motion.div variants={fadeIn} className="mb-16">
          <div className="bg-layer border border-layer-border rounded-4xl p-8 md:p-12 shadow-md">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-title">A Touch of Personal Philosophy</h3>
            </div>
            <p className="text-foreground text-lg leading-relaxed">
              Devraj&apos;s story isn&apos;t just painted with professional milestones; it is deeply rooted in personal integrity. Amidst the chaos of building businesses, mastering frameworks, and shifting cities, he maintained immense dedication to his personal life. After committing to a long-term relationship, he patiently and respectfully navigated the emotional complexities of convincing two distinct families for marriage. This journey reflects a man capable of bearing extreme responsibility, emphasizing that true leadership is demonstrated just as much at home through empathy and patience as it is in the boardroom through strategy and technology.
            </p>
          </div>
        </motion.div>

        {/* Skills & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div variants={fadeIn} className="bg-layer border border-layer-border rounded-4xl p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Code2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-title">Technical Canvas & Expertise</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-layer-border/30 border border-layer-border text-foreground font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-8 text-foreground/80 leading-relaxed">
              Proficiency as an <strong>IT Project Manager India</strong> isn&apos;t just about managing teams; it&apos;s about deeply understanding the code. From high-speed <strong>Next.js</strong> frontends offering flawless Server-Side Rendering to optimizing organic SEO channels that act as lead generation engines, the technical stack is engineered purposely for business growth. 
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-layer border border-layer-border rounded-4xl p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-title">Landmark Achievements</h2>
            </div>
            <div className="space-y-5">
              {achievements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-layer border border-layer-border/50 hover:bg-layer-border/20 transition-colors">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <p className="text-foreground text-lg font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission Highlight Box */}
        <motion.div variants={fadeIn} className="bg-linear-to-br from-primary/15 via-layer to-secondary/15 border border-primary/30 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-125"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-125"></div>
          
          <Target className="w-16 h-16 text-primary mx-auto mb-8 opacity-90 relative z-10" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-title relative z-10 tracking-tight">Vision & Mission</h2>
          <p className="text-foreground text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto italic relative z-10 font-medium">
            &quot;To transcend traditional coding boundaries and deliver growth-driven digital solutions. I believe in establishing a digital presence that doesn&apos;t just exist elegantly on the web, but functions as a dynamic engine—helping modern businesses radically succeed, scale operations efficiently, and dominate their online ecosystem.&quot;
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}

