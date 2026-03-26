"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Sufi-7571",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    name: "Twitter",
    href: "#",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    )
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden px-6 lg:px-16">
      {/* First Row: Nav, Socials & Slider */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-24 items-start relative z-10">
        {/* Nav Links Column */}
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">Navigation</span>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-lg text-text hover:text-accent transition-colors w-fit group flex items-center gap-1"
              >
                {link.label}
                <svg className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">Social Systems</span>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <p className="font-mono text-[11px] text-muted max-w-[240px] leading-relaxed">
            Shipping production-grade AI & web systems from Lahore.
          </p>
        </div>

        {/* Project Slider Column */}
        <div className="flex flex-col gap-6 overflow-hidden">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">Recent Works</span>
          <div className="relative w-full h-32 flex items-center group">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 w-fit"
            >
              {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => (
                <div 
                  key={idx}
                  className="w-56 h-32 flex-shrink-0 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-accent" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Project 0{i}</span>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer Bottom Info Line */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 font-mono text-[10px] tracking-widest uppercase text-muted mb-16 relative z-10">
        <p>© 2026 Sufiyan Mirza</p>
        <div className="flex gap-10">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00ff87]" />
            Lahore, PK
          </span>
          <span>19:06 PM PST</span>
        </div>
        <p>Built with Passion & Next.js</p>
      </div>

      {/* Second Row: Large Logo — truly 100% width */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] select-none border-t border-white/[0.03]">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full text-center font-display font-black uppercase tracking-[-0.08em] leading-[0.7] m-0 p-0 overflow-hidden"
          style={{
            fontSize: "calc(100vw / 4.2)",
            background: "linear-gradient(to bottom, #ededed 25%, rgba(237, 237, 237, 0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          sufiyan
        </motion.h2>
      </div>

      {/* Visual background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[500px] bg-accent/5 blur-[180px] pointer-events-none -z-10" />
    </footer>
  );
}
