import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './page/home'
import About from './page/about'
import Test from './page/test'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/test">Test</Link></li>
        </ul>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </nav>
    </BrowserRouter>
  )
}

export default App
