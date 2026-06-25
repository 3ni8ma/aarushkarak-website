import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SkipLink from './components/layout/SkipLink'
import ScrollTopButton from './components/layout/ScrollTopButton'
import LoadingScreen from './components/loading/LoadingScreen'
import CustomCursor from './components/cursor/CustomCursor'
import SmoothScroll from './components/layout/SmoothScroll'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const SkillsPage = lazy(() => import('./pages/SkillsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97, rotateX: 3 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.98, rotateX: -2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

function Fallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Loading page">
      <div className="w-8 h-8 border-2 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'rgba(var(--color-primary), 0.3)', borderTopColor: 'transparent' }} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-dark">
        <LoadingScreen />
        <SkipLink />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">
            <Suspense fallback={<Fallback />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                  <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
                  <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
                  <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </SmoothScroll>
        <ScrollTopButton />
      </div>
    </HelmetProvider>
  )
}

export default App
