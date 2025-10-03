// main.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // tailwind ready

function App() {
  // theme toggle
  const [mode, setMode] = useState("dark");
  const isDark = mode === "dark";
  useEffect(() => {
    const saved = localStorage.getItem("mode");
    if (saved === "light" || saved === "dark") setMode(saved);
  }, []);
  useEffect(() => localStorage.setItem("mode", mode), [mode]);

  // nav sections
  const sections = useMemo(() => ["home", "projects", "skills"], []);
  const [active, setActive] = useState("home");

  // smooth scroll
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = prev);
  }, []);

  // prevent overscroll
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("overscroll-none", "h-full");
    body.classList.add("overscroll-none", "h-full");
    html.style.overscrollBehaviorY = "none";
    body.style.overscrollBehaviorY = "none";
    return () => {
      html.classList.remove("overscroll-none", "h-full");
      body.classList.remove("overscroll-none", "h-full");
      html.style.overscrollBehaviorY = "";
      body.style.overscrollBehaviorY = "";
    };
  }, []);

  // highlight active section while scrolling
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { root: null, threshold: 0, rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const textMain = isDark ? "text-white" : "text-neutral-900";
  const textSub = isDark ? "text-neutral-300" : "text-neutral-600";
  const headerBg = isDark ? "bg-neutral-900/80 border-white/10" : "bg-white/80 border-black/10";
  const btnGhost =
    isDark ? "border-white/20 hover:bg-white/10 text-white" : "border-black/20 hover:bg-black/5 text-black";
  const btnSolid =
    isDark ? "bg-neutral-800 hover:bg-neutral-700 text-white" : "bg-neutral-900 hover:bg-black text-white";
  const chipIcon =
    isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/10 hover:bg-black/20 text-black";

  return (
    <div
      className={`min-h-screen overscroll-none antialiased ${
        isDark ? "bg-neutral-950" : "bg-white"
      } ${textMain}`}
    >
      {/* navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur border-b ${headerBg}`}>
        <div className="mx-auto max-w-7xl h-14 px-5 grid grid-cols-[1fr_auto_1fr] items-center">
          <button onClick={() => go("home")} className="justify-self-start font-semibold tracking-wide">
            Matthew Nguyen
          </button>

          {/* center theme toggle */}
          <button
            aria-label="Toggle theme"
            aria-pressed={isDark ? "true" : "false"}
            onClick={() => setMode(isDark ? "light" : "dark")}
            className={`${isDark ? "bg-neutral-700" : "bg-neutral-300"} relative h-8 w-16 rounded-full`}
          >
            <span
              className={[
                "absolute top-1 left-1 h-6 w-6 rounded-full transition-transform shadow",
                isDark ? "translate-x-8 bg-neutral-100" : "translate-x-0 bg-neutral-900",
              ].join(" ")}
            />
          </button>

          {/* right: animated nav links */}
          <nav className="justify-self-end hidden md:flex items-center gap-4">
            <NavLink id="home" label="Home" current={active} isDark={isDark} onClick={() => go("home")} />
            <NavLink id="projects" label="Projects" current={active} isDark={isDark} onClick={() => go("projects")} />
            <NavLink id="skills" label="Skills" current={active} isDark={isDark} onClick={() => go("skills")} />
          </nav>
        </div>
      </header>

      {/* hero text */}
      <section
        id="home"
        className="scroll-mt-20 mx-auto max-w-7xl px-5 py-12 md:py-16 min-h-[calc(100svh-3.5rem)] grid place-items-center"
      >
        <div className="w-full grid items-center md:grid-cols-2 gap-x-6 md:gap-x-0 gap-y-8">
          {/* profile */}
          <div className="flex justify-center md:justify-center">
            <img
              src="/profile.png"
              alt="Matthew Nguyen"
              className={[
                "h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]",
                "object-cover rounded-full ring-4",
                isDark ? "ring-white" : "ring-black",
                "shadow-[0_8px_30px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            />
          </div>

          {/* text */}
          <div className="max-w-2xl md:pl-0 md:-ml-3 justify-self-center md:justify-self-start">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-center md:text-left">
              Matthew Nguyen
            </h1>
            <p className={`mt-4 text-2xl font-semibold ${textMain} text-center md:text-left`}>
              Fullstack Developer
            </p>
            <p
              className={`mt-2 text-sm sm:text-[15px] leading-snug max-w-[52ch] md:max-w-[48ch] ${textSub} text-center md:text-left`}
            >
              Hello! I’m Matthew Nguyen, a 3rd-year Software Engineering major @ UC Irvine. I enjoy turning ideas into
              sleek, well-designed web applications. Whether I’m coding solo or collaborating on a team, I’m always
              looking to learn, build, and create something impactful.
            </p>

            {/* actions */}
            <div className="mt-9 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href="/resume.pdf" download className={`rounded-full border px-6 py-3 text-sm font-semibold ${btnGhost}`}>
                Download CV
              </a>
              <a href="mailto:matttn14@uci.com" className={`rounded-full px-6 py-3 text-sm font-semibold ${btnSolid}`}>
                Contact Info
              </a>
            </div>

            {/* social */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <Social href="https://linkedin.com/in/mattndev" className={chipIcon}>
                <LinkedInIcon />
              </Social>
              <Social href="https://github.com/kurulean" className={chipIcon}>
                <GitHubIcon />
              </Social>
            </div>
          </div>
        </div>
      </section>

      {/* projects */}
      <ProjectsGrid isDark={isDark} />

      {/* skills */}
      <Skills isDark={isDark} />

      {/* footer */}
      <footer
        className={`mx-auto max-w-7xl px-5 pb-10 text-xs ${
          isDark ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        @ 2025 Matthew Nguyen. Built with React & TailwindCSS.
      </footer>
    </div>
  );
}

/* animated navlink */
function NavLink({ id, label, current, onClick, isDark }) {
  const isActive = current === id;

  // active styles
  const glow = isDark
    ? "shadow-[0_0_24px_rgba(96,165,250,0.45)]"
    : "shadow-[0_0_20px_rgba(37,99,235,0.35)]";
  const activeText = isDark ? "text-blue-400" : "text-blue-600";
  const baseText = isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-neutral-900";

  return (
    <button
      onClick={onClick}
      className={[
        "relative px-2 py-1 rounded-md transition",
        isActive ? activeText : baseText,
        isActive ? glow : "",
      ].join(" ")}
    >
      {/* letters with staggered transition */}
      <span className="inline-flex gap-[1px]">
        {label.split("").map((ch, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${i * 40}ms` }}
            className={[
              "inline-block transform-gpu transition-all duration-300",
              isActive ? "opacity-100 translate-y-0" : "opacity-60 translate-y-[2px]",
            ].join(" ")}
          >
            {ch}
          </span>
        ))}
      </span>

      {/* underline grow */}
      <span
        className={[
          "absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300",
          isDark ? "bg-blue-400" : "bg-blue-600",
          isActive ? "w-full opacity-100" : "w-0 opacity-0",
        ].join(" ")}
      />
    </button>
  );
}

