interface Props {
  children: string
  color?: string
}

export default function Tag({ children, color = 'primary' }: Props) {
  const colors: Record<string, string> = {
    primary: 'bg-primary/15 text-primary border-primary/25',
    secondary: 'bg-secondary/15 text-secondary border-secondary/25',
    accent: 'bg-accent/15 text-accent border-accent/25',
  }
  return (
    <span className={`inline-block px-3.5 py-1.5 text-xs font-medium rounded-full border ${colors[color] || colors.primary}`}>
      {children}
    </span>
  )
}
