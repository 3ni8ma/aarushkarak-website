import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { Send, Mail, MapPin, ExternalLink } from 'lucide-react'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(`mailto:worldshaans@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section-container relative" aria-label="Contact">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">Contact</h2>
            <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Have a project or just want to connect? I am always open to new opportunities.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1">
          <ScrollReveal>
            <div className="space-y-5">
              <div className="space-y-3">
                <a href="mailto:worldshaans@gmail.com" className="flex items-center gap-3 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  <Mail size={14} style={{ color: 'rgb(var(--color-primary))' }} />
                  <span>worldshaans@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  <ExternalLink size={14} style={{ color: 'rgb(var(--color-primary))' }} />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  <ExternalLink size={14} style={{ color: 'rgb(var(--color-primary))' }} />
                  <span>GitHub</span>
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin size={14} style={{ color: 'rgb(var(--color-primary))' }} />
                  <span>Greater Toronto Area, Canada</span>
                </div>
              </div>

              <div className="section-divider" />

              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                <label className="sr-only" htmlFor="contact-name">Your Name</label>
                <input id="contact-name" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 text-sm placeholder:text-muted focus:outline-none transition-all" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-light)' }} />
                <label className="sr-only" htmlFor="contact-email">Your Email</label>
                <input id="contact-email" name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-3 text-sm placeholder:text-muted focus:outline-none transition-all" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-light)' }} />
                <label className="sr-only" htmlFor="contact-message">Your Message</label>
                <textarea id="contact-message" name="message" placeholder="Your Message" rows={3} value={form.message} onChange={handleChange} required
                  className="w-full px-4 py-3 text-sm placeholder:text-muted focus:outline-none transition-all resize-none" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-light)' }} />
                <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={submitted} aria-label={submitted ? 'Message sent' : 'Send message'}
                  className={`w-full flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all ${
                    submitted ? 'text-white' : 'text-white hover:opacity-80'
                  }`}
                  style={{ background: submitted ? 'rgb(34,197,94)' : 'rgb(var(--color-primary))' }}
                >
                  {submitted ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Sent</> : <><Send size={13} /> Send</>}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