/* project cards */

const PROJECTS = [
  {
    title: "Hokiefessor",
    summary: "AI powered class picker using grade data and professor reviews to derisk schedules.",
    stack: ["Python", "ETL", "Databricks"],
    image: "/hokiefessor.png",
    alt: "Syllabai preview",
    links: { demo: "https://devpost.com/software/hokiefessor", code: "https://github.com/josephvutrinh/Hokiefessor" },
  },
  {
    title: "TrainAI",
    summary: "AI fitness planner that generates periodized workouts tailored to goals and equipment.",
    stack: ["React", "FastAPI", "OpenAI"],
    image: "/trainai.png",
    alt: "TrainAI preview",
    links: { demo: "https://trainai-fit.vercel.app/", code: "https://github.com/kurulean/trainai" },
  },
  {
    title: "MissherAI",
    summary: "AI Chatbot that takes user uploads and recreates text conversations that mimic your ex.",
    stack: ["Python", "FasstAPI", "OpenAI"],
    image: "/missherai.png",
    alt: "Typing Rain",
    links: { demo: "https://github.com/kurulean/MissHerAI", code: "https://github.com/kurulean/MissHerAI" },
  },
  {
    title: "Typing Rain Game",
    summary: "Fast paced typing game where words fall like rain and player types to clear them.",
    stack: ["Vite", "Tailwind", "LLM"],
    image: "/typingrain.png",
    alt: "Typing Rain",
    links: { demo: "https://github.com/kurulean/Typing-Rain", code: "https://github.com/kurulean/Typing-Rain" },
  },
];

