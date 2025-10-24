import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Example translated text */}
      {/* <h1>{t('welcome_message')}</h1> */}
      {/* Hero component (assumed to have translatable text internally) */}
      <Hero/>
    </>
  )
}

export default App
