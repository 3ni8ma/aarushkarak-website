import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted/60">
          &copy; {new Date().getFullYear()} Aarush Karak. Built with precision.
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:worldshaans@gmail.com" className="text-muted hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
          <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-light transition-colors">
            <img src="/images/logos/github.svg" alt="GitHub" className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-secondary transition-colors">
            <img src="/images/logos/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
