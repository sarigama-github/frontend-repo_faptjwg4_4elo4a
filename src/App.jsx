import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Rocket, Telescope, Atom, Menu, Mail, Settings, ChevronUp, Star, Sparkles, LogIn } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function usePageTransitions() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/simulators" element={<SimulatorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  )
}

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CosmicBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl/50 bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="text-cyan-300" />
            <span className="font-semibold tracking-wide">Souradeep Das</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" icon={<Home size={16} />}>Home</NavLink>
            <NavLink to="/projects" icon={<Rocket size={16} />}>Projects</NavLink>
            <NavLink to="/simulators" icon={<Telescope size={16} />}>Simulators</NavLink>
            <NavLink to="/about" icon={<Star size={16} />}>Journey</NavLink>
            <NavLink to="/skills" icon={<Atom size={16} />}>Skills</NavLink>
            <NavLink to="/contact" icon={<Mail size={16} />}>Contact</NavLink>
            <NavLink to="/admin" icon={<Settings size={16} />}>Admin</NavLink>
          </div>
          <button className="md:hidden p-2 rounded-lg bg-white/10" onClick={() => setMenuOpen(v => !v)}>
            <Menu />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 grid gap-2">
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/projects">Projects</MobileLink>
            <MobileLink to="/simulators">Simulators</MobileLink>
            <MobileLink to="/about">Journey</MobileLink>
            <MobileLink to="/skills">Skills</MobileLink>
            <MobileLink to="/contact">Contact</MobileLink>
            <MobileLink to="/admin">Admin</MobileLink>
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-20">{children}</main>

      <motion.button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-cyan-500/20 border border-cyan-300/40 backdrop-blur-xl shadow-[0_0_20px_#22d3ee] ${showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <ChevronUp className="text-cyan-300" />
      </motion.button>
    </div>
  )
}

function NavLink({ to, icon, children }) {
  return (
    <Link to={to} className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function MobileLink({ to, children }) {
  return (
    <Link to={to} className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
      {children}
    </Link>
  )
}

function CosmicBackground() {
  return (
    <div className="fixed inset-0 -z-0">
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 50% -20%, rgba(59,130,246,0.25), transparent 40%), radial-gradient(ellipse at 10% 120%, rgba(14,165,233,0.15), transparent 35%), radial-gradient(ellipse at 90% 120%, rgba(236,72,153,0.15), transparent 35%)' }} />
    </div>
  )
}

function PageContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4"
    >
      {children}
    </motion.div>
  )
}

function HomeHero() {
  const [quote, setQuote] = useState('')
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/quote`).then(r => r.json()).then(d => setQuote(d.quote))
  }, [])
  return (
    <section className="min-h-[80vh] grid place-items-center text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur">
          <Sparkles className="text-cyan-300" size={16} />
          <span className="text-xs tracking-widest uppercase text-cyan-200/80">Entering the Event Horizon…</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Souradeep Das
        </h1>
        <p className="text-lg md:text-2xl text-white/80">Physics • Astrophysics • Quantum Mechanics</p>
        <div className="flex justify-center gap-3">
          <CTA href="#projects" label="View Projects" />
          <CTA href="/simulators" label="Explore Simulators" variant="secondary" />
        </div>
        <p className="text-white/70 max-w-2xl mx-auto italic">{quote}</p>
      </motion.div>
    </section>
  )
}

function CTA({ href, label, variant = 'primary' }) {
  const base = 'px-5 py-2 rounded-xl border backdrop-blur transition shadow-[0_0_30px_rgba(34,211,238,0.25)]'
  const styles = variant === 'primary'
    ? 'bg-cyan-500/20 border-cyan-300/40 hover:bg-cyan-500/30'
    : 'bg-white/5 border-white/15 hover:bg-white/10'
  return <a href={href} className={`${base} ${styles}`}>{label}</a>
}

function HomePage() {
  return (
    <Layout>
      <PageContainer>
        <HomeHero />
        <section id="projects" className="py-16">
          <SectionTitle title="Featured Projects" subtitle="A selection of cosmic explorations" />
          <ProjectsGrid limit={6} />
        </section>
      </PageContainer>
    </Layout>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="text-white/70">{subtitle}</p>
    </div>
  )
}

function ProjectsGrid({ limit }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/projects`).then(r => r.json()).then(setItems)
  }, [])
  const list = limit ? items.slice(0, limit) : items
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((p, i) => (
        <ProjectCard key={i} item={p} />
      ))}
    </div>
  )
}

