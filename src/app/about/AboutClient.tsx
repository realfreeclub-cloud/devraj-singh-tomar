"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Server } from "lucide-react";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const professionalJourney = [
    { title: "Started career in IT (2018)" },
    { title: "Worked on multiple real-world projects" },
    { title: "Expanded into partnerships and entrepreneurship" },
    { title: "Currently managing multiple ventures" },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 mx-auto max-w-6xl">
      <motion.div initial="hidden" animate="show" variants={fadeIn} className="w-full">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-title">
          About <span className="text-primary">Me</span>
        </h1>
        
        <div className="bg-layer border border-layer-border rounded-3xl p-8 md:p-12 mb-16 shadow-lg shadow-primary/5">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <figure className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
                <Image
                  src="/devraj-singh-tomar.jpg"
                  alt="Devraj Singh Tomar - IT Professional and Entrepreneur"
                  title="Devraj Singh Tomar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                  unoptimized
                />
              </div>
              <figcaption className="text-sm text-foreground/60 text-center mt-3 font-medium">
                Devraj Singh Tomar
              </figcaption>
            </figure>

            {/* Bio Text */}
            <div>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Devraj Singh Tomar is an experienced IT professional and entrepreneur with a strong presence in the technology and digital solutions ecosystem. Since starting his journey in 2018, he has consistently worked across multiple domains including software development, project management, and business partnerships.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            With a practical, execution-focused mindset, Devraj has contributed to building and scaling digital platforms while collaborating with multiple organizations. He currently holds key roles as a partner and IT Project Manager in several ventures, where he focuses on delivering innovative and scalable technology solutions.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-0">
            His expertise lies in bridging the gap between technical development and business strategy. Over the years, he has worked on diverse projects ranging from web platforms to digital services, helping businesses improve efficiency and user experience.
          </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-title">Professional Journey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {professionalJourney.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-layer border border-layer-border flex items-center gap-4 group hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full shrink-0 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="bg-linear-to-br from-primary/20 to-secondary/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[60px]"></div>
          <Server className="w-12 h-12 text-primary mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-title">Vision</h2>
          <p className="text-foreground text-lg leading-relaxed max-w-2xl mx-auto italic relative z-10">
            &quot;To build impactful digital solutions that solve real-world problems and contribute to the growth of businesses and individuals through technology.&quot;
          </p>
        </div>

      </motion.div>
    </div>
  );
}
