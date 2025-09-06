import { motion } from 'framer-motion';
import '../styles/Plan.css';

const Plan = () => {
  return (
    <motion.div 
      className="plan-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="plan-title">
        <span className="sparkle">✨</span> Princess Potions Game Plan <span className="sparkle">✨</span>
      </h1>

      <section className="plan-section">
        <h2>🎮 Core Mechanics</h2>
        <div className="mechanics-grid">
          <div className="mechanic-card">
            <h3>🧪 Ingredient Mixing</h3>
            <ul>
              <li>Drag & drop colorful liquids into magical cauldron</li>
              <li>Watch ingredients swirl and blend with physics-based animations</li>
              <li>Each liquid has unique properties (color, viscosity, magical essence)</li>
              <li>Support for touch controls and mouse interactions</li>
            </ul>
          </div>
          
          <div className="mechanic-card">
            <h3>💫 Reaction Effects</h3>
            <ul>
              <li>Dynamic bubbling animations based on ingredient combinations</li>
              <li>Real-time color blending using RGB mixing algorithms</li>
              <li>Particle effects: sparkles, smoke puffs, magical glows</li>
              <li>Sound effects for each reaction type</li>
            </ul>
          </div>
          
          <div className="mechanic-card">
            <h3>📜 Recipe System</h3>
            <ul>
              <li>50+ magical recipes to discover</li>
              <li>Combine 2-5 ingredients for different effects</li>
              <li>Order matters for some advanced recipes</li>
              <li>Recipe book tracks discovered combinations</li>
            </ul>
          </div>
          
          <div className="mechanic-card">
            <h3>🌈 Animated Results</h3>
            <ul>
              <li>Flying Potion: butterflies emerge and flutter</li>
              <li>Growth Potion: flowers bloom across screen</li>
              <li>Star Potion: constellations appear</li>
              <li>Rainbow Potion: animated rainbow bridge</li>
              <li>Transform Potion: turns cauldron into different objects</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="plan-section">
        <h2>👑 Single Player Modes</h2>
        <div className="mode-list">
          <div className="mode-card story-mode">
            <h3>📚 Story Mode - Interactive Fairy Tales</h3>
            <p><strong>Objective:</strong> Follow along with narrated adventures while brewing potions</p>
            <ul>
              <li><strong>Voice Narration:</strong> Web Speech API reads stories aloud</li>
              <li><strong>Interactive Pauses:</strong> Story waits for player to add ingredients</li>
              <li><strong>Dynamic Stories:</strong> Tale changes based on potion success</li>
              <li><strong>Chapter System:</strong> Each chapter unlocks new recipes</li>
              <li><strong>Character Voices:</strong> Different voices for narrator and characters</li>
            </ul>
            <div className="story-examples">
              <h4>Story Examples:</h4>
              <ul>
                <li>🏰 "Help Cinderella": Create transformation potions for the ball</li>
                <li>🐉 "Dragon's Sadness": Brew happiness potion for lonely dragon</li>
                <li>🦄 "Unicorn's Garden": Mix growth potions to save magical forest</li>
                <li>🧚 "Fairy Apprentice": Learn from wise fairy godmother</li>
              </ul>
            </div>
          </div>

          <div className="mode-card">
            <h3>📖 Recipe Master (3-5 mins)</h3>
            <p><strong>Objective:</strong> Follow magical recipes to create specific potions</p>
            <ul>
              <li>Progressive difficulty: start with 2-ingredient recipes</li>
              <li>Visual hints system for beginners</li>
              <li>Star rating based on speed and accuracy</li>
              <li>Unlock new ingredients as you progress</li>
              <li>Boss recipes: complex 5-ingredient challenges</li>
              <li><strong>Story Integration:</strong> Optional narration explains recipe origins</li>
            </ul>
          </div>

          <div className="mode-card">
            <h3>🔬 Free Experiment Mode</h3>
            <p><strong>Objective:</strong> Sandbox mode for creative mixing</p>
            <ul>
              <li>All ingredients unlocked</li>
              <li>Discovery journal automatically logs new combinations</li>
              <li>Secret recipes trigger special animations</li>
              <li>Share discoveries with friends</li>
              <li>Easter eggs: rare combinations create surprises</li>
              <li><strong>Story Discovery:</strong> Unlock lore snippets with new recipes</li>
            </ul>
          </div>

          <div className="mode-card">
            <h3>⏱️ Potion Rush</h3>
            <p><strong>Objective:</strong> Serve magical customers quickly</p>
            <ul>
              <li>Cute forest creatures request specific potions</li>
              <li>Queue system with patience meters</li>
              <li>Combo multipliers for quick service</li>
              <li>Power-ups: time freeze, instant mix, customer patience boost</li>
              <li>Daily challenges with leaderboards</li>
              <li><strong>Character Stories:</strong> Each creature has voiced backstory</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="plan-section">
        <h2>👯 Two Player Modes</h2>
        <div className="mode-list">
          <div className="mode-card">
            <h3>🤝 Cooperative Brewing</h3>
            <p><strong>Objective:</strong> Work together to create complex potions</p>
            <ul>
              <li>Split screen or shared screen options</li>
              <li>One player manages liquids, other handles magical powders</li>
              <li>Timing-based challenges requiring coordination</li>
              <li>Special co-op only recipes</li>
              <li>Synchronized celebration animations</li>
            </ul>
          </div>

          <div className="mode-card">
            <h3>⚔️ Potion Duel</h3>
            <p><strong>Objective:</strong> Competitive potion making</p>
            <ul>
              <li>Race mode: same recipe, fastest wins</li>
              <li>Accuracy mode: closest to perfect recipe wins</li>
              <li>Sabotage items: ingredient swap, cauldron shake</li>
              <li>Best of 3/5/7 rounds</li>
              <li>Victory animations unique to each potion</li>
            </ul>
          </div>

          <div className="mode-card">
            <h3>🎯 Guess the Recipe</h3>
            <p><strong>Objective:</strong> Memory and observation challenge</p>
            <ul>
              <li>One player creates, other observes effects</li>
              <li>Limited guesses to recreate the potion</li>
              <li>Hint system: request one ingredient reveal</li>
              <li>Points based on accuracy and speed</li>
              <li>Role swap each round</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="plan-section">
        <h2>🎨 Visual & Audio Design</h2>
        <div className="design-grid">
          <div className="design-card">
            <h3>🌟 Visual Effects</h3>
            <ul>
              <li>Liquid physics simulation</li>
              <li>Particle systems for magical effects</li>
              <li>Dynamic lighting and glow effects</li>
              <li>Smooth color transitions</li>
              <li>Hand-drawn art style option</li>
            </ul>
          </div>
          
          <div className="design-card">
            <h3>🎵 Sound Design</h3>
            <ul>
              <li>Unique pour sounds for each liquid</li>
              <li>Magical chimes for successful recipes</li>
              <li>Ambient castle/forest background music</li>
              <li>Character voices for creatures</li>
              <li>Celebration fanfares</li>
            </ul>
          </div>
          
          <div className="design-card">
            <h3>🎙️ Voice Narration (Web Speech API)</h3>
            <ul>
              <li>Multiple voice options (princess, wizard, fairy)</li>
              <li>Adjustable speed for different age groups</li>
              <li>Pause/resume during gameplay</li>
              <li>Emotional tone changes based on story events</li>
              <li>Ingredient descriptions read aloud</li>
              <li>Accessibility mode: full voice guidance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="plan-section">
        <h2>🚀 Technical Implementation</h2>
        <div className="tech-list">
          <h3>Phase 1: Core Foundation (Current)</h3>
          <ul>
            <li>✅ React + TypeScript setup</li>
            <li>✅ Routing system</li>
            <li>⏳ Basic game component structure</li>
            <li>⏳ Cauldron and ingredient components</li>
          </ul>
          
          <h3>Phase 2: Game Mechanics</h3>
          <ul>
            <li>Drag and drop system (react-dnd)</li>
            <li>Ingredient mixing logic</li>
            <li>Recipe validation system</li>
            <li>Basic animations (Framer Motion)</li>
            <li>Web Speech API integration for narration</li>
            <li>Story mode state management</li>
          </ul>
          
          <h3>Phase 3: Visual Polish</h3>
          <ul>
            <li>Particle effects (react-particles)</li>
            <li>Liquid animation system</li>
            <li>Character animations</li>
            <li>UI polish and responsiveness</li>
          </ul>
          
          <h3>Phase 4: Game Modes</h3>
          <ul>
            <li>Single player mode implementation</li>
            <li>Two player support</li>
            <li>Score tracking and leaderboards</li>
            <li>Save system for progress</li>
          </ul>
        </div>
      </section>

      <section className="plan-section">
        <h2>🎯 Next Steps</h2>
        <ol className="next-steps">
          <li>Create basic game layout with cauldron and ingredient shelf</li>
          <li>Implement drag and drop for ingredients</li>
          <li>Add basic mixing animation and color blending</li>
          <li>Create first 5 recipes with effects</li>
          <li>Add Recipe Master mode prototype</li>
          <li>Implement particle effects system</li>
          <li>Add sound effects and background music</li>
          <li>Create character art for Potion Rush mode</li>
        </ol>
      </section>
    </motion.div>
  );
};

export default Plan;