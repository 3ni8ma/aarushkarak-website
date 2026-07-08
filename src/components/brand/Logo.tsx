import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Home page">
      <span className="text-lg font-semibold tracking-[0.12em] uppercase text-light/90 transition-colors duration-200">
        AK
      </span>
      <span
        className="w-[1px] h-4 transition-colors duration-200"
        style={{ background: 'rgb(var(--color-primary))' }}
      />
      <span className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
        style={{ color: 'var(--text-muted)' }}>
        Developer
      </span>
    </Link>
  )
}
