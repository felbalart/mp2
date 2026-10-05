import { useState } from 'react'
import blockbusterLogo from './assets/blockbuster_logo.webp'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import TextForm from './components/TextForm'
import SubmittedList, { type SubmittedItem } from './components/SubmittedList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<SubmittedItem[]>([])


  return (
    <>

    </>
  )
}

export default App
