"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Code2, Sparkles, Rocket, Github, Linkedin, Mail,
  Star, Cpu, Terminal, GraduationCap, MousePointerClick, Wand2,
  FolderGit2, NotebookPen, ArrowRight, Moon, Sun, Zap,
  Brain, Palette, Globe, Eye, Lightbulb, Layers, Command
} from "lucide-react";

// --- Helper Components ---

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`max-w-7xl mx-auto px-6 md:px-12 py-20 ${className}`}>{children}</section>
);

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute blur-[100px] opacity-20 ${className}`} />
);

const NeonText = ({ children, color = "emerald" }) => {
  const colorClass = color === "cyan" ? "text-cyan-400" : color === "purple" ? "text-purple-400" : "text-emerald-400";
  const shadowClass = color === "cyan" ? "rgba(34,211,238,0.8)" : color === "purple" ? "rgba(192,132,252,0.8)" : "rgba(52,211,153,0.8)";

  return (
    <span
      className={`font-bold ${colorClass}`}
      style={{ textShadow: `0 0 20px ${shadowClass}` }}
    >
      {children}
    </span>
  );
};

const GradientText = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 animate-gradient bg-[length:300%_300%] ${className}`}>
    {children}
  </span>
);

const CodeChip = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
    {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400" />}
    {children}
  </div>
);

