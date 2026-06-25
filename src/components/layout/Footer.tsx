import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-pop-accent/70">
          &copy; {new Date().getFullYear()} Aarush Karak. Built with precision.
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:worldshaans@gmail.com" className="text-pop-primary hover:text-primary transition-colors" aria-label="Email worldshaans@gmail.com">
            <Mail size={18} />
          </a>
          <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="text-pop-accent hover:text-light transition-colors" aria-label="GitHub profile (opens in new tab)">
            <img src="/images/logos/github.svg" alt="" className="w-5 h-5" aria-hidden="true" loading="lazy" />
          </a>
          <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="text-pop-secondary hover:text-secondary transition-colors" aria-label="LinkedIn profile (opens in new tab)">
            <img src="/images/logos/linkedin.svg" alt="" className="w-5 h-5" aria-hidden="true" loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  )
}
