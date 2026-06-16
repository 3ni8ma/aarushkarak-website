import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Send, Mail, Check, MapPin } from 'lucide-react'

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
    <section className="page-container relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Get in Touch</SectionHeading>
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted leading-relaxed text-base">Have a project, collaboration, or just want to connect? I'm always open to discussing new opportunities.</p>
            <div className="space-y-4">
              <a href="mailto:worldshaans@gmail.com" className="flex items-center gap-4 text-sm text-muted hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-primary/10 transition-colors"><Mail size={20} /></div>
                <span>worldshaans@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm text-muted hover:text-secondary transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                  <img src="/images/logos/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </div>
                <span>linkedin.com/in/aarush-karak</span>
              </a>
              <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm text-muted hover:text-light transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <img src="/images/logos/github.svg" alt="GitHub" className="w-6 h-6" />
                </div>
                <span>github.com/3ni8ma</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-muted">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center"><MapPin size={20} /></div>
                <span>Greater Toronto Area, Canada</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="md:col-span-3 glass rounded-3xl p-8 space-y-5">
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-light text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-light text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
            <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={handleChange} required
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-light text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
            <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={submitted}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all ${
                submitted ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary/80 shadow-lg shadow-primary/30'
              }`}
            >
              {submitted ? <><Check size={18} /> Message sent!</> : <><Send size={18} /> Send Message</>}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}