const SpotlightCard = ({ children, className = "", color = "emerald" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const colorHex = color === "cyan" ? "#22d3ee" : color === "purple" ? "#c084fc" : "#10b981";

  return (
    <div
      className={`group relative border border-white/10 bg-neutral-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${colorHex}15,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Fake data ---
const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "Next.js", "TailwindCSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase"] },
  { group: "Tools", items: ["Git", "Docker", "Figma", "VS Code", "Vercel"] },
];

const projects = [
  {
    title: "Factory Part Finder",
    blurb: "ระบบค้นหาอะไหล่อัจฉริยะ ลดเวลา Downtime โรงงานกว่า 60% ด้วย Real-time Search",
    tags: ["React", "FastAPI", "Postgres"],
    link: "#",
    icon: Zap,
    color: "emerald"
  },
  {
    title: "Smart Campus Portal",
    blurb: "One-stop service สำหรับนักศึกษา รวมระบบแจ้งซ่อมและจองห้องประชุมในที่เดียว",
    tags: ["Next.js", "tRPC", "Auth"],
    link: "#",
    icon: Globe,
    color: "cyan"
  },
  {
    title: "AI Note Summarizer",
    blurb: "ผู้ช่วยสรุปบทเรียนอัตโนมัติ แปลงชีทเรียนเป็น Flashcards พร้อมสอบในคลิกเดียว",
    tags: ["Python", "OpenAI", "Vector DB"],
    link: "#",
    icon: Brain,
    color: "purple"
  },
];

const features = [
  { icon: Lightbulb, title: "Problem Solver", desc: "เปลี่ยนโจทย์ยากให้เป็นโซลูชันที่เรียบง่าย" },
  { icon: Layers, title: "Scalable Architecture", desc: "ออกแบบระบบให้รองรับการเติบโต" },
  { icon: Palette, title: "Pixel Perfect", desc: "ใส่ใจทุกรายละเอียด UX/UI ระดับพรีเมียม" },
  { icon: Rocket, title: "Fast Shipping", desc: "ส่งมอบงานไว คุณภาพไม่ตก" },
];

const timeline = [
  { year: "Now", title: "Freelance & Student", desc: "รับงานอิสระและพัฒนาโปรเจกต์ส่วนตัว" },
  { year: "2024", title: "Internship @ Tech Corp", desc: "พัฒนา Internal Tools ช่วยลดงาน Manual ของทีม" },
  { year: "2023", title: "Started Coding", desc: "จุดเริ่มต้นกับ HTML/CSS และก้าวสู่ React" },
];

// --- Main Component ---
export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return projects;
    return projects.filter(p =>
      (p.title + p.blurb + p.tags.join(" ")).toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-[#050505] text-white" : "bg-neutral-50 text-neutral-900"}`}>

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)" }}
        />

        {/* Spotlights */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Mouse Follower */}
        <div
          className="absolute w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        />
      </div>

      {/* --- Progress Bar --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- Floating Navbar --- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-black/20"
        >
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-neutral-400 hover:text-white" onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
            Home
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-neutral-400 hover:text-white" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            Projects
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-neutral-400 hover:text-white" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
            About
          </Button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 hover:bg-white/10" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button size="sm" className="rounded-full bg-white text-black hover:bg-neutral-200 px-4 ml-1 font-medium" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </Button>
        </motion.nav>
      </div>

      {/* --- Hero Section --- */}
      <Section id="home" className="min-h-screen flex flex-col justify-center relative pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">Available for work</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Building <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-20"></span>
                <GradientText>Digital Experiences</GradientText>
              </span>
              <br />
              That Matter.
            </h1>

            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed mb-8">
              ผมคือนักพัฒนาที่หลงใหลในการสร้างสรรค์เว็บแอปพลิเคชันที่ <span className="text-white font-medium">สวยงาม</span> และ <span className="text-white font-medium">ใช้งานได้จริง</span>
              เปลี่ยนไอเดียของคุณให้เป็นความจริงด้วยเทคโนโลยีที่ทันสมัย
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full h-12 px-8 bg-white text-black hover:bg-neutral-200 text-base font-medium">
                ดูผลงานของผม <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-white/10 hover:bg-white/5 text-base font-medium">
                <Github className="mr-2 w-4 h-4" /> GitHub
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-neutral-500">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-[10px] text-white font-medium">
                    <Sparkles className="w-3 h-3" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                Trusted by <span className="text-white font-medium">Happy Clients</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <TiltCard className="w-full">
              <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="ml-4 text-xs text-neutral-500 font-mono">developer.tsx</div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                  <div className="text-neutral-500 mb-4">{'// My philosophy'}</div>
                  <div className="space-y-1">
                    <div><span className="text-purple-400">const</span> <span className="text-yellow-200">Developer</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span></div>
                    <div className="pl-4"><span className="text-cyan-400">name</span>: <span className="text-green-400">"Your Name"</span>,</div>
                    <div className="pl-4"><span className="text-cyan-400">skills</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Next.js"</span>, <span className="text-green-400">"Design"</span>],</div>
                    <div className="pl-4"><span className="text-cyan-400">passion</span>: <span className="text-green-400">"Building awesome things"</span>,</div>
                    <div className="pl-4"><span className="text-cyan-400">hardWorker</span>: <span className="text-purple-400">true</span>,</div>
                    <div className="pl-4"><span className="text-blue-400">ship</span>: <span className="text-purple-400">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-white">{'{'}</span></div>
                    <div className="pl-8"><span className="text-white">return</span> <span className="text-green-400">"High Quality Code"</span>;</div>
                    <div className="pl-4"><span className="text-white">{'}'}</span></div>
                    <div><span className="text-white">{'}'}</span>;</div>
                  </div>
                </div>

                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none" />
              </div>
            </TiltCard>

            {/* Floating Elements */}
            <motion.div
              className="absolute -right-8 -bottom-8 p-4 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Performance</div>
                  <div className="text-lg font-bold text-white">100%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* --- Tech Stack (Marquee) --- */}
      <div className="w-full py-10 border-y border-white/5 bg-black/20 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap mask-linear-fade">
          {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-400 font-medium text-lg">
              <Star className="w-4 h-4 text-emerald-500/50" /> {item}
            </div>
          ))}
        </div>
      </div>

      {/* --- Projects Section --- */}
      <Section id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-emerald-400 font-medium mb-2"
            >
              <FolderGit2 className="w-5 h-5" />
              <span>Selected Works</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
          </div>

          <div className="relative">
            <Command className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SpotlightCard color={project.color} className="h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-${project.color}-500/10`}>
                        <project.icon className={`w-6 h-6 text-${project.color}-400`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-600 -rotate-45 group-hover:text-white group-hover:rotate-0 transition-all duration-300" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                      {project.blurb}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border-transparent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* --- About (Bento Grid) --- */}
      <Section id="about" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            มากกว่าแค่เขียนโค้ด คือการเข้าใจปัญหาและสร้างโซลูชันที่ยั่งยืน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">

          {/* Main Card */}
          <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Who am I?</h3>
              <p className="text-neutral-400 leading-relaxed">
                นักศึกษา IT ที่มีความกระหายในการเรียนรู้เทคโนโลยีใหม่ๆ ตลอดเวลา
                ผมเชื่อว่า "Good Code" ไม่ใช่แค่โค้ดที่ทำงานได้ แต่ต้องเป็นโค้ดที่เพื่อนร่วมทีมอ่านรู้เรื่องและดูแลต่อง่าย
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <CodeChip icon={Terminal}>Clean Code</CodeChip>
              <CodeChip icon={Brain}>Problem Solving</CodeChip>
            </div>
          </div>

          {/* Stats Card */}
          <div className="md:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-neutral-900/50 p-6 flex flex-col justify-center items-center text-center group hover:border-emerald-500/30 transition-colors">
            <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">2+</div>
            <div className="text-sm text-neutral-400">Years Experience</div>
          </div>

          <div className="md:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-neutral-900/50 p-6 flex flex-col justify-center items-center text-center group hover:border-cyan-500/30 transition-colors">
            <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">10+</div>
            <div className="text-sm text-neutral-400">Projects Completed</div>
          </div>

          {/* Tech Stack List */}
          <div className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl border border-white/10 bg-neutral-900/50 p-6 flex items-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex gap-4 w-full justify-around">
              <Cpu className="w-8 h-8 text-neutral-600 hover:text-emerald-400 transition-colors" />
              <Globe className="w-8 h-8 text-neutral-600 hover:text-cyan-400 transition-colors" />
              <Database className="w-8 h-8 text-neutral-600 hover:text-purple-400 transition-colors" />
              <Layout className="w-8 h-8 text-neutral-600 hover:text-pink-400 transition-colors" />
              <GitBranch className="w-8 h-8 text-neutral-600 hover:text-orange-400 transition-colors" />
            </div>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-1 lg:col-span-4 row-span-1 rounded-3xl bg-gradient-to-r from-emerald-600 to-cyan-600 p-8 flex items-center justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white">Ready to start a project?</h3>
              <p className="text-emerald-100">Let's create something amazing together.</p>
            </div>
            <Button size="lg" className="relative z-10 bg-white text-emerald-600 hover:bg-emerald-50 border-none rounded-full px-8">
              Contact Me
            </Button>
          </div>

        </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="py-8 border-t border-white/10 bg-black/40 text-center">
        <p className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} Designed & Built with <span className="text-emerald-500">♥</span> by Me.
        </p>
      </footer>

    </div>
  );
}

// Icons for Bento Grid
function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function Database(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function Layout(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  )
}

function GitBranch(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}
