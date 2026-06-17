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
            <div className="frosted p-6">
              <p className="text-pop-accent leading-relaxed text-base font-normal">Have a project, collaboration, or just want to connect? I'm always open to discussing new opportunities.</p>
            </div>
            <div className="space-y-4">
              <a href="mailto:worldshaans@gmail.com" className="flex items-center gap-4 text-sm text-pop-primary hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-primary/10 transition-colors"><Mail size={20} /></div>
                <span>worldshaans@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm text-pop-secondary hover:text-secondary transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <defs>
                      <linearGradient id="contact-linkedin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#contact-linkedin-grad)" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>linkedin.com/in/aarush-karak</span>
              </a>
              <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm text-pop-accent hover:text-light transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <defs>
                      <linearGradient id="contact-github-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#contact-github-grad)" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </div>
                <span>github.com/3ni8ma</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-pop-primary">
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
