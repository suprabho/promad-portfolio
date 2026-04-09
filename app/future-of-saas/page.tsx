'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Metadata } from 'next'
import './styles.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function FutureOfSaas() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const onScroll = () => {
      let current = ''
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 200) current = s.id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="spaas-page font-sans">
      {/* NAV */}
      <nav className="spaas-nav font-mono">
        <div className="spaas-nav-logo">Autonomous Work Layer — Future of Work</div>
        <div className="spaas-nav-pills">
          {[
            { href: '#pillar-1', label: 'Agentic Browser' },
            { href: '#pillar-2', label: 'Generative UI' },
            { href: '#pillar-3', label: 'Workflows' },
            { href: '#pillar-4', label: 'Output' },
            { href: '#pillar-5', label: 'Natural Language' },
            { href: '#conviction', label: 'Conviction' },
          ].map((pill) => (
            <a
              key={pill.href}
              className={`spaas-nav-pill ${activeSection === pill.href.slice(1) ? 'active' : ''}`}
              href={pill.href}
            >
              {pill.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="spaas-hero">
        <div className="spaas-hero-grid-bg" />
        <div className="spaas-hero-glow" />
        <div className="spaas-hero-glow-2" />

        <motion.div
          className="spaas-hero-label font-mono"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          A Thesis on the Future of Work
        </motion.div>

        <motion.h1
          className="spaas-hero-title font-serif"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Beyond<br /><span className="accent">SaaS.</span>
          <span className="line2">The age of Autonomous Work Layer</span>
        </motion.h1>

        <motion.p
          className="spaas-hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software gave us access. AI gives us intelligence. The next shift isn&apos;t another
          dashboard — it&apos;s an agentic layer that makes the investigator&apos;s judgment the only
          bottleneck that matters.
        </motion.p>

        <motion.div
          className="spaas-hero-cta font-mono"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a href="#pillar-1" className="spaas-btn-primary">Explore the thesis</a>
          <a href="#conviction" className="spaas-btn-ghost">Jump to conviction →</a>
        </motion.div>

        <motion.div
          className="spaas-scroll-hint font-mono"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="spaas-scroll-line" />
          Scroll to explore
        </motion.div>
      </section>

      {/* DIAGNOSIS */}
      <section className="spaas-diagnosis-wrapper">
        <div className="spaas-diagnosis-header">
          <div className="spaas-section-label font-mono" style={{ justifyContent: 'center', marginBottom: 12 }}>
            The Diagnosis
          </div>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 700,
            color: 'var(--spaas-white)',
            letterSpacing: '-0.02em',
          }}>
            You have all the tools. They just don&apos;t talk to each other.
          </h2>
        </div>

        <div className="spaas-diagnosis">
          <FadeIn className="spaas-diag-panel spaas-diag-today">
            <div className="spaas-diag-tag today font-mono">Today — SaaS Reality</div>
            <h3 className="spaas-diag-heading font-serif">The analyst is the middleware</h3>
            <ul className="spaas-diag-list">
              {[
                '14+ browser tabs open for a single investigation — Tracker, blockchain explorers, OFAC lists, case management, reporting tools',
                "Context lives in the analyst's head, not the system. Lost on handoff, lost on leave",
                'Static dashboards designed for the average query, not the forensic edge case',
                'Manual stitching: copy wallet address → paste in explorer → check sanctions list → write report. The human is the glue',
                'You are judged on output quality. You spend 70% of time on process',
              ].map((item, i) => (
                <li key={i}>
                  <span className="spaas-diag-icon today font-mono">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="spaas-diag-panel spaas-diag-tomorrow" delay={0.15}>
            <div className="spaas-diag-tag tomorrow font-mono">Tomorrow — Autonomous Work Layer Vision</div>
            <h3 className="spaas-diag-heading font-serif">The agent is the middleware</h3>
            <ul className="spaas-diag-list">
              {[
                'One work-specific agentic browser that understands your case, your role, your data access — across all your devices',
                'Context graph persists across sessions. The system knows what you investigated last Tuesday',
                "Interfaces that render themselves for the question you asked, not a pre-built screen you navigate to",
                'Autonomous workflows handle the data stitching. You review conclusions, not data pipelines',
                'You spend 70% of time on judgment, strategy, and escalation. Output is everything',
              ].map((item, i) => (
                <li key={i}>
                  <span className="spaas-diag-icon tomorrow font-mono">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* QUOTE BREAK 1 */}
      <div className="spaas-quote-break">
        <FadeIn>
          <p className="spaas-quote-text font-serif">
            &ldquo;The future of blockchain forensics isn&apos;t faster software. It&apos;s software
            that disappears into intelligence.&rdquo;
          </p>
          <div className="spaas-quote-attr font-mono">— Premise / Autonomous Work Layer Thesis</div>
        </FadeIn>
      </div>

      {/* PILLAR 1: AGENTIC BROWSER */}
      <section className="spaas-section" id="pillar-1">
        <div className="spaas-two-col">
          <FadeIn className="pt-2">
            <div className="spaas-section-number font-mono">01 / 05</div>
            <div className="spaas-section-label font-mono">Agentic Browser</div>
            <h2 className="spaas-section-title font-serif">
              One window.<br /><span className="dim">All intelligence.</span>
            </h2>
            <p className="spaas-section-desc">
              Not a SaaS app. Not a browser. A purpose-built workspace that understands who you are,
              what case you&apos;re working, and what tools you&apos;re authorized to use — across
              every device you own.
            </p>
            <div className="spaas-tag-stack font-mono">
              <span className="spaas-tag highlight">Context-aware</span>
              <span className="spaas-tag highlight">Cross-device</span>
              <span className="spaas-tag">Desktop</span>
              <span className="spaas-tag">Tablet</span>
              <span className="spaas-tag">AR Glasses</span>
              <span className="spaas-tag">Session persistence</span>
            </div>
            <div className="spaas-device-strip font-mono">
              <span className="spaas-device-chip active">Desktop</span>
              <span className="spaas-device-arrow">→</span>
              <span className="spaas-device-chip">Laptop</span>
              <span className="spaas-device-arrow">→</span>
              <span className="spaas-device-chip">Tablet</span>
              <span className="spaas-device-arrow">→</span>
              <span className="spaas-device-chip">Meta Glasses</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* BROWSER MOCKUP */}
            <div className="spaas-browser-mockup font-mono">
              <div className="spaas-browser-bar">
                <div className="spaas-browser-dots">
                  <div className="spaas-browser-dot" style={{ background: '#ff5f57' }} />
                  <div className="spaas-browser-dot" style={{ background: '#febc2e' }} />
                  <div className="spaas-browser-dot" style={{ background: '#28c840' }} />
                </div>
                <div className="spaas-browser-url">
                  <span className="lock">🔒</span>
                  <span>forensics.workspace / case-4421 / active</span>
                </div>
              </div>
              <div className="spaas-browser-tabs">
                <div className="spaas-browser-tab active">⬡ Case #4421 — DeFi Exploit</div>
                <div className="spaas-browser-tab">📊 Wallet Cluster A</div>
                <div className="spaas-browser-tab">🔗 Chain Hops</div>
                <div className="spaas-browser-tab">📋 Draft Report</div>
                <div className="spaas-browser-tab" style={{ color: 'var(--spaas-cyan)', opacity: 0.5 }}>+ New Investigation</div>
              </div>
              <div className="spaas-browser-content">
                <div className="spaas-browser-sidebar">
                  <div className="spaas-sidebar-label">Active Case</div>
                  <div className="spaas-sidebar-item active"><div className="spaas-sidebar-dot" />Overview</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Wallet Graph</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Fund Trace</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Entity Map</div>
                  <div className="spaas-sidebar-label">Agent Actions</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" style={{ background: 'var(--spaas-amber)' }} />Sanctions Check</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" style={{ background: 'var(--spaas-amber)' }} />VASP Lookup</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Risk Scoring</div>
                  <div className="spaas-sidebar-label">My Cases</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Case #4408</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Case #4391</div>
                  <div className="spaas-sidebar-item"><div className="spaas-sidebar-dot" />Case #4377</div>
                </div>
                <div className="spaas-browser-main font-sans">
                  <div className="spaas-agent-prompt">
                    <div className="spaas-agent-prompt-icon">⚡</div>
                    <div className="spaas-agent-prompt-text font-mono">
                      Trace fund flow from 0x3a4f... to known exchange hot wallets across chains
                      <span className="spaas-cursor" />
                    </div>
                  </div>
                  <div className="spaas-result-card">
                    <div className="spaas-result-header">
                      <div className="spaas-result-title font-mono">Fund Flow — Cross-chain trace</div>
                      <span className="spaas-badge spaas-badge-risk font-mono">HIGH RISK</span>
                    </div>
                    <div style={{ position: 'relative', height: 90 }}>
                      <svg width="100%" height="100%" viewBox="0 0 380 90" style={{ position: 'absolute', inset: 0 }}>
                        <defs>
                          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,229,255,0.5)" />
                          </marker>
                          <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,60,60,0.7)" />
                          </marker>
                        </defs>
                        <line x1="46" y1="45" x2="114" y2="45" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                        <line x1="146" y1="45" x2="204" y2="28" stroke="rgba(255,179,0,0.4)" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                        <line x1="146" y1="45" x2="204" y2="62" stroke="rgba(255,179,0,0.4)" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                        <line x1="236" y1="28" x2="304" y2="45" stroke="rgba(255,60,60,0.5)" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow-red)" />
                        <line x1="236" y1="62" x2="304" y2="45" stroke="rgba(255,60,60,0.5)" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow-red)" />
                        <circle cx="46" cy="45" r="18" fill="#0d1829" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" />
                        <text x="46" y="43" textAnchor="middle" fill="#00e5ff" fontSize="7" fontFamily="var(--font-space-mono)">0x3a4f</text>
                        <text x="46" y="53" textAnchor="middle" fill="rgba(0,229,255,0.5)" fontSize="6" fontFamily="var(--font-space-mono)">ETH</text>
                        <circle cx="130" cy="45" r="18" fill="#0d1829" stroke="rgba(255,179,0,0.5)" strokeWidth="1.5" />
                        <text x="130" y="43" textAnchor="middle" fill="#ffb300" fontSize="7" fontFamily="var(--font-space-mono)">Bridge</text>
                        <text x="130" y="53" textAnchor="middle" fill="rgba(255,179,0,0.5)" fontSize="6" fontFamily="var(--font-space-mono)">Polygon</text>
                        <circle cx="220" cy="28" r="14" fill="#0d1829" stroke="rgba(255,179,0,0.4)" strokeWidth="1" />
                        <text x="220" y="26" textAnchor="middle" fill="#ffb300" fontSize="6.5" fontFamily="var(--font-space-mono)">0xbb21</text>
                        <text x="220" y="36" textAnchor="middle" fill="rgba(255,179,0,0.5)" fontSize="5.5" fontFamily="var(--font-space-mono)">Mixer</text>
                        <circle cx="220" cy="62" r="14" fill="#0d1829" stroke="rgba(255,179,0,0.4)" strokeWidth="1" />
                        <text x="220" y="60" textAnchor="middle" fill="#ffb300" fontSize="6.5" fontFamily="var(--font-space-mono)">0xcc93</text>
                        <text x="220" y="70" textAnchor="middle" fill="rgba(255,179,0,0.5)" fontSize="5.5" fontFamily="var(--font-space-mono)">Wallet</text>
                        <circle cx="320" cy="45" r="18" fill="#0d1829" stroke="rgba(255,60,60,0.7)" strokeWidth="1.5" />
                        <text x="320" y="43" textAnchor="middle" fill="#ff3c3c" fontSize="7" fontFamily="var(--font-space-mono)">CEX</text>
                        <text x="320" y="53" textAnchor="middle" fill="rgba(255,60,60,0.5)" fontSize="6" fontFamily="var(--font-space-mono)">FLAGGED</text>
                      </svg>
                    </div>
                  </div>
                  <div className="spaas-result-card" style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="font-mono" style={{ fontSize: 10, color: 'var(--spaas-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Risk Summary</div>
                      <span className="spaas-badge spaas-badge-risk font-mono">Action Required</span>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 12, color: 'var(--spaas-subtle)', lineHeight: 1.6 }}>
                      Funds moved via Polygon bridge → 2 mixer hops → flagged exchange deposit. Total:{' '}
                      <strong style={{ color: 'var(--spaas-text)' }}>$2.4M</strong> across{' '}
                      <strong style={{ color: 'var(--spaas-text)' }}>4 chains</strong>. Pattern matches{' '}
                      <span style={{ color: 'var(--spaas-amber)' }}>Lazarus Group</span> typology.
                    </div>
                  </div>
                </div>
                <div className="spaas-right-panel">
                  <div className="spaas-right-label font-mono">Active Agents</div>
                  <div className="spaas-agent-status">
                    <div className="spaas-status-dot spaas-status-running" />
                    <div>
                      <div className="spaas-status-name">Trace Agent</div>
                      <div className="spaas-status-text">Cross-chain hop analysis running...</div>
                    </div>
                  </div>
                  <div className="spaas-agent-status">
                    <div className="spaas-status-dot spaas-status-active" />
                    <div>
                      <div className="spaas-status-name">Sanctions Agent</div>
                      <div className="spaas-status-text">OFAC match confirmed — 0xflag</div>
                    </div>
                  </div>
                  <div className="spaas-agent-status">
                    <div className="spaas-status-dot spaas-status-idle" />
                    <div>
                      <div className="spaas-status-name">Report Agent</div>
                      <div className="spaas-status-text">Awaiting trace completion</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div className="spaas-right-label font-mono">Case Context</div>
                    <div className="font-mono" style={{ fontSize: 11, color: 'var(--spaas-muted)', lineHeight: 1.8, marginTop: 8 }}>
                      <div>Case: #4421</div>
                      <div>Type: DeFi Exploit</div>
                      <div>Started: 2h ago</div>
                      <div>Analyst: You</div>
                      <div style={{ color: 'var(--spaas-amber)' }}>Chains: ETH, MATIC, BNB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="spaas-divider" />

      {/* PILLAR 2: GENERATIVE UI */}
      <section className="spaas-section" id="pillar-2">
        <div className="spaas-two-col reverse">
          <FadeIn>
            <div className="spaas-gen-ui font-mono">
              <div className="spaas-gen-ui-top">
                <div className="spaas-gen-avatar font-serif">A</div>
                <div className="spaas-gen-query font-mono">
                  <strong>&ldquo;Show me risk profile and fund flow for wallet cluster 0x3a4f across the last 90 days&rdquo;</strong>
                </div>
              </div>
              <div className="spaas-gen-body">
                <div className="spaas-gen-card">
                  <div className="spaas-gen-card-label">Total Exposure</div>
                  <div className="spaas-gen-card-value font-serif" style={{ color: 'var(--spaas-red)' }}>$14.2M</div>
                  <div className="spaas-gen-card-sub">↑ 340% vs prior 90d</div>
                  <div className="spaas-sparkline">
                    {[20, 30, 25, 45, 35, 60, 55, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="spaas-spark-bar"
                        style={{
                          height: `${h}%`,
                          background: `rgba(255,60,60,${0.3 + (i / 8) * 0.7})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="spaas-gen-card">
                  <div className="spaas-gen-card-label">Risk Score</div>
                  <div className="spaas-gen-card-value font-serif" style={{ color: 'var(--spaas-amber)' }}>87 / 100</div>
                  <div className="spaas-gen-card-sub">Darknet + Mixer exposure</div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                    <span className="font-mono" style={{ fontSize: 9, padding: '3px 8px', background: 'var(--spaas-red-dim)', color: 'var(--spaas-red)', borderRadius: 2, letterSpacing: '0.08em' }}>SANCTIONS</span>
                    <span className="font-mono" style={{ fontSize: 9, padding: '3px 8px', background: 'var(--spaas-amber-dim)', color: 'var(--spaas-amber)', borderRadius: 2, letterSpacing: '0.08em' }}>MIXER</span>
                    <span className="font-mono" style={{ fontSize: 9, padding: '3px 8px', background: 'var(--spaas-red-dim)', color: 'var(--spaas-red)', borderRadius: 2, letterSpacing: '0.08em' }}>DARKNET</span>
                  </div>
                </div>
                <div className="spaas-gen-card spaas-gen-card-wide">
                  <div className="spaas-gen-card-label">Fund Flow — Last 90 Days</div>
                  <div className="spaas-flow-viz">
                    <div className="spaas-flow-node font-mono" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--spaas-cyan)' }}>0x3a4f (Origin)</div>
                    <span className="spaas-flow-arrow">→</span>
                    <span className="spaas-flow-amount font-mono">$8.1M</span>
                    <span className="spaas-flow-arrow">→</span>
                    <div className="spaas-flow-node font-mono" style={{ background: 'var(--spaas-amber-dim)', border: '1px solid rgba(255,179,0,0.2)', color: 'var(--spaas-amber)' }}>Tornado Fork</div>
                    <span className="spaas-flow-arrow">→</span>
                    <span className="spaas-flow-amount font-mono">split</span>
                    <span className="spaas-flow-arrow">→</span>
                    <div className="spaas-flow-node font-mono" style={{ background: 'var(--spaas-red-dim)', border: '1px solid rgba(255,60,60,0.2)', color: 'var(--spaas-red)' }}>OFAC-listed CEX</div>
                  </div>
                  <div className="spaas-flow-viz" style={{ paddingTop: 0 }}>
                    <div style={{ width: 120 }} />
                    <span style={{ color: 'transparent', fontSize: 12 }}>→</span>
                    <span className="spaas-flow-amount" style={{ opacity: 0 }}>split</span>
                    <span className="spaas-flow-arrow">→</span>
                    <span className="spaas-flow-amount font-mono">$6.1M</span>
                    <span className="spaas-flow-arrow">→</span>
                    <div className="spaas-flow-node font-mono" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>Cross-chain bridge</div>
                    <span className="spaas-flow-arrow">→</span>
                    <div className="spaas-flow-node font-mono" style={{ background: 'var(--spaas-red-dim)', border: '1px solid rgba(255,60,60,0.2)', color: 'var(--spaas-red)' }}>Unattributed</div>
                  </div>
                </div>
                <div className="spaas-gen-insight">
                  <div className="spaas-insight-icon">⚠</div>
                  <div className="spaas-insight-text font-sans">
                    <strong>Agent insight:</strong> The pattern of mixer → bridge → unattributed wallet
                    matches a <strong>high-confidence Lazarus Group typology</strong> from 3 prior
                    cases. Recommended action: freeze attribution, escalate to FIU, cross-reference
                    Case #4391.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="pt-2" delay={0.15}>
            <div className="spaas-section-number font-mono">02 / 05</div>
            <div className="spaas-section-label font-mono">Generative UI</div>
            <h2 className="spaas-section-title font-serif">
              The interface renders <span className="dim">itself.</span>
            </h2>
            <p className="spaas-section-desc">
              Static dashboards are designed for the average query. Forensic work is never average.
              The interface should emerge from what you ask — not force you to navigate to what it
              pre-assumed you&apos;d need.
            </p>
            <div className="spaas-tag-stack font-mono">
              <span className="spaas-tag highlight">Prompt-driven layout</span>
              <span className="spaas-tag highlight">Context-aware rendering</span>
              <span className="spaas-tag">No navigation tax</span>
              <span className="spaas-tag">Output as interface</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="spaas-divider" />

      {/* PILLAR 3: AUTONOMOUS WORKFLOWS */}
      <section className="spaas-section" id="pillar-3">
        <div className="spaas-two-col">
          <FadeIn className="pt-2">
            <div className="spaas-section-number font-mono">03 / 05</div>
            <div className="spaas-section-label font-mono">Autonomous Workflows</div>
            <h2 className="spaas-section-title font-serif">
              Set once.<br /><span className="dim">Runs forever.</span>
            </h2>
            <p className="spaas-section-desc">
              Workflows today live in the analyst&apos;s head. Tomorrow they live in the system —
              configured once, updated as threats evolve, and executed automatically while you focus
              on decisions.
            </p>
            <div className="spaas-tag-stack font-mono">
              <span className="spaas-tag highlight">Trigger-driven</span>
              <span className="spaas-tag highlight">Multi-tool orchestration</span>
              <span className="spaas-tag">Versioned workflows</span>
              <span className="spaas-tag">Human-in-the-loop</span>
              <span className="spaas-tag">Audit trail</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="spaas-workflow-canvas">
              <div className="spaas-wf-grid" />

              {/* Row 1: Trigger */}
              <div className="spaas-wf-row">
                <div className="spaas-wf-node spaas-wf-node-trigger">
                  <div className="spaas-wf-badge spaas-wf-badge-trigger font-mono">T</div>
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-cyan)' }}>Trigger</div>
                  <div className="spaas-wf-node-title">Flagged Wallet Alert</div>
                  <div className="spaas-wf-node-sub font-mono">tx value &gt; $50k</div>
                </div>
                <div className="spaas-wf-connector active" />
                <div className="spaas-wf-node spaas-wf-node-action">
                  <div className="spaas-wf-badge spaas-wf-badge-running font-mono">↻</div>
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-amber)' }}>Agent</div>
                  <div className="spaas-wf-node-title">Trace Fund Flow</div>
                  <div className="spaas-wf-node-sub font-mono">cross-chain, 30d window</div>
                </div>
                <div className="spaas-wf-connector active" />
                <div className="spaas-wf-node spaas-wf-node-action">
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-amber)' }}>Agent</div>
                  <div className="spaas-wf-node-title">Sanctions Check</div>
                  <div className="spaas-wf-node-sub font-mono">OFAC + UN + EU</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="spaas-wf-row" style={{ paddingLeft: 200 }}>
                <div className="spaas-wf-node spaas-wf-node-action">
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-amber)' }}>Agent</div>
                  <div className="spaas-wf-node-title">VASP Risk Profile</div>
                  <div className="spaas-wf-node-sub font-mono">entity enrichment</div>
                </div>
                <div className="spaas-wf-connector" />
                <div className="spaas-wf-node spaas-wf-node-action">
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-amber)' }}>Agent</div>
                  <div className="spaas-wf-node-title">Pattern Match</div>
                  <div className="spaas-wf-node-sub font-mono">typology library v4.2</div>
                </div>
                <div className="spaas-wf-connector active" />
                <div className="spaas-wf-node spaas-wf-node-output">
                  <div className="spaas-wf-badge spaas-wf-badge-done font-mono">✓</div>
                  <div className="spaas-wf-node-label font-mono" style={{ color: 'var(--spaas-green)' }}>Output</div>
                  <div className="spaas-wf-node-title">Brief + Case Update</div>
                  <div className="spaas-wf-node-sub font-mono">3-line summary → analyst</div>
                </div>
              </div>

              <div className="spaas-wf-stats">
                <div className="spaas-wf-stat">
                  <div className="spaas-wf-stat-val font-serif">4.2s</div>
                  <div className="spaas-wf-stat-label font-mono">Avg run time</div>
                </div>
                <div className="spaas-wf-stat">
                  <div className="spaas-wf-stat-val font-serif">
                    <AnimatedCounter target={127} />
                  </div>
                  <div className="spaas-wf-stat-label font-mono">Runs this week</div>
                </div>
                <div className="spaas-wf-stat">
                  <div className="spaas-wf-stat-val font-serif">0</div>
                  <div className="spaas-wf-stat-label font-mono">Analyst hours spent</div>
                </div>
                <div className="spaas-wf-stat">
                  <div className="spaas-wf-stat-val font-serif" style={{ color: 'var(--spaas-green)' }}>
                    <AnimatedCounter target={98} suffix="%" />
                  </div>
                  <div className="spaas-wf-stat-label font-mono">Accuracy rate</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="spaas-divider" />

      {/* PILLAR 4: OUTPUT IS KING */}
      <section className="spaas-section" id="pillar-4">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <div className="spaas-section-number font-mono" style={{ textAlign: 'center', marginBottom: 16 }}>04 / 05</div>
          <div className="spaas-section-label font-mono" style={{ justifyContent: 'center', marginBottom: 20 }}>Output is King</div>
          <h2 className="spaas-section-title font-serif">
            Nobody hired you to click buttons.<br /><span className="dim">They hired you to find truth.</span>
          </h2>
          <p className="spaas-section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
            The company&apos;s context graph — entities, relationships, case histories, risk
            taxonomies — becomes the operating layer. Agents interface with it directly so
            investigators can focus on judgment, not data wrangling.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="spaas-output-grid">
            {[
              {
                icon: '🔍',
                iconBg: 'var(--spaas-cyan-dim)',
                iconColor: 'var(--spaas-cyan)',
                title: 'Sanctions Match Agent',
                body: 'Continuously monitors active case wallets against OFAC, UN, EU lists. Alerts with confidence score and evidence chain. No manual lookups.',
                tag: 'Compliance',
                tagBg: 'var(--spaas-cyan-dim)',
                tagColor: 'var(--spaas-cyan)',
                time: 'Always on',
              },
              {
                icon: '⛓',
                iconBg: 'var(--spaas-amber-dim)',
                iconColor: 'var(--spaas-amber)',
                title: 'DeFi Exploit Trace Agent',
                body: 'Decodes smart contract logs, maps fund movements across bridges, identifies exploit patterns against known typologies — in under 10 seconds.',
                tag: 'Forensics',
                tagBg: 'var(--spaas-amber-dim)',
                tagColor: 'var(--spaas-amber)',
                time: 'On-demand',
              },
              {
                icon: '🏛',
                iconBg: 'var(--spaas-purple-dim)',
                iconColor: 'var(--spaas-purple)',
                title: 'VASP Risk Profile Agent',
                body: 'Aggregates on-chain behavior, regulatory history, geo-location signals, and peer network analysis into a single actionable risk score.',
                tag: 'Intelligence',
                tagBg: 'var(--spaas-purple-dim)',
                tagColor: 'var(--spaas-purple)',
                time: 'Scheduled + On-demand',
              },
              {
                icon: '📋',
                iconBg: 'var(--spaas-green-dim)',
                iconColor: 'var(--spaas-green)',
                title: 'Investigation Brief Agent',
                body: 'Synthesizes case findings into court-ready briefs. Cites chain of evidence. Formats for FIU submission standards automatically.',
                tag: 'Reporting',
                tagBg: 'var(--spaas-green-dim)',
                tagColor: 'var(--spaas-green)',
                time: 'Auto-generated',
              },
              {
                icon: '⚡',
                iconBg: 'var(--spaas-red-dim)',
                iconColor: 'var(--spaas-red)',
                title: 'Cross-case Pattern Agent',
                body: 'Surfaces connections between active cases based on shared wallets, entity overlaps, or behavioral fingerprints. Finds links analysts miss.',
                tag: 'Discovery',
                tagBg: 'var(--spaas-red-dim)',
                tagColor: 'var(--spaas-red)',
                time: 'Continuous',
              },
              {
                icon: '+',
                iconBg: 'var(--spaas-cyan-dim)',
                iconColor: 'var(--spaas-cyan)',
                title: 'Build your own agent',
                body: 'The context graph is the foundation. Any investigative workflow can be encoded as an agent — callable in natural language, auditable, versioned like code.',
                tag: 'Extensible',
                tagBg: 'var(--spaas-cyan-dim)',
                tagColor: 'var(--spaas-cyan)',
                time: 'No-code to API',
                special: true,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="spaas-output-card"
                style={card.special ? { borderColor: 'rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.02)' } : undefined}
              >
                <div className="spaas-output-card-header">
                  <div className="spaas-output-icon" style={{ background: card.iconBg, color: card.iconColor }}>{card.icon}</div>
                  <div className="spaas-output-card-title font-serif" style={card.special ? { color: 'var(--spaas-cyan)' } : undefined}>{card.title}</div>
                </div>
                <div className="spaas-output-card-body" style={card.special ? { color: 'var(--spaas-muted)' } : undefined}>{card.body}</div>
                <div className="spaas-output-card-footer">
                  <span className="spaas-output-tag font-mono" style={{ background: card.tagBg, color: card.tagColor }}>{card.tag}</span>
                  <span className="spaas-output-time font-mono">{card.time}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* QUOTE BREAK 2 */}
      <div className="spaas-quote-break" style={{ background: 'linear-gradient(135deg, rgba(255,179,0,0.02), transparent 50%, rgba(0,229,255,0.03))' }}>
        <FadeIn>
          <p className="spaas-quote-text font-serif">
            &ldquo;The bottleneck should always be human judgment — never data retrieval.&rdquo;
          </p>
          <div className="spaas-quote-attr font-mono">— On the Autonomous Work Layer principle of Output Supremacy</div>
        </FadeIn>
      </div>

      <div className="spaas-divider" />

      {/* PILLAR 5: NATURAL LANGUAGE UI */}
      <section className="spaas-section" id="pillar-5">
        <div className="spaas-two-col">
          <FadeIn className="pt-2">
            <div className="spaas-section-number font-mono">05 / 05</div>
            <div className="spaas-section-label font-mono">Natural Language UI</div>
            <h2 className="spaas-section-title font-serif">
              The interface you already<br /><span className="dim">know how to use.</span>
            </h2>
            <p className="spaas-section-desc">
              Every pillar — the agentic browser, generative UI, autonomous workflows, output-first agents —
              collapses into one interaction primitive. You talk to it. It works. No onboarding. No button
              layouts to memorize. No UI fluency tax.
            </p>
            <div style={{ marginBottom: 32 }}>
              <div style={{ background: 'var(--spaas-surface)', border: '1px solid var(--spaas-border)', borderRadius: '6px 6px 0 0', padding: '20px 24px' }}>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--spaas-red)', textTransform: 'uppercase' as const, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--spaas-red)', display: 'inline-block' }} />
                  Today
                </div>
                <div style={{ fontSize: 13, color: 'var(--spaas-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;I need to learn how the forensics tool visualizes cross-chain hops before I can run this investigation.&rdquo;
                </div>
              </div>
              <div style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.18)', borderTop: 'none', borderRadius: '0 0 6px 6px', padding: '20px 24px' }}>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--spaas-cyan)', textTransform: 'uppercase' as const, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--spaas-cyan)', boxShadow: '0 0 6px var(--spaas-cyan)', display: 'inline-block' }} />
                  Tomorrow
                </div>
                <div style={{ fontSize: 13, color: 'var(--spaas-text)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;Find all cross-chain hops from this wallet cluster in the last 30 days and flag anything matching Lazarus typology.&rdquo;
                </div>
              </div>
            </div>
            <div className="spaas-tag-stack font-mono">
              <span className="spaas-tag highlight">Zero onboarding</span>
              <span className="spaas-tag highlight">Domain expertise &gt; tool expertise</span>
              <span className="spaas-tag">NL workflow config</span>
              <span className="spaas-tag">Context-aware queries</span>
              <span className="spaas-tag">Output layer, not input layer</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ background: '#070c18', border: '1px solid rgba(244,114,182,0.18)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
              <div style={{ background: '#0d1829', borderBottom: '1px solid var(--spaas-border)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="spaas-browser-dots">
                  <div className="spaas-browser-dot" style={{ background: '#ff5f57' }} />
                  <div className="spaas-browser-dot" style={{ background: '#febc2e' }} />
                  <div className="spaas-browser-dot" style={{ background: '#28c840' }} />
                </div>
                <div className="font-mono" style={{ fontSize: 11, color: '#f472b6', letterSpacing: '0.1em' }}>forensics.workspace — natural language</div>
              </div>

              <div style={{ padding: 28, display: 'flex', flexDirection: 'column' as const, gap: 20, minHeight: 500 }}>
                {/* User message 1 */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <div style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.18)', borderRadius: '6px 6px 2px 6px', padding: '12px 16px', maxWidth: '80%' }}>
                    <div style={{ fontSize: 13, color: 'var(--spaas-text)', lineHeight: 1.6 }}>Set up a workflow — alert me whenever any wallet in Case #4421 moves more than $50k, auto-trace it, and brief me in 3 lines.</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #f472b6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
                </div>

                {/* Agent response 1 */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--spaas-cyan-dim)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--spaas-cyan)', fontSize: 13, flexShrink: 0 }}>⚡</div>
                  <div style={{ flex: 1 }}>
                    <div className="font-mono" style={{ fontSize: 10, color: 'var(--spaas-cyan)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' as const }}>Workflow created — active now</div>
                    <div style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)', borderRadius: 6, padding: '14px 16px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 7 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--spaas-subtle)' }}><span className="font-mono" style={{ color: 'var(--spaas-cyan)', fontSize: 9, background: 'var(--spaas-cyan-dim)', padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>TRIGGER</span> Wallet tx in cluster &gt; $50,000</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--spaas-subtle)' }}><span className="font-mono" style={{ color: 'var(--spaas-amber)', fontSize: 9, background: 'var(--spaas-amber-dim)', padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>AGENT</span> Cross-chain fund trace (30d)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--spaas-subtle)' }}><span className="font-mono" style={{ color: 'var(--spaas-amber)', fontSize: 9, background: 'var(--spaas-amber-dim)', padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>AGENT</span> Sanctions + typology match</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--spaas-subtle)' }}><span className="font-mono" style={{ color: 'var(--spaas-green)', fontSize: 9, background: 'var(--spaas-green-dim)', padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>OUTPUT</span> 3-line brief → you</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--spaas-muted)', lineHeight: 1.6 }}>Say <span style={{ color: 'var(--spaas-subtle)', fontStyle: 'italic' }}>&ldquo;pause the workflow&rdquo;</span> or <span style={{ color: 'var(--spaas-subtle)', fontStyle: 'italic' }}>&ldquo;change the threshold to $100k&rdquo;</span> at any time.</div>
                  </div>
                </div>

                {/* User message 2 */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <div style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.18)', borderRadius: '6px 6px 2px 6px', padding: '12px 16px', maxWidth: '80%' }}>
                    <div style={{ fontSize: 13, color: 'var(--spaas-text)', lineHeight: 1.6 }}>What&apos;s the riskiest wallet we&apos;ve seen this week across all open cases?</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #f472b6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
                </div>

                {/* Agent response 2 */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--spaas-cyan-dim)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--spaas-cyan)', fontSize: 13, flexShrink: 0 }}>⚡</div>
                  <div style={{ flex: 1 }}>
                    <div className="font-mono" style={{ fontSize: 10, color: 'var(--spaas-cyan)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' as const }}>Cross-case scan — 6 cases, 2,847 wallets</div>
                    <div style={{ background: 'var(--spaas-red-dim)', border: '1px solid rgba(255,60,60,0.2)', borderRadius: 6, padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div className="font-mono" style={{ fontSize: 11, color: 'var(--spaas-text)' }}>0x7f3a...d921</div>
                        <span className="font-mono" style={{ fontSize: 9, padding: '2px 8px', background: 'var(--spaas-red-dim)', color: 'var(--spaas-red)', borderRadius: 2 }}>SCORE 96</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--spaas-muted)', lineHeight: 1.6 }}>OFAC match confirmed. $8.1M via Tornado fork → Polygon bridge → unattributed cluster. Lazarus Group typology, 94% confidence. Active in Case #4421 and #4408 — possible link.</div>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div style={{ marginTop: 'auto', background: 'rgba(244,114,182,0.04)', border: '1px solid rgba(244,114,182,0.15)', borderRadius: 6, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="font-mono" style={{ flex: 1, fontSize: 12, color: 'var(--spaas-muted)' }}>Ask anything about your cases...<span className="spaas-cursor" style={{ background: '#f472b6' }} /></div>
                  <div className="font-mono" style={{ fontSize: 9, color: 'var(--spaas-muted)', border: '1px solid var(--spaas-border)', padding: '4px 8px', borderRadius: 2, letterSpacing: '0.08em' }}>↵ ENTER</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONVICTION CLOSE */}
      <section className="spaas-conviction" id="conviction">
        <FadeIn>
          <div className="spaas-conviction-eyebrow font-mono">The Conviction</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="spaas-conviction-title font-serif">
            The primitives exist.<br /><em>The integration is the work.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="spaas-conviction-body">
            The future of blockchain intelligence work isn&apos;t another dashboard. It&apos;s an
            agentic layer that understands your domain, your cases, and your standards — and makes
            the gap between a question and a court-ready answer a matter of seconds, not days.
            <br /><br />
            This isn&apos;t speculation. Every component described here is buildable today. The
            question is who assembles them with the right ontology, the right domain knowledge, and
            the conviction to rebuild the workflow from first principles.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="spaas-principles">
            {[
              { num: '01', text: 'Agentic Browser over Web Apps', cls: 'p1' },
              { num: '02', text: 'Generative UI over Static Dashboards', cls: 'p2' },
              { num: '03', text: 'Workflows United by AI, Not Humans', cls: 'p3' },
              { num: '04', text: 'Output is King. Process is Infrastructure.', cls: 'p4' },
              { num: '05', text: 'Natural Language is the Only Interface That Matters.', cls: 'p5' },
            ].map((p) => (
              <div key={p.num} className={`spaas-principle-card ${p.cls}`}>
                <div className="spaas-principle-num font-mono">{p.num}</div>
                <div className="spaas-principle-text font-serif">{p.text}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="spaas-footer">
        <div className="spaas-footer-logo font-mono">Autonomous Work Layer — A Thesis on the Future of Work</div>
        <div className="spaas-footer-tagline font-mono">Autonomous Work Layer / 2025</div>
      </footer>
    </div>
  )
}
