import { useMemo } from 'react'
import * as THREE from 'three'
import { useTheme } from '../contexts/ThemeContext'

export function useThemeColors() {
  const { theme } = useTheme()

  return useMemo(() => {
    const p = theme.colors.primary.split(' ').map(Number)
    const s = theme.colors.secondary.split(' ').map(Number)
    const a = theme.colors.accent.split(' ').map(Number)
    return {
      primary: new THREE.Color(p[0] / 255, p[1] / 255, p[2] / 255),
      secondary: new THREE.Color(s[0] / 255, s[1] / 255, s[2] / 255),
      accent: new THREE.Color(a[0] / 255, a[1] / 255, a[2] / 255),
    }
  }, [theme])
}
