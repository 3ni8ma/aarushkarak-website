export interface Theme {
  id: string
  label: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

export const themes: Theme[] = [
  {
    id: 'editorial',
    label: 'Editorial',
    colors: { primary: '0 0 0', secondary: '136 136 136', accent: '213 247 76' },
  },
]