function ProjectsGrid({ isDark }) {
  const border = isDark ? "border-white/15" : "border-black/10";
  const cardBg = isDark ? "bg-white/5" : "bg-white";
  const detailText = isDark ? "text-neutral-300" : "text-neutral-600";

  return (
    <section id="projects" className="scroll-mt-20 mx-auto max-w-7xl px-5 pt-8 pb-20 md:pt-10 md:pb-24">
      <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
      <p className={`mt-2 ${detailText}`}>A few things I’ve built recently.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} border={border} cardBg={cardBg} detailText={detailText} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, border, cardBg, detailText, isDark }) {
  return (
    <article className={`group rounded-2xl border ${border} overflow-hidden ${cardBg} shadow-sm hover:shadow-lg transition`}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={p.image} alt={p.alt || p.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.15]" />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <p className={`mt-2 ${detailText}`}>{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1.5 text-[12px] border ${border} ${isDark ? "bg-white/5" : "bg-black/5"}`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={p.links.demo}
            className={`rounded-full border px-4 py-2 text-sm ${border} ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
          >
            Live Demo
          </a>
          <a
            href={p.links.code}
            className={`rounded-full px-4 py-2 text-sm ${isDark ? "bg-neutral-800 hover:bg-neutral-700 text-white" : "bg-neutral-900 hover:bg-black text-white"}`}
          >
            Source Code
          </a>
        </div>
      </div>
    </article>
  );
}

/* skills */
const SKILLS = [
  "Python",
  "C++",
  "C#",
  "C",
  "Java",
  "JavaScript",
  "HTML",
  "CSS",
  "React.js",
  "Node.js",
  "Tailwind",
  "TypeScript",
  "SQL",
  "Databricks",
];

function Skills({ isDark }) {
  const chip = isDark ? "bg-white/5 border-white/15" : "bg-black/5 border-black/10";
  const detailText = isDark ? "text-neutral-300" : "text-neutral-600";

  return (
    <section
      id="skills"
      className="scroll-mt-20 mx-auto max-w-7xl px-5 pt-20 md:pt-24 pb-48 md:pb-56"
    >
      <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
      <p className={`mt-3 ${detailText}`}>Tools I use regularly.</p>
      <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-6">
        {SKILLS.map((s) => (
          <li key={s} className={`rounded-xl border ${chip} px-4 py-2.5 text-sm text-center`}>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* socials */
function Social({ href, className, children }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`grid h-11 w-11 place-items-center rounded-full transition ${className}`}
    >
      {children}
    </a>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path
        className="text-sky-500"
        d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.34 18.67H5.67V9.34h2.67v9.33zM7 8.11a1.55 1.55 0 110-3.11 1.55 1.55 0 010 3.11zM18.67 18.67h-2.67v-4.8c0-1.14-.02-2.6-1.58-2.6-1.58 0-1.82 1.23-1.82 2.52v4.88H9.93V9.34h2.56v1.28h.04c.36-.68 1.23-1.4 2.52-1.4 2.7 0 3.22 1.78 3.22 4.09v5.36z"
      />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 .5A12 12 0 000 12.7c0 5.38 3.44 9.94 8.21 11.55.6.11.82-.26.82-.58v-2.1c-3.34.74-4.04-1.62-4.04-1.62-.55-1.41-1.34-1.79-1.34-1.79-1.1-.77.09-.75.09-.75 1.21.09 1.85 1.26 1.85 1.26 1.08 1.86 2.84 1.33 3.54 1.02.11-.8.42-1.33.76-1.63-2.66-.31-5.45-1.35-5.45-6 0-1.33.46-2.41 1.23-3.26-.12-.31-.54-1.57.12-3.27 0 0 1.01-.33 3.31 1.24a11.43 11.43 0 016.02 0c2.31-1.57 3.31-1.24 3.31-1.24.66 1.7.24 2.96.12 3.27.77.85 1.23 1.93 1.23 3.26 0 4.66-2.79 5.69-5.45 6 .43.38.81 1.12.81 2.27v3.37c0 .32.21.7.83.58A12.01 12.01 0 0024 12.7 12 12 0 0012 .5z" />
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
