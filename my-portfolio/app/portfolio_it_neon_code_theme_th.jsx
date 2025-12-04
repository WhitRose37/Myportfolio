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
  Brain, Palette, Globe, Eye, Lightbulb, Layers, Command, Send, Phone, User as UserIcon, Database, Layout, GitBranch, MessageSquare, Gamepad2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChatBotInterface from "@/components/ChatBotInterface";

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

const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "Next.js", "TailwindCSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase"] },
  { group: "Tools", items: ["Git", "Docker", "Figma", "VS Code", "Vercel"] },
];

const projects = [
  {
    title: "Mini stencil Project",
    blurb: "ระบบวัดขนานStencil อัตโนมัติ พร้อมส่งข้อมูลไปยัง Google sheet ผ่านการเเสดงข้อมูลบน google scripts",
    tags: ["Google scripts", "Google sheet", "eletronics", "Arduino", "Raspberry Pi"],
    link: "https://drive.google.com/drive/folders/1So-FIOQ4W18YrYEu4pjZCkcY52GDow5J?usp=sharing",
    icon: Zap,
    color: "emerald",
    image: "/mini_stencil_project.png"
  },
  {
    title: "BIR Project Generator",
    blurb: "ระบบค้นหาด้วย Part Number พร้อมเชื่อมต่อ OpenAI API เพื่อค้นหาข้อมูลอัตโนมัติ ",
    tags: ["Next.js", "OpenAI", "Google API", "Supabase", "Auth", "Prisma", "Postgres"],
    link: "https://bir-final-deploy-qbhj.vercel.app/",
    icon: Globe,
    color: "cyan",
    image: "/bir_project_v2.png"
  },
  {
    title: "IQ Room project",
    blurb: "เกมเเนวห้องปริศนา ",
    tags: ["Lua", "Roblox studio", "javascript", "blender", "C#"],
    link: "#",
    icon: Brain,
    color: "purple",
    image: "/iq_room_project.png"
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full bg-white text-black hover:bg-neutral-200 px-4 ml-1 font-medium">
                Contact
              </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[800px] ${theme === "dark" ? "bg-[#0A0A0A] border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} p-0 overflow-hidden`}>
              <div className="grid md:grid-cols-2">
                {/* Left Column: Profile Info */}
                <div className={`p-6 ${theme === "dark" ? "bg-neutral-900/50 border-white/10" : "bg-neutral-50 border-neutral-200"} flex flex-col items-center justify-center text-center border-r`}>
                  <div className="w-40 h-40 rounded-full border-4 border-emerald-500/20 p-1 mb-4 relative group">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity" />
                    <img src="/profile.jpg" alt="Thapanavawat" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-neutral-900"} mb-1`}>ฐปนวัฒน์ ปานวิจิตร์</h3>
                  <p className="text-xs text-emerald-400 mb-6 font-mono">(Thapanavawat Book panvijit)</p>

                  <div className="space-y-3 w-full text-left">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-emerald-500/30 transition-colors`}>
                      <div className="p-2 rounded-lg bg-cyan-500/10">
                        <Phone className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>094-419-9941</span>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-purple-500/30 transition-colors`}>
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <GmailIcon className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>Thaapanawat37@gmail.com</span>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-indigo-500/30 transition-colors`}>
                      <div className="p-2 rounded-lg bg-indigo-500/10">
                        <DiscordIcon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>White_37</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Form */}
                <div className="p-6">
                  <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="text-2xl font-bold text-emerald-400">Get in touch</DialogTitle>
                    <DialogDescription className={`text-neutral-400 ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4" onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const email = e.target.email.value;
                    const message = e.target.message.value;
                    window.location.href = `mailto:Thaapanawat37@gmail.com?subject=Contact from Portfolio - ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                  }}>
                    <div className="grid gap-2">
                      <label htmlFor="name" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Name</label>
                      <Input id="name" name="name" placeholder="John Doe" required className={`${theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} focus:border-emerald-500/50`} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Email</label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required className={`${theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} focus:border-emerald-500/50`} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        className={`flex min-h-[100px] w-full rounded-md border ${theme === "dark" ? "border-white/10 bg-white/5 text-white placeholder:text-neutral-500" : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400"} px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg mt-2">
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.nav >
      </div >

      {/* --- Hero Section --- */}
      < Section id="home" className="min-h-screen flex flex-col justify-center relative pt-32" >
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
              <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">Welcome</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Crafting <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-20"></span>
                <GradientText>The Future</GradientText>
              </span>
              <br />
              With Code.
            </h1>

            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed mb-8">
              เว็ปไซต์ออกเเบบเพื่อนำเสนอ <span className="text-white font-medium">Portfolio</span> และ <span className="text-white font-medium">performance</span>
              <br />
              Thank you for visit my website.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full h-12 px-8 bg-white text-black hover:bg-neutral-200 text-base font-medium">
                ดูผลงานของผม <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className={`rounded-full h-12 px-8 border text-base font-medium transition-colors ${theme === "dark"
                    ? "bg-transparent border-white/10 hover:bg-white/5 text-white"
                    : "bg-transparent border-neutral-200 hover:bg-neutral-50 text-neutral-900"
                    }`}>
                    <Github className="mr-2 w-4 h-4" /> GitHub
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-2xl">
                  <DialogTitle className="sr-only">Github Repositories</DialogTitle>
                  <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
                    {/* Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                      <div className="ml-4 text-xs text-neutral-500 font-mono">github_repos.tsx</div>
                    </div>

                    {/* Code Content */}
                    <div className="p-6 font-mono text-sm leading-relaxed">
                      <div className="text-neutral-500 mb-4">{'// Click to visit repositories'}</div>
                      <div className="space-y-2">
                        <div><span className="text-purple-400">const</span> <span className="text-yellow-200">MyGithub</span> <span className="text-white">=</span> <span className="text-white">[</span></div>

                        <div
                          className="pl-4 hover:bg-white/5 rounded px-2 py-1 transition-colors cursor-pointer group"
                          onClick={() => window.open('https://github.com/Tpanvijit', '_blank')}
                        >
                          <span className="text-white">{'{'}</span> <span className="text-cyan-400">user</span>: <span className="text-green-400">"Tpanvijit"</span>, <span className="text-cyan-400">url</span>: <span className="text-blue-400 underline group-hover:text-blue-300">"https://github.com/Tpanvijit"</span> <span className="text-white">{'}'}</span>,
                        </div>

                        <div
                          className="pl-4 hover:bg-white/5 rounded px-2 py-1 transition-colors cursor-pointer group"
                          onClick={() => window.open('https://github.com/WhitRose37', '_blank')}
                        >
                          <span className="text-white">{'{'}</span> <span className="text-cyan-400">user</span>: <span className="text-green-400">"WhitRose37"</span>, <span className="text-cyan-400">url</span>: <span className="text-blue-400 underline group-hover:text-blue-300">"https://github.com/WhitRose37"</span> <span className="text-white">{'}'}</span>
                        </div>

                        <div><span className="text-white">]</span>;</div>
                      </div>
                    </div>

                    {/* Glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none" />
                  </div>
                </DialogContent>
              </Dialog>
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
                Created by <span className="text-white font-medium">Thapanawat Panvijit</span>
              </div>
            </div>
          </motion.div >

          {/* 3D Code Block */}
          < motion.div
            initial={{ opacity: 0, x: 50 }
            }
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
                    <div className="pl-4"><span className="text-cyan-400">name</span>: <span className="text-green-400">"Thapanawat panvijit"</span>,</div>
                    <div className="pl-4"><span className="text-cyan-400">skills</span>: [<span className="text-green-400">"Full Stack"</span>, <span className="text-green-400">"AI assistant"</span>, <span className="text-green-400">"Data Science"</span>],</div>
                    <div className="pl-4"><span className="text-cyan-400">passion</span>: <span className="text-green-400">"Building awesome things"</span>,</div>
                    <div className="pl-4"><span className="text-cyan-400">hardbug</span>: <span className="text-purple-400">true</span>,</div>
                    <div className="pl-4"><span className="text-blue-400">ship</span>: <span className="text-purple-400">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-white">{'{'}</span></div>
                    <div className="pl-8"><span className="text-white">return</span> <span className="text-green-400">"Red Error is not a bug"</span>;</div>
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
              className={`absolute -right-8 -bottom-8 p-4 rounded-2xl ${theme === "dark" ? "bg-neutral-900/80 border-white/10" : "bg-white/80 border-neutral-200"} backdrop-blur-xl border shadow-xl`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${theme === "dark" ? "bg-emerald-500/20" : "bg-red-500/10"} flex items-center justify-center`}>
                  <Zap className={`w-5 h-5 ${theme === "dark" ? "text-emerald-400" : "text-red-500"}`} />
                </div>
                <div>
                  <div className={`text-xs ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>{theme === "dark" ? "Performance" : "Error"}</div>
                  <div className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-red-600"}`}>100%</div>
                </div>
              </div>
            </motion.div>
          </motion.div >
        </div >
      </Section >

      {/* --- Tech Stack (Marquee) --- */}
      < div className="w-full py-10 border-y border-white/5 bg-black/20 overflow-hidden" >
        <div className="flex gap-12 animate-marquee whitespace-nowrap mask-linear-fade">
          {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-400 font-medium text-lg">
              <Star className="w-4 h-4 text-emerald-500/50" /> {item}
            </div>
          ))}
        </div>
      </div >

      {/* --- Projects Section --- */}
      < Section id="projects" >
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
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <SpotlightCard color={project.color} className="h-full flex flex-col overflow-hidden">
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

                      {project.image && (
                        <div className="w-full h-40 overflow-hidden rounded-lg border border-white/5 relative group-hover:border-white/10 transition-colors mb-6">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className={`absolute inset-0 bg-${project.color}-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border-transparent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section >

      {/* --- About (Bento Grid) --- */}
      < Section id="about" className="py-20" >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            พร้อมเรียนรู้และพัฒนาตัวเอง เเละพบกับสังคมในมหาลัย
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">

          {/* Main Card */}
          <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden relative">
                <img
                  src="/who_am_i.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Who am I?</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                ผมคือนักศึกษาปวสปี 2 สาขาเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคขอนเเก่น
                Website ออกเเบบมาเพื่อ นำเสนอผลงานและประสบการณ์การทำงานเเละการเรียนรู้จากวิทยาลัย
                ขอบคุณทุกท่านที่เข้ามาเยี่ยมชมครับ
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <CodeChip icon={Terminal}>Clean Code</CodeChip>
              <CodeChip icon={Brain}>Problem Solving</CodeChip>
            </div>
          </div>

          {/* Chat Bot Card */}
          <div className={`md:col-span-2 row-span-2 rounded-3xl border overflow-hidden flex flex-col relative group transition-colors duration-500 ${theme === 'dark'
            ? 'border-white/10 bg-neutral-900/50'
            : 'border-neutral-200 bg-white/50'
            }`}>
            <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none ${theme === 'dark' ? 'from-emerald-500/5' : 'from-emerald-500/10'
              } to-transparent`} />

            {/* Header */}
            <div className={`p-4 border-b flex items-center gap-3 backdrop-blur-sm transition-colors duration-500 ${theme === 'dark'
              ? 'border-white/5 bg-white/5'
              : 'border-neutral-200 bg-white/60'
              }`}>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full border overflow-hidden ${theme === 'dark' ? 'border-white/10' : 'border-neutral-200'
                  }`}>
                  <img src="/profile.jpg" alt="Book Bot" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A0A0A]" />
              </div>
              <div>
                <div className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-800'
                  }`}>
                  Book Bot <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600">Beta</span>
                </div>
                <div className="text-xs text-emerald-500 animate-pulse">Online</div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 flex flex-col justify-center items-center text-center relative">
              <ChatBotInterface theme={theme} />
            </div>
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
              <p className="text-emerald-100">  </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="relative z-10 bg-white text-emerald-600 hover:bg-emerald-50 border-none rounded-full px-8">
                  Contact Me
                </Button>
              </DialogTrigger>
              <DialogContent className={`sm:max-w-[800px] ${theme === "dark" ? "bg-[#0A0A0A] border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} p-0 overflow-hidden`}>
                <div className="grid md:grid-cols-2">
                  {/* Left Column: Profile Info */}
                  <div className={`p-6 ${theme === "dark" ? "bg-neutral-900/50 border-white/10" : "bg-neutral-50 border-neutral-200"} flex flex-col items-center justify-center text-center border-r`}>
                    <div className="w-40 h-40 rounded-full border-4 border-emerald-500/20 p-1 mb-4 relative group">
                      <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity" />
                      <img src="/profile.jpg" alt="Thapanavawat" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-neutral-900"} mb-1`}>ฐปนวัฒน์ ปานวิจิตร์</h3>
                    <p className="text-xs text-emerald-400 mb-6 font-mono">(Thapanavawat Book panvijit)</p>

                    <div className="space-y-3 w-full text-left">
                      <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-emerald-500/30 transition-colors`}>
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                          <Phone className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>094-419-9941</span>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-purple-500/30 transition-colors`}>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <GmailIcon className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>Thaapanawat37@gmail.com</span>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-neutral-200 shadow-sm"} hover:border-indigo-500/30 transition-colors`}>
                        <div className="p-2 rounded-lg bg-indigo-500/10">
                          <DiscordIcon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className={`text-sm ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"} font-mono`}>White_37</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Form */}
                  <div className="p-6">
                    <DialogHeader className="mb-4 text-left">
                      <DialogTitle className="text-2xl font-bold text-emerald-400">Get in touch</DialogTitle>
                      <DialogDescription className={`text-neutral-400 ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                        Fill out the form below and I'll get back to you as soon as possible.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name-cta" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Name</label>
                        <Input id="name-cta" placeholder="John Doe" className={`${theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} focus:border-emerald-500/50`} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email-cta" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Email</label>
                        <Input id="email-cta" placeholder="john@example.com" className={`${theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"} focus:border-emerald-500/50`} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="message-cta" className={`text-xs font-medium ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"} uppercase tracking-wider`}>Message</label>
                        <textarea
                          id="message-cta"
                          placeholder="Tell me about your project..."
                          className={`flex min-h-[100px] w-full rounded-md border ${theme === "dark" ? "border-white/10 bg-white/5 text-white placeholder:text-neutral-500" : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400"} px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg mt-2">
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </Section >

      {/* --- Footer --- */}
      < footer className="py-8 border-t border-white/10 bg-black/40 text-center" >
        <p className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} Designed & Built with <span className="text-emerald-500">♥</span> by <span className="text-emerald-500">Thapanawat Panvijit</span>
        </p>
      </footer >

    </div >
  );
}

// Icons for Bento Grid


function DiscordIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function GmailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )
}


