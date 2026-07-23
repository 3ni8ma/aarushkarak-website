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
    id: 'default',
    label: 'Default',
    colors: { primary: '194 164 255', secondary: '168 124 255', accent: '34 211 238' },
  },
]
