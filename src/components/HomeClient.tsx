"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen flex items-center bg-background overflow-hidden">
      
      {/* Decorative Yellow Polygon Background (Desktop Only) */}
      <div 
        className="hidden lg:block fixed top-0 left-0 h-full bg-primary z-0 shadow-2xl transition-all duration-500"
        style={{ 
          width: "35vw", 
          clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
          marginLeft: "-5vw"
        }}
      ></div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 pt-[80px] lg:pt-0 lg:h-screen lg:items-center content-center pb-24 lg:pb-0">
        
        {/* Left Side: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center lg:justify-end lg:pl-10 relative z-10"
        >
          {/* Mobile uses a circular image, Desktop uses a tall rounded rectangle */}
          <div className="relative w-64 h-64 lg:w-full lg:max-w-[460px] lg:h-[calc(100vh-80px)] lg:max-h-[640px] shadow-[0_0_30px_rgba(0,0,0,0.6)] lg:rounded-3xl rounded-full overflow-hidden border-4 border-layer-border lg:border-none">
            {/* Desktop Image */}
            <Image
              src="/devraj-singh-tomar.jpg"
              alt="Devraj Singh Tomar IT Professional"
              fill
              sizes="(max-width: 1024px) 0vw, 460px"
              className="hidden lg:block object-cover"
              priority
            />
            {/* Mobile Image */}
            <Image
              src="/devraj-singh-tomar-mobile.jpg"
              alt="Devraj Singh Tomar Entrepreneur"
              fill
              sizes="(max-width: 1024px) 256px, 0vw"
              className="block lg:hidden object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-12 relative z-10"
        >
          <motion.div variants={itemVars} className="flex flex-col lg:flex-row items-center gap-6 mb-4 justify-center lg:justify-start">
            <span className="hidden lg:block w-10 h-[4px] bg-primary rounded-full shrink-0"></span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight uppercase">
              I&apos;M DEVRAJ SINGH TOMAR.
            </h2>
          </motion.div>

          <motion.h1 variants={itemVars} className="text-4xl md:text-6xl font-extrabold text-title uppercase tracking-wider mb-6">
            IT PROFESSIONAL
          </motion.h1>

          <motion.p variants={itemVars} className="text-base md:text-lg text-foreground leading-8 mb-8 max-w-2xl mx-auto lg:mx-0">
            Devraj Singh Tomar is an experienced IT professional, project manager, and entrepreneur with a strong track record of building and managing digital platforms. With hands-on experience since 2018, he specializes in transforming ideas into scalable technology solutions.
          </motion.p>
          
          <motion.p variants={itemVars} className="text-base md:text-lg text-foreground leading-8 mb-10 max-w-2xl mx-auto lg:mx-0">
            Partnered with multiple tech ventures and actively working on innovative digital platforms across different industries.
          </motion.p>

          <motion.div variants={itemVars} className="flex gap-4 justify-center lg:justify-start">
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-between border border-primary rounded-full pl-8 pr-2 py-2 w-[280px] hover:bg-primary transition-all duration-300 overflow-hidden"
            >
              <span className="text-title font-bold tracking-widest text-sm relative z-10 group-hover:text-black transition-colors duration-300 pointer-events-none">MORE ABOUT ME</span>
              <span className="bg-primary w-14 h-14 rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:bg-white transition-colors duration-300">
                <ArrowRight className="text-white group-hover:text-black transition-colors duration-300" size={24} />
              </span>
              {/* Background fill on hover is handled by the group hover:bg-primary */}
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
