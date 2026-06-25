import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const SkillsPage = lazy(() => import('./pages/SkillsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Fallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Suspense fallback={<Fallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App

