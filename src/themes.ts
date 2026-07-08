export interface Theme {
  id: string
  name: string
  colors: { primary: string; secondary: string; accent: string }
}

export const themes: Theme[] = [
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: { primary: '74 144 217', secondary: '107 168 232', accent: '42 112 176' },
  },
]

export type { Theme as default }
