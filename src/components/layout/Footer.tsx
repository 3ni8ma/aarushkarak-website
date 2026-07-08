export default function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: '1px solid var(--footer-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted tracking-wide">
            &copy; {new Date().getFullYear()} Aarush Karak
          </p>
          <div className="flex items-center gap-5">
            <a href="mailto:worldshaans@gmail.com" className="text-xs text-muted hover:text-light transition-colors tracking-wide">
              Email
            </a>
            <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-light transition-colors tracking-wide">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-light transition-colors tracking-wide">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
