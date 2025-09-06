import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-section" variants={itemVariants}>
        <h1 className="hero-title">
          <span className="magic-text">Princess Potions</span>
        </h1>
        <p className="hero-subtitle">Mix magical ingredients, create wonderful potions!</p>
        
        <div className="hero-potions">
          <motion.span 
            className="floating-emoji"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🧪
          </motion.span>
          <motion.span 
            className="floating-emoji"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          >
            ✨
          </motion.span>
          <motion.span 
            className="floating-emoji"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
          >
            🌈
          </motion.span>
        </div>
      </motion.div>

      <motion.div className="game-modes" variants={itemVariants}>
        <h2>Choose Your Adventure</h2>
        <div className="mode-grid">
          <Link to="/game?mode=story" className="mode-tile story">
            <span className="mode-icon">📚</span>
            <h3>Story Mode</h3>
            <p>Follow magical tales and brew potions to help fairy tale characters!</p>
          </Link>
          
          <Link to="/game?mode=recipe" className="mode-tile recipe">
            <span className="mode-icon">📖</span>
            <h3>Recipe Master</h3>
            <p>Learn and master magical recipes</p>
          </Link>
          
          <Link to="/game?mode=experiment" className="mode-tile experiment">
            <span className="mode-icon">🔬</span>
            <h3>Free Experiment</h3>
            <p>Mix anything and discover new potions!</p>
          </Link>
          
          <Link to="/game?mode=rush" className="mode-tile rush">
            <span className="mode-icon">⏱️</span>
            <h3>Potion Rush</h3>
            <p>Serve magical creatures quickly!</p>
          </Link>
        </div>
      </motion.div>

      <motion.div className="features" variants={itemVariants}>
        <h2>Magic Features</h2>
        <div className="feature-list">
          <div className="feature">
            <span>🎨</span>
            <p>Beautiful animations & effects</p>
          </div>
          <div className="feature">
            <span>🎙️</span>
            <p>Voice narrated stories</p>
          </div>
          <div className="feature">
            <span>👯</span>
            <p>Play with friends</p>
          </div>
          <div className="feature">
            <span>🏆</span>
            <p>Unlock new ingredients</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="cta-section" variants={itemVariants}>
        <Link to="/game" className="play-button">
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Brewing! ✨
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;