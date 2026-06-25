interface Props {
  children: string
  className?: string
}

export default function SectionHeading({ children, className = '' }: Props) {
  return (
    <h2 className={`section-heading ${className}`}>
      {children}
    </h2>
  )
}
