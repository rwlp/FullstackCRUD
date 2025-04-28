import './App.scss'
import { Routes, Route } from 'react-router-dom'
import FilterPage from './pages/FilterPage/FilterPage'
import { Header } from './components/header/Header'
import FormsPage from './pages/FormsPage/FormsPage'

function App() {
  return (
    <>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<FilterPage />} />
        <Route path='/product' element={<FilterPage />} />
        <Route path='/product/:id' element={<FormsPage />} />
      </Routes>
    </main>
    </>
  )
}

export default App