function ProjectCard({ item }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur relative">
      <div className="h-40 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <div className="text-xs text-white/60">{item.category}</div>
        </div>
        <p className="text-white/70 text-sm mt-1">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {(item.tags || []).map((t, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{t}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <CardButton href="#" label="View" />
          {item.demo_link && <CardButton href={item.demo_link} label="Open Demo" />}
          <CardButton href="#" label="Learn More" variant="ghost" />
        </div>
      </div>
    </motion.div>
  )
}

function CardButton({ href, label, variant }) {
  const base = 'text-xs px-3 py-1.5 rounded-lg border backdrop-blur'
  const styles = variant === 'ghost' ? 'bg-white/0 border-white/10 hover:bg-white/10' : 'bg-white/10 border-white/10 hover:bg-white/20'
  return <a href={href} className={`${base} ${styles}`}>{label}</a>
}

function ProjectsPage() {
  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Projects" subtitle="Interactive research and visualizations" />
          <ProjectsGrid />
        </section>
      </PageContainer>
    </Layout>
  )
}

function SimulatorsPage() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/simulators`).then(r => r.json()).then(setItems)
  }, [])
  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Physics Simulators" subtitle="Playable demos with parameters" />
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((s, i) => (
              <SimulatorCard key={i} item={s} />
            ))}
          </div>
        </section>
      </PageContainer>
    </Layout>
  )
}

function SimulatorCard({ item }) {
  const [running, setRunning] = useState(false)
  const [params, setParams] = useState(() => Object.fromEntries((item.parameters||[]).map(p => [p.key, p.value])))
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="h-44 grid place-items-center bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20">
        <div className={`w-24 h-24 rounded-full border-2 border-cyan-300/50 ${running ? 'animate-pulse' : ''}`} />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="text-xs text-white/60">{running ? 'Running' : 'Idle'}</div>
        </div>
        <p className="text-white/70 text-sm mt-1">{item.description}</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          {(item.parameters||[]).map(p => (
            <label key={p.key} className="text-xs">
              <div className="flex justify-between mb-1"><span>{p.label}</span><span className="text-white/60">{params[p.key]?.toFixed ? params[p.key].toFixed(2) : params[p.key]}</span></div>
              <input type="range" min={p.min} max={p.max} step={p.step} value={params[p.key]} onChange={e => setParams(v => ({...v, [p.key]: parseFloat(e.target.value)}))} className="w-full" />
            </label>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <CardButton href="#" label={running ? 'Stop' : 'Start'} onClick={(e)=>{e.preventDefault(); setRunning(v=>!v)}} />
          <CardButton href="#" label="Reset" onClick={(e)=>{e.preventDefault(); setParams(Object.fromEntries((item.parameters||[]).map(p=>[p.key,p.value])))}} />
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  const [about, setAbout] = useState([])
  useEffect(() => { fetch(`${BACKEND_URL}/api/about`).then(r=>r.json()).then(setAbout) }, [])
  const a = about[0]
  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Journey" subtitle="Milestones and research" />
          {a && (
            <>
              <p className="text-white/80 max-w-3xl">{a.bio}</p>
              <div className="mt-8 space-y-4">
                {(a.journey||[]).map((n, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-cyan-300 text-sm">{n.year}</div>
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-white/70 text-sm">{n.description}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </PageContainer>
    </Layout>
  )
}

function SkillsPage() {
  const [skills, setSkills] = useState([])
  useEffect(() => { fetch(`${BACKEND_URL}/api/skills`).then(r=>r.json()).then(setSkills) }, [])
  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Skills" subtitle="Disciplines and tools" />
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-cyan-300 text-sm">{s.category}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {s.chips.map((c, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    </Layout>
  )
}

function ContactPage() {
  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Contact" subtitle="Glass neon email form" />
          <form action="https://formsubmit.co/souradeep897@gmail.com" method="POST" className="max-w-xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.origin + '/contact?success=1'} />
            <div className="grid gap-4">
              <label className="text-sm">Name<input name="name" required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" /></label>
              <label className="text-sm">Email<input type="email" name="email" required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" /></label>
              <label className="text-sm">Message<textarea name="message" required className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 min-h-[120px]"></textarea></label>
              <button className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-300/40">Send Message</button>
              {new URLSearchParams(window.location.search).get('success') && (
                <div className="text-emerald-300 text-sm">Thanks! Your message has been sent.</div>
              )}
            </div>
          </form>
        </section>
      </PageContainer>
    </Layout>
  )
}

function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [seedStatus, setSeedStatus] = useState(null)

  const upsert = async (model, data) => {
    setLoading(true)
    await fetch(`${BACKEND_URL}/admin/upsert/${model}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data }) })
    setLoading(false)
    alert('Saved!')
  }

  const seed = async () => {
    setLoading(true)
    const r = await fetch(`${BACKEND_URL}/admin/seed`, { method: 'POST' })
    const d = await r.json()
    setSeedStatus(JSON.stringify(d.created))
    setLoading(false)
  }

  return (
    <Layout>
      <PageContainer>
        <section className="py-16">
          <SectionTitle title="Admin Dashboard" subtitle="Update content without coding" />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-2">Home / Hero</div>
              <label className="text-sm block">Title<input value={heroTitle} onChange={e=>setHeroTitle(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10"/></label>
              <label className="text-sm block mt-2">Subtitle<input value={heroSubtitle} onChange={e=>setHeroSubtitle(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10"/></label>
              <button onClick={()=>upsert('hero', { title: heroTitle, subtitle: heroSubtitle })} className="mt-3 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-300/40">Save</button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-2">Quick Actions</div>
              <button onClick={seed} className="px-4 py-2 rounded-xl bg-white/10 border border-white/10">Seed Demo Content</button>
              {seedStatus && <div className="text-xs text-white/70 mt-2">{seedStatus}</div>}
            </div>
          </div>
          {loading && <div className="mt-4 text-white/70">Saving…</div>}
        </section>
      </PageContainer>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={usePageTransitions()} />
      </Routes>
    </BrowserRouter>
  )
}
