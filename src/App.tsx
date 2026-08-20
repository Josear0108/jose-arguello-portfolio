import { MotionConfig } from 'framer-motion'
import { CursorProvider } from './components/CursorProvider'
import { Nav } from './components/sections/Nav'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Trajectory } from './components/sections/Trajectory'
import { Stack } from './components/sections/Stack'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CursorProvider>
        <Nav />
        <main>
          <Hero />
          <About />
          <Trajectory />
          <Stack />
          <Projects />
          <Contact />
        </main>
      </CursorProvider>
    </MotionConfig>
  )
}

export default App
