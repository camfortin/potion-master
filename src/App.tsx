import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Plan from './pages/Plan';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <motion.div 
            className="nav-container"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Link to="/" className="nav-logo">
              <span className="logo-icon">🧪</span>
              Princess Potions
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Play</Link>
              <Link to="/plan" className="nav-link">Game Plan</Link>
            </div>
          </motion.div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
