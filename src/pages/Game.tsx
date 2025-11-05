import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/Game.css';

const Game = () => {
  const [currentIngredients, setCurrentIngredients] = useState<string[]>([]);
  const [isStirring, setIsStirring] = useState(false);
  const [potionResult, setPotionResult] = useState<string | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [recipeStep, setRecipeStep] = useState(0);
  const [recipeFeedback, setRecipeFeedback] = useState<string>('');
  const [stirCount, setStirCount] = useState(0);
  const [fallingIngredients, setFallingIngredients] = useState<{id: string, emoji: string, x: number, y: number}[]>([]);
  
  // Two-player mode states
  const [isTwoPlayerMode, setIsTwoPlayerMode] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [player1Recipe, setPlayer1Recipe] = useState<any>(null);
  const [player2Recipe, setPlayer2Recipe] = useState<any>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [sharedRecipe, setSharedRecipe] = useState<any>(null);
  const [currentTimer, setCurrentTimer] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  // Modal states
  const [showStartModal, setShowStartModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize two-player mode on load
  useEffect(() => {
    if (isTwoPlayerMode) {
      speak("Welcome to Princess Potions! Two-player mode is ready. Player 1, choose your recipe!");
    }
  }, []); // Only run on initial load

  const ingredients = [
    { id: 'moonwater', name: 'Moonwater', color: '#4A90E2', emoji: '💧' },
    { id: 'stardust', name: 'Stardust', color: '#FFD700', emoji: '⭐' },
    { id: 'rosepetal', name: 'Rose Petals', color: '#FF69B4', emoji: '🌹' },
    { id: 'dragonfire', name: 'Dragon Fire', color: '#FF4500', emoji: '🔥' },
    { id: 'unicorntear', name: 'Unicorn Tears', color: '#E6E6FA', emoji: '🦄' },
    { id: 'forestmoss', name: 'Forest Moss', color: '#228B22', emoji: '🌿' },
    { id: 'crystaldust', name: 'Crystal Dust', color: '#B19CD9', emoji: '💎' },
    { id: 'sunbeam', name: 'Sunbeam', color: '#FFA500', emoji: '☀️' },
  ];

  const recipeMasterRecipes = [
    {
      id: 'quick_test',
      name: "Quick Test Potion",
      difficulty: 'Easy',
      description: 'A simple 2-step potion perfect for testing',
      steps: [
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Moonwater flows into the cauldron!' },
        { action: 'stir', count: 1, feedback: '🌟 Perfect! Your test potion is ready!' }
      ],
      completion: '⚡ Quick Test Potion Complete! Ready for action! ⚡'
    },
    {
      id: 'dragons_breath',
      name: "Dragon's Breath Elixir",
      difficulty: 'Medium',
      description: 'A fiery potion that creates dancing flames',
      steps: [
        { action: 'add', ingredient: 'dragonfire', feedback: '🔥 The cauldron heats up with dragon fire!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Sunlight intensifies the flames!' },
        { action: 'stir', count: 2, feedback: '🌪️ The flames swirl into a vortex!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystals make the flames sparkle!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Rose petals add a sweet smoke!' },
        { action: 'stir', count: 3, feedback: '✨ The potion starts to shimmer!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Stardust ignites the final spark!' },
        { action: 'stir', count: 1, feedback: '🎆 Perfect! The Dragon\'s Breath is ready!' }
      ],
      completion: '🐉 Dragon\'s Breath Elixir Complete! 🐉'
    },
    {
      id: 'fairy_garden',
      name: "Fairy Garden Bloom",
      difficulty: 'Hard',
      description: 'Makes flowers bloom instantly with fairy magic',
      steps: [
        { action: 'add', ingredient: 'forestmoss', feedback: '🌿 Fresh moss fills the air with forest scent!' },
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Moonwater makes the moss glow softly!' },
        { action: 'stir', count: 1, feedback: '🌱 Tiny sprouts appear in the mixture!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Rose petals float gracefully!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Unicorn tears add pure magic!' },
        { action: 'stir', count: 4, feedback: '🌸 Flowers begin to bloom in the cauldron!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Stardust makes everything sparkle!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Sunlight energizes the garden!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystal dust preserves the blooms!' },
        { action: 'stir', count: 2, feedback: '🌺 Beautiful flowers bloom everywhere!' }
      ],
      completion: '🧚 Fairy Garden Bloom Complete! Flowers everywhere! 🌸🌺🌻'
    },
    {
      id: 'time_freeze',
      name: "Time Freeze Tonic",
      difficulty: 'Expert',
      description: 'A legendary potion that can slow down time itself',
      steps: [
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystal dust creates a time anchor!' },
        { action: 'add', ingredient: 'moonwater', feedback: '🌙 Moonwater captures the essence of night!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Unicorn tears preserve the magic!' },
        { action: 'stir', count: 5, feedback: '⏰ The potion begins to tick like a clock!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Stardust freezes the moment!' },
        { action: 'add', ingredient: 'forestmoss', feedback: '🌿 Ancient moss adds timeless wisdom!' },
        { action: 'stir', count: 3, feedback: '⏳ Time seems to slow around the cauldron!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Sunlight bends to your will!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Rose petals stop time with beauty!' },
        { action: 'stir', count: 7, feedback: '⏱️ Everything moves in slow motion!' },
        { action: 'add', ingredient: 'dragonfire', feedback: '🔥 Dragon fire seals the time spell!' }
      ],
      completion: '⏰ Time Freeze Tonic Complete! Time bends to your will! ⏰'
    },
    {
      id: 'phoenix_rising',
      name: "Phoenix Rising Potion",
      difficulty: 'Hard',
      description: 'A rebirth elixir that creates magnificent fire birds',
      steps: [
        { action: 'add', ingredient: 'dragonfire', feedback: '🔥 Ancient flames awaken!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Stardust feeds the eternal fire!' },
        { action: 'stir', count: 3, feedback: '🌪️ Flames dance in spirals!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Beauty tempers the wild fire!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Purity guides the phoenix!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Solar power ignites rebirth!' },
        { action: 'stir', count: 5, feedback: '🔥 A phoenix cry echoes through time!' }
      ],
      completion: '🔥🐦 Phoenix Rising Complete! Behold the eternal firebird! 🔥🐦'
    },
    {
      id: 'mermaid_song',
      name: "Mermaid's Enchanting Song",
      difficulty: 'Medium',
      description: 'Captures the haunting melodies of the deep sea',
      steps: [
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Ocean tides respond to lunar pull!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Pure tears create perfect harmony!' },
        { action: 'stir', count: 2, feedback: '🎵 Musical notes float in the air!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystals amplify the melody!' },
        { action: 'add', ingredient: 'forestmoss', feedback: '🌿 Kelp and seaweed join the chorus!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Starlight makes the song sparkle!' },
        { action: 'stir', count: 4, feedback: '🎶 The mermaid\'s song is complete!' }
      ],
      completion: '🧜‍♀️🎵 Mermaid Song Complete! Listen to the ocean\'s melody! 🧜‍♀️🎵'
    },
    {
      id: 'winter_wonderland',
      name: "Winter Wonderland Elixir",
      difficulty: 'Easy',
      description: 'Creates a magical winter scene with sparkling snow',
      steps: [
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Ice crystals begin to form!' },
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Moonwater freezes into snow!' },
        { action: 'stir', count: 1, feedback: '❄️ Snowflakes dance in the air!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Pure magic creates perfect frost!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Stars twinkle in the winter sky!' },
        { action: 'stir', count: 2, feedback: '🌨️ A winter wonderland appears!' }
      ],
      completion: '❄️⛄ Winter Wonderland Complete! Let it snow! ❄️⛄'
    },
    {
      id: 'lightning_storm',
      name: "Thunder & Lightning Brew",
      difficulty: 'Expert',
      description: 'Harness the raw power of storms and electricity',
      steps: [
        { action: 'add', ingredient: 'dragonfire', feedback: '🔥 Lightning seeds planted!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystals conduct electricity!' },
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Storm clouds gather!' },
        { action: 'stir', count: 6, feedback: '⚡ Thunder rumbles in the distance!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Cosmic energy charges the storm!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Solar power intensifies the lightning!' },
        { action: 'stir', count: 4, feedback: '🌩️ Lightning crackles with power!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Pure energy stabilizes the storm!' },
        { action: 'stir', count: 8, feedback: '⚡ The thunder speaks your name!' }
      ],
      completion: '⚡🌩️ Lightning Storm Complete! You command the thunder! ⚡🌩️'
    },
    {
      id: 'butterfly_garden',
      name: "Enchanted Butterfly Garden",
      difficulty: 'Medium',
      description: 'Creates a garden where magical butterflies dance',
      steps: [
        { action: 'add', ingredient: 'forestmoss', feedback: '🌿 A garden meadow takes shape!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Flowers bloom to attract butterflies!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Warm sunshine calls the butterflies!' },
        { action: 'stir', count: 2, feedback: '🦋 The first butterfly appears!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Magical dust makes them shimmer!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Pure joy fills their wings!' },
        { action: 'stir', count: 3, feedback: '🦋🦋 A whole garden of butterflies!' }
      ],
      completion: '🦋🌺 Butterfly Garden Complete! Beauty takes flight! 🦋🌺'
    },
    {
      id: 'cosmic_voyage',
      name: "Cosmic Voyage Elixir",
      difficulty: 'Expert',
      description: 'Travel through space and visit distant galaxies',
      steps: [
        { action: 'add', ingredient: 'stardust', feedback: '⭐ The journey to the stars begins!' },
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Lunar fuel powers the voyage!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Navigation crystals activate!' },
        { action: 'stir', count: 7, feedback: '🌌 Galaxies swirl around you!' },
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 Pure wonder guides your path!' },
        { action: 'add', ingredient: 'dragonfire', feedback: '🔥 Rocket boosters ignite!' },
        { action: 'stir', count: 5, feedback: '🚀 Faster than light travel!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Solar winds fill your sails!' },
        { action: 'add', ingredient: 'forestmoss', feedback: '🌿 Life from distant worlds!' },
        { action: 'stir', count: 9, feedback: '🌟 You\'ve reached the edge of space!' }
      ],
      completion: '🚀🌌 Cosmic Voyage Complete! You\'ve traveled beyond the stars! 🚀🌌'
    },
    {
      id: 'rainbow_unicorn',
      name: "Rainbow Unicorn Dreams",
      difficulty: 'Hard',
      description: 'Summon the most magical creature of all time',
      steps: [
        { action: 'add', ingredient: 'unicorntear', feedback: '🦄 A unicorn\'s essence awakens!' },
        { action: 'add', ingredient: 'stardust', feedback: '⭐ Starlight forms the horn!' },
        { action: 'add', ingredient: 'rosepetal', feedback: '🌹 Love fills the unicorn\'s heart!' },
        { action: 'stir', count: 4, feedback: '🌈 Rainbow colors begin to swirl!' },
        { action: 'add', ingredient: 'crystaldust', feedback: '💎 Crystal hooves touch the ground!' },
        { action: 'add', ingredient: 'moonwater', feedback: '💧 Moonbeams form the mane!' },
        { action: 'add', ingredient: 'sunbeam', feedback: '☀️ Golden light surrounds the unicorn!' },
        { action: 'stir', count: 6, feedback: '🦄 The rainbow unicorn comes to life!' }
      ],
      completion: '🦄🌈 Rainbow Unicorn Dreams Complete! Pure magic incarnate! 🦄🌈'
    }
  ];

  const storySteps = [
    {
      text: "Welcome, young potion maker! Today we'll create the legendary Rainbow Bridge potion. This magical brew will create a beautiful rainbow that sparkles and dances! Are you ready for this adventure?",
      action: null,
      ingredient: null,
      delay: 1000
    },
    {
      text: "First, we need the base of our potion. Add three drops of Crystal Dust - it comes from the caves where diamonds sing! Find the purple Crystal Dust bottle.",
      action: "add",
      ingredient: "crystaldust",
      delay: 500
    },
    {
      text: "Excellent! See how it shimmers like tiny diamonds? Now we need Moonwater to make it flow. The blue Moonwater bottle is waiting for you!",
      action: "add",
      ingredient: "moonwater",
      delay: 500
    },
    {
      text: "Beautiful! The potion is starting to glow! Quick, give it a gentle stir to blend these magical ingredients together.",
      action: "stir",
      ingredient: null,
      delay: 500
    },
    {
      text: "Perfect stirring! Now for the colorful part - add the Rose Petals. They'll give our rainbow its beautiful pink and red colors!",
      action: "add",
      ingredient: "rosepetal",
      delay: 500
    },
    {
      text: "Wonderful! Look at that pink swirl! Now we need the golden warmth of a Sunbeam. It will make our rainbow bright and cheerful!",
      action: "add",
      ingredient: "sunbeam",
      delay: 500
    },
    {
      text: "Oh my, it's getting so bright! Now add the Forest Moss for the green of the rainbow. This magical moss only grows where fairies dance!",
      action: "add",
      ingredient: "forestmoss",
      delay: 500
    },
    {
      text: "Amazing! The colors are almost complete! Time for another stir - this time, stir it with extra magic in your heart!",
      action: "stir",
      ingredient: null,
      delay: 500
    },
    {
      text: "Fantastic stirring! For the final touch, add the Stardust. This will make our rainbow sparkle and come to life!",
      action: "add",
      ingredient: "stardust",
      delay: 500
    },
    {
      text: "One last magical stir to complete the spell! Make it your best stir yet!",
      action: "stir",
      ingredient: null,
      delay: 500
    },
    {
      text: "MAGNIFICENT! You've created the Rainbow Bridge potion! Look at that beautiful rainbow appearing! You are truly a master potion maker! The rainbow will bring joy to everyone who sees it!",
      action: "complete",
      ingredient: null,
      delay: 1000,
      celebration: true
    }
  ];

  const speak = (text: string, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startNarration = () => {
    setIsNarrating(true);
    setCurrentStep(0);
    setCurrentIngredients([]);
    setPotionResult(null);
    speak(storySteps[0].text);
  };

  const stopNarration = () => {
    setIsNarrating(false);
    window.speechSynthesis.cancel();
    setCurrentStep(0);
  };

  const progressStory = (immediate = false) => {
    if (currentStep < storySteps.length - 1) {
      const nextStep = currentStep + 1;
      const delay = immediate ? 0 : (storySteps[currentStep].delay || 500);
      
      setTimeout(() => {
        setCurrentStep(nextStep);
        speak(storySteps[nextStep].text);
        
        // Check if we reached the completion step
        if (storySteps[nextStep].celebration) {
          triggerCelebration();
        }
      }, delay);
    } else {
      setTimeout(() => stopNarration(), 2000);
    }
  };
  
  const createFallingIngredient = (ingredientId: string) => {
    const ingredient = ingredients.find(i => i.id === ingredientId);
    if (!ingredient) return;
    
    // Create multiple falling particles for dramatic effect
    // Position them to fall into the cauldron area (center of screen)
    const particles: {id: string, emoji: string, x: number, y: number}[] = [];
    for (let i = 0; i < 5; i++) {
      particles.push({
        id: `${ingredientId}-${Date.now()}-${i}`,
        emoji: ingredient.emoji,
        x: Math.random() * 200 + 600, // Center around cauldron position
        y: Math.random() * 50 + 150   // Start from ingredient area height
      });
    }
    
    setFallingIngredients(prev => [...prev, ...particles]);
    
    // Remove particles after animation completes
    setTimeout(() => {
      setFallingIngredients(prev => 
        prev.filter(p => !particles.some(newP => newP.id === p.id))
      );
    }, 2000);
  };

  const triggerCelebration = (message?: string) => {
    // Create rainbow effect
    setPotionResult(message || '🌈 Rainbow Bridge Potion! 🌈');
    
    // Add confetti or celebration animation
    const celebration = document.createElement('div');
    celebration.className = 'celebration-overlay';
    celebration.innerHTML = `
      <div class="confetti">🎉</div>
      <div class="confetti">✨</div>
      <div class="confetti">🌟</div>
      <div class="confetti">🎊</div>
      <div class="rainbow-animation">🌈</div>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 5000);
  };
  
  // Timer functions
  const startTimer = () => {
    setCurrentTimer(0);
    timerRef.current = window.setInterval(() => {
      setCurrentTimer(prev => prev + 0.1);
    }, 100);
  };
  
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Two-Player Mode Functions
  const startTwoPlayerMode = () => {
    // Reset everything completely
    setIsTwoPlayerMode(true);
    setCurrentPlayer(1);
    setGameFinished(false);
    setWinner(null);
    setPlayer1Time(0);
    setPlayer2Time(0);
    setPlayer1Recipe(null);
    setPlayer2Recipe(null);
    setSharedRecipe(null);
    setCurrentRecipe(null);
    setRecipeStep(0);
    setCurrentIngredients([]);
    setStirCount(0);
    setPotionResult(null);
    setRecipeFeedback('');
    setShowStartModal(false);
    setShowCompleteModal(false);
    setIsNarrating(false);
    stopTimer();
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    speak("Two player mode activated! Player 1, choose your recipe!");
  };
  
  const startPlayerRecipe = (recipeIndex: number) => {
    const recipe = recipeMasterRecipes[recipeIndex];
    
    if (currentPlayer === 1) {
      setPlayer1Recipe(recipe);
      setSharedRecipe(recipe);
      setShowStartModal(true);
      speak(`Player 1 selected ${recipe.name}. Get ready to start!`);
    } else {
      setPlayer2Recipe(sharedRecipe); // Use same recipe as player 1
      setShowStartModal(true);
      speak(`Player 2, get ready to make ${sharedRecipe?.name}!`);
    }
    
    setCurrentRecipe(null); // Don't start yet, wait for modal start button
    setRecipeStep(0);
    setCurrentIngredients([]);
    setStirCount(0);
    setPotionResult(null);
    setRecipeFeedback('');
  };
  
  const startPlayerTurn = () => {
    const recipe = currentPlayer === 1 ? player1Recipe : sharedRecipe;
    setCurrentRecipe(recipe);
    setRecipeStep(0); // Reset to step 1
    setCurrentIngredients([]); // Clear ingredients
    setStirCount(0); // Reset stir count
    setPotionResult(null); // Clear any previous result
    setGameStartTime(Date.now());
    startTimer();
    setShowStartModal(false); // Close the modal
    setRecipeFeedback(`Player ${currentPlayer} is brewing: ${recipe.name}`);
    speak(`Player ${currentPlayer}, start brewing ${recipe.name} now!`);
  };
  
  const completePlayerRecipe = () => {
    const completionTime = Date.now() - (gameStartTime || 0);
    stopTimer();
    
    if (currentPlayer === 1) {
      setPlayer1Time(completionTime);
      setCurrentPlayer(2);
      setCurrentRecipe(null);
      setCurrentIngredients([]);
      setPotionResult(null);
      setRecipeFeedback('');
      setShowStartModal(true); // Show modal for Player 2
      speak(`Player 1 finished in ${(completionTime / 1000).toFixed(1)} seconds! Player 2, get ready for the same recipe!`);
    } else {
      setPlayer2Time(completionTime);
      setGameFinished(true);
      
      // Determine winner
      const player1TimeSeconds = player1Time / 1000;
      const player2TimeSeconds = completionTime / 1000;
      
      if (player1TimeSeconds < player2TimeSeconds) {
        setWinner('Player 1');
        speak(`Game over! Player 1 wins with ${player1TimeSeconds.toFixed(1)} seconds!`);
      } else if (player2TimeSeconds < player1TimeSeconds) {
        setWinner('Player 2');
        speak(`Game over! Player 2 wins with ${player2TimeSeconds.toFixed(1)} seconds!`);
      } else {
        setWinner('Tie');
        speak(`Amazing! It's a perfect tie! Both players finished in ${player1TimeSeconds.toFixed(1)} seconds!`);
      }
      
      // Show the complete modal instead of inline display
      setShowCompleteModal(true);
    }
  };
  
  const resetTwoPlayerGame = () => {
    setIsTwoPlayerMode(false);
    setCurrentPlayer(1);
    setGameFinished(false);
    setWinner(null);
    setCurrentRecipe(null);
    setCurrentIngredients([]);
    setPotionResult(null);
    setRecipeFeedback('');
    setShowStartModal(false);
    setShowCompleteModal(false);
    setPlayer1Recipe(null);
    setPlayer2Recipe(null);
    setSharedRecipe(null);
    setPlayer1Time(0);
    setPlayer2Time(0);
    stopTimer();
  };

  const playTwoPlayerAgain = () => {
    // Reset game state but keep two-player mode active
    setCurrentPlayer(1);
    setGameFinished(false);
    setWinner(null);
    setCurrentRecipe(null);
    setCurrentIngredients([]);
    setPotionResult(null);
    setRecipeFeedback('');
    setShowStartModal(false);
    setShowCompleteModal(false);
    setPlayer1Recipe(null);
    setPlayer2Recipe(null);
    setSharedRecipe(null);
    setPlayer1Time(0);
    setPlayer2Time(0);
    stopTimer();
    speak("Ready for another two-player duel! Player 1, choose your recipe!");
  };

  // Recipe Master Mode Functions
  const startRecipe = (recipeIndex: number) => {
    const recipe = recipeMasterRecipes[recipeIndex];
    setCurrentRecipe(recipe);
    setRecipeStep(0);
    setCurrentIngredients([]);
    setStirCount(0);
    setPotionResult(null);
    setRecipeFeedback(`Starting: ${recipe.name}`);
    speak(`Let's make ${recipe.name}. ${recipe.description}`);
  };
  
  const checkRecipeProgress = (addedIngredient: string) => {
    if (!currentRecipe || recipeStep >= currentRecipe.steps.length) return;
    
    const currentRecipeStep = currentRecipe.steps[recipeStep];
    
    if (currentRecipeStep.action === 'add' && currentRecipeStep.ingredient === addedIngredient) {
      setRecipeFeedback(currentRecipeStep.feedback);
      speak(currentRecipeStep.feedback);
      setRecipeStep(recipeStep + 1);
      
      // Check if recipe is complete
      if (recipeStep + 1 >= currentRecipe.steps.length) {
        setTimeout(() => {
          triggerCelebration(currentRecipe.completion);
          speak(`Congratulations! ${currentRecipe.completion}`);
          
          if (isTwoPlayerMode) {
            completePlayerRecipe();
          } else {
            setCurrentRecipe(null);
          }
        }, 1000);
      }
    }
  };
  
  const checkStirProgress = () => {
    if (!currentRecipe || recipeStep >= currentRecipe.steps.length) return;
    
    const currentRecipeStep = currentRecipe.steps[recipeStep];
    
    if (currentRecipeStep.action === 'stir') {
      const newStirCount = stirCount + 1;
      setStirCount(newStirCount);
      
      if (newStirCount >= currentRecipeStep.count) {
        setRecipeFeedback(currentRecipeStep.feedback);
        speak(currentRecipeStep.feedback);
        setRecipeStep(recipeStep + 1);
        setStirCount(0);
        
        // Check if recipe is complete
        if (recipeStep + 1 >= currentRecipe.steps.length) {
          setTimeout(() => {
            triggerCelebration(currentRecipe.completion);
            speak(`Congratulations! ${currentRecipe.completion}`);
            
            if (isTwoPlayerMode) {
              completePlayerRecipe();
            } else {
              setCurrentRecipe(null);
            }
          }, 1000);
        }
      } else {
        setRecipeFeedback(`Stir ${newStirCount}/${currentRecipeStep.count} times`);
      }
    }
  };

  const handleIngredientClick = (ingredientId: string) => {
    if (currentIngredients.length < 10) { // Increased limit for complex recipes
      setCurrentIngredients([...currentIngredients, ingredientId]);
      setPotionResult(null);
      
      // Create falling ingredient animation
      createFallingIngredient(ingredientId);
      
      // Check if we're in story mode and if this matches the expected ingredient
      if (isNarrating) {
        const currentStoryStep = storySteps[currentStep];
        if (currentStoryStep.action === 'add' && currentStoryStep.ingredient === ingredientId) {
          progressStory();
        }
      }
      
      // Check progress in recipe mode
      if (currentRecipe && !isNarrating) {
        checkRecipeProgress(ingredientId);
      }
    }
  };

  const handleStir = () => {
    if (currentIngredients.length > 0) {
      setIsStirring(true);
      setTimeout(() => {
        setIsStirring(false);
        
        // Check for different game modes
        if (isNarrating) {
          const currentStoryStep = storySteps[currentStep];
          if (currentStoryStep.action === 'stir') {
            progressStory();
          }
        } else if (currentRecipe) {
          checkStirProgress();
        } else {
          checkRecipe();
        }
      }, 2000);
    }
  };

  const checkRecipe = () => {
    const recipe = currentIngredients.sort().join('-');
    
    const recipes: { [key: string]: string } = {
      'moonwater-stardust': 'Night Sky Potion ✨',
      'dragonfire-rosepetal': 'Love Fire Potion 💕',
      'forestmoss-unicorntear': 'Nature\'s Blessing 🌱',
      'crystaldust-sunbeam': 'Rainbow Prism 🌈',
      'moonwater-rosepetal-stardust': 'Princess Dream Potion 👑',
    };

    setPotionResult(recipes[recipe] || 'Mystery Potion 🎭');
  };

  const resetCauldron = () => {
    setCurrentIngredients([]);
    setPotionResult(null);
  };

  const getMixedColor = () => {
    if (currentIngredients.length === 0) return {
      primary: 'rgba(60, 30, 16, 0.8)',
      secondary: 'rgba(80, 40, 20, 0.6)',
      glow: 'rgba(100, 50, 25, 0.3)'
    };
    
    const colors = currentIngredients.map(id => {
      const ingredient = ingredients.find(i => i.id === id);
      return ingredient?.color || '#4A90E2';
    });

    // Create a more vibrant color mixing
    const colorWeights = colors.reduce((acc, color) => {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      acc.r += r;
      acc.g += g;
      acc.b += b;
      return acc;
    }, { r: 0, g: 0, b: 0 });

    const count = colors.length;
    let finalR = Math.round(colorWeights.r / count);
    let finalG = Math.round(colorWeights.g / count);
    let finalB = Math.round(colorWeights.b / count);
    
    // Ensure colors are vibrant and never muddy
    const brightness = (finalR + finalG + finalB) / 3;
    if (brightness < 80) {
      const boost = 80 - brightness;
      finalR = Math.min(255, finalR + boost);
      finalG = Math.min(255, finalG + boost);
      finalB = Math.min(255, finalB + boost);
    }
    
    // Create magical color variants
    const primary = `rgba(${finalR}, ${finalG}, ${finalB}, 0.9)`;
    const secondary = `rgba(${Math.min(255, finalR + 40)}, ${Math.min(255, finalG + 30)}, ${Math.min(255, finalB + 50)}, 0.7)`;
    const glow = `rgba(${Math.min(255, finalR + 60)}, ${Math.min(255, finalG + 60)}, ${Math.min(255, finalB + 80)}, 0.4)`;

    return { primary, secondary, glow };
  };

  return (
    <div className="game-container">
      {/* Falling ingredients overlay */}
      <div className="falling-ingredients-overlay">
        {fallingIngredients.map((particle) => (
          <motion.div
            key={particle.id}
            className="falling-ingredient"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            animate={{ 
              y: particle.y + 400, 
              opacity: [1, 1, 0.8, 0],
              scale: [1, 1.2, 0.8, 0.5],
              rotate: [0, 180, 360, 540]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeIn",
              times: [0, 0.3, 0.7, 1]
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>
      
      {/* Start Modal */}
      {showStartModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowStartModal(false)}>
              ×
            </button>
            <div className="modal-header">
              <h2>🚀 Player {currentPlayer} Ready? 🚀</h2>
              <p className="modal-subtitle">Get ready to brew the perfect potion!</p>
            </div>
            
            <div className="modal-recipe-info">
              <h3>{currentPlayer === 1 ? player1Recipe?.name : sharedRecipe?.name}</h3>
              <p className={`difficulty ${(currentPlayer === 1 ? player1Recipe?.difficulty : sharedRecipe?.difficulty)?.toLowerCase()}`}>
                {currentPlayer === 1 ? player1Recipe?.difficulty : sharedRecipe?.difficulty}
              </p>
              <p className="recipe-description">
                {currentPlayer === 1 ? player1Recipe?.description : sharedRecipe?.description}
              </p>
              <p className="steps-count">
                {currentPlayer === 1 ? player1Recipe?.steps.length : sharedRecipe?.steps.length} steps to complete
              </p>
              {currentPlayer === 2 && player1Time > 0 && (
                <div style={{marginTop: '1rem', padding: '1rem', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '10px'}}>
                  <strong>🎯 Beat Player 1's time: {(player1Time / 1000).toFixed(1)} seconds!</strong>
                </div>
              )}
            </div>
            
            <button className="modal-start-button" onClick={startPlayerTurn}>
              🏁 START BREWING!
            </button>
          </div>
        </div>
      )}
      
      {/* Game Complete Modal */}
      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>🎉 Game Complete! 🎉</h2>
            </div>
            
            <div className="modal-game-complete">
              <div className="modal-winner">
                {winner === 'Tie' ? '🤝 Perfect Tie!' : `🏆 ${winner} Wins!`}
              </div>
              
              <div className="modal-results">
                <div className={`modal-player-result player1 ${winner === 'Player 1' ? 'winner' : ''}`}>
                  <h4>👤 Player 1</h4>
                  <div className="recipe-name">{player1Recipe?.name}</div>
                  <div className="time">{(player1Time / 1000).toFixed(1)}s</div>
                  {winner === 'Player 1' && <div>🥇 Winner!</div>}
                </div>
                
                <div className={`modal-player-result player2 ${winner === 'Player 2' ? 'winner' : ''}`}>
                  <h4>👤 Player 2</h4>
                  <div className="recipe-name">{player2Recipe?.name || sharedRecipe?.name}</div>
                  <div className="time">{(player2Time / 1000).toFixed(1)}s</div>
                  {winner === 'Player 2' && <div>🥇 Winner!</div>}
                </div>
              </div>
              
              <div className="modal-buttons">
                <button className="modal-button primary" onClick={() => {
                  setShowCompleteModal(false);
                  playTwoPlayerAgain();
                }}>
                  🔄 Play Again
                </button>
                <button className="modal-button secondary" onClick={() => {
                  setShowCompleteModal(false);
                  resetTwoPlayerGame();
                }}>
                  🏠 Main Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="game-header">
        <h1>Princess Potions {isTwoPlayerMode ? '- Two Player Duel' : ''}</h1>
        <div className="game-mode-tabs">
          <button 
            className={`mode-tab ${!currentRecipe && !isTwoPlayerMode ? 'active' : ''}`}
            onClick={() => {
              setCurrentRecipe(null);
              setIsNarrating(false);
              setIsTwoPlayerMode(false);
            }}
          >
            🎲 Free Mix
          </button>
          <button 
            className={`mode-tab ${isNarrating ? 'active' : ''}`}
            onClick={startNarration}
          >
            📚 Story Guide
          </button>
          <button 
            className={`mode-tab ${currentRecipe && !isTwoPlayerMode ? 'active' : ''}`}
            onClick={() => {
              setIsNarrating(false);
              setIsTwoPlayerMode(false);
            }}
          >
            🧪 Recipe Master
          </button>
          <button 
            className={`mode-tab ${isTwoPlayerMode ? 'active' : ''}`}
            onClick={startTwoPlayerMode}
          >
            👥 Two Player
          </button>
        </div>
        
        {isNarrating && (
          <div className="story-narration">
            <p>🎙️ {storySteps[currentStep].text}</p>
            <div className="narration-controls">
              <button className="narration-control stop" onClick={stopNarration}>
                ⏹️ Stop
              </button>
              <button className="narration-control skip" onClick={() => progressStory()}>
                ⏭️ Next Step
              </button>
            </div>
            <div className="story-progress">
              Step {currentStep + 1} of {storySteps.length}
            </div>
          </div>
        )}
      </div>

      <div className="game-area">
        <div className="ingredients-shelf">
          <h2>Magical Ingredients</h2>
          <div className="ingredients-grid">
            {ingredients.map(ingredient => {
              const isHighlighted = isNarrating && 
                storySteps[currentStep]?.action === 'add' && 
                storySteps[currentStep]?.ingredient === ingredient.id;
              
              return (
                <motion.div
                  key={ingredient.id}
                  className={`ingredient-bottle ${isHighlighted ? 'highlighted' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleIngredientClick(ingredient.id)}
                  style={{ backgroundColor: ingredient.color }}
                  animate={isHighlighted ? { scale: [1, 1.1, 1] } : {}}
                  transition={isHighlighted ? { repeat: Infinity, duration: 1.5 } : {}}
                >
                  <span className="ingredient-emoji">{ingredient.emoji}</span>
                  <span className="ingredient-name">{ingredient.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="cauldron-area">
          <motion.div 
            className={`cauldron ${isStirring ? 'stirring' : ''} ${currentIngredients.length > 0 ? 'active' : ''}`}
            animate={isStirring ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ repeat: isStirring ? Infinity : 0, duration: 0.5 }}
          >
            <div 
              className="cauldron-liquid"
              style={{ 
                background: currentIngredients.length > 0 
                  ? `radial-gradient(circle at 30% 40%, ${getMixedColor().secondary}, ${getMixedColor().primary})`
                  : getMixedColor().primary,
                boxShadow: currentIngredients.length > 0 
                  ? `inset 0 0 50px ${getMixedColor().glow}, 0 0 20px ${getMixedColor().glow}`
                  : 'inset 0 0 50px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Liquid surface shimmer */}
              {currentIngredients.length > 0 && (
                <motion.div
                  className="liquid-shimmer"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${getMixedColor().secondary}80, transparent)`
                  }}
                />
              )}

              {/* Enhanced bubble system */}
              {currentIngredients.length > 0 && (
                <div className="bubble-container">
                  {/* Large bubbles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`large-${i}`}
                      className="bubble large"
                      initial={{ scale: 0, x: Math.random() * 200, y: 20 }}
                      animate={{
                        y: [-20, -140],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1.3, 0.8],
                        x: [0, Math.sin(i) * 15, Math.cos(i) * 10, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2 + Math.random() * 2,
                        delay: i * 0.15,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${15 + (i * 8)}%`,
                      }}
                    />
                  ))}

                  {/* Medium bubbles */}
                  {[...Array(18)].map((_, i) => (
                    <motion.div
                      key={`medium-${i}`}
                      className="bubble medium"
                      initial={{ scale: 0, x: Math.random() * 210, y: 15 }}
                      animate={{
                        y: [-15, -100],
                        opacity: [0, 1, 1, 0],
                        scale: [0.3, 0.8, 1, 0.5]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8 + Math.random() * 1.5,
                        delay: i * 0.12,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${12 + (i * 4.5)}%`,
                      }}
                    />
                  ))}

                  {/* Small bubbles */}
                  {[...Array(25)].map((_, i) => (
                    <motion.div
                      key={`small-${i}`}
                      className="bubble small"
                      initial={{ scale: 0, x: Math.random() * 220, y: 10 }}
                      animate={{
                        y: [-10, -80],
                        opacity: [0, 1, 0],
                        scale: [0.2, 0.6, 0.8, 0.3]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5 + Math.random() * 1,
                        delay: i * 0.08,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${8 + (i * 3.5)}%`,
                      }}
                    />
                  ))}

                  {/* Tiny bubbles for extra detail */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={`tiny-${i}`}
                      className="bubble tiny"
                      initial={{ scale: 0, x: Math.random() * 230, y: 5 }}
                      animate={{
                        y: [-5, -60],
                        opacity: [0, 0.8, 0],
                        scale: [0.1, 0.4, 0.5, 0.2]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2 + Math.random() * 0.8,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${5 + (i * 3)}%`,
                      }}
                    />
                  ))}
                  
                  {/* Steam/vapor effects - Enhanced with more particles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`steam-${i}`}
                      className={`steam ${i % 3 === 0 ? 'steam-thick' : i % 3 === 1 ? 'steam-wispy' : 'steam-medium'}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        y: [-20, -200],
                        opacity: [0, 0.8, 0.6, 0],
                        scale: [0.3, 1.5, 2.5, 3.5],
                        x: [0, Math.sin(i * 0.5) * 40, Math.cos(i * 0.3) * 50]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5 + Math.random() * 3,
                        delay: i * 0.15,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${15 + (i * 3.5)}%`,
                      }}
                    />
                  ))}

                  {/* Sparkle particles rising from the potion */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="sparkle-particle"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        y: [-5, -140],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2 + Math.random() * 1.5,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${20 + (i * 5)}%`,
                        color: i % 4 === 0 ? '#FFD700' : i % 4 === 1 ? '#FF69B4' : i % 4 === 2 ? '#87CEEB' : '#98FB98'
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}

                  {/* Magic glow particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`glow-${i}`}
                      className="glow-particle"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        y: [10, -120],
                        opacity: [0, 0.9, 0.7, 0],
                        scale: [0.2, 1.2, 1, 0.5]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + Math.random() * 2,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${25 + (i * 6)}%`,
                        background: getMixedColor().glow
                      }}
                    />
                  ))}
                  
                  {/* Swirling effect */}
                  <div className="swirl-effect">
                    <motion.div
                      className="swirl"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${getMixedColor().secondary}, transparent)`
                      }}
                    />
                  </div>
                  
                  {/* Wooden spoon animation */}
                  {isStirring && (
                    <motion.div
                      className="wooden-spoon"
                      initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        scale: [0.8, 1, 1, 0.9],
                        rotate: [-45, 315, 675, 1035],
                        x: [0, -20, 20, 0],
                        y: [0, -10, 10, 0]
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <div className="spoon-handle"></div>
                      <div className="spoon-bowl"></div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            <div className="cauldron-body">
              <span className="cauldron-icon">🍯</span>
            </div>
          </motion.div>

          <div className="cauldron-controls">
            <motion.button 
              onClick={handleStir} 
              className={`stir-button ${isNarrating && storySteps[currentStep]?.action === 'stir' ? 'highlighted' : ''}`}
              disabled={isStirring}
              animate={isNarrating && storySteps[currentStep]?.action === 'stir' ? 
                { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🥄 Stir Potion
            </motion.button>
            <button onClick={resetCauldron} className="reset-button">
              🔄 Empty Cauldron
            </button>
          </div>

          {potionResult && (
            <motion.div 
              className="potion-result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2>You created:</h2>
              <p className="result-name">{potionResult}</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="success-sparkle"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="recipe-book">
          {currentRecipe && (
            <div className="recipe-instructions">
              <h2>Recipe Instructions</h2>
              {isTwoPlayerMode && gameStartTime && (
                <div className="live-timer">
                  ⏱️ Time: {currentTimer.toFixed(1)}s
                  {player1Time > 0 && currentPlayer === 2 && (
                    <span className="target-time"> | Target: {(player1Time / 1000).toFixed(1)}s</span>
                  )}
                </div>
              )}
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${(recipeStep / currentRecipe.steps.length) * 100}%`}}
                ></div>
              </div>
              {recipeStep < currentRecipe.steps.length ? (
                <p>Step {recipeStep + 1} of {currentRecipe.steps.length}</p>
              ) : (
                <p>Recipe Complete! ✨</p>
              )}
              {recipeFeedback && <p className="recipe-feedback">{recipeFeedback}</p>}
              {currentRecipe.steps[recipeStep] && (
                <div className="current-step">
                  <strong>Next:</strong> {
                    currentRecipe.steps[recipeStep].action === 'add' 
                      ? `Add ${ingredients.find(i => i.id === currentRecipe.steps[recipeStep].ingredient)?.name}`
                      : `Stir ${currentRecipe.steps[recipeStep].count} time${currentRecipe.steps[recipeStep].count > 1 ? 's' : ''}`
                  }
                </div>
              )}
            </div>
          )}
          
          <h2>Current Mix</h2>
          <div className="current-ingredients">
            {currentIngredients.length === 0 ? (
              <p>Click ingredients to add!</p>
            ) : (
              currentIngredients.map((id, index) => {
                const ingredient = ingredients.find(i => i.id === id);
                return (
                  <div key={index} className="added-ingredient">
                    {ingredient?.emoji} {ingredient?.name}
                  </div>
                );
              })
            )}
          </div>
          {!currentRecipe && !gameFinished && !isNarrating && (
            <div className="recipe-selection">
              {!isTwoPlayerMode ? (
                <>
                  <h3>Choose Your Recipe:</h3>
                  {recipeMasterRecipes.map((recipe, index) => (
                    <div key={recipe.id} className="recipe-card" onClick={() => startRecipe(index)}>
                      <h4>{recipe.name}</h4>
                      <p className={`difficulty ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</p>
                      <p className="recipe-description">{recipe.description}</p>
                      <p className="steps-count">{recipe.steps.length} steps</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="two-player-header">
                    <h3>🏆 Two Player Duel - Player {currentPlayer}'s Turn</h3>
                    {player1Recipe && (
                      <div className="player-status">
                        <p>Player 1 completed: <strong>{player1Recipe.name}</strong> in {(player1Time / 1000).toFixed(1)}s</p>
                      </div>
                    )}
                  </div>
                  
                  {currentPlayer === 1 && !player1Recipe && (
                    <>
                      <h3>Player 1, Choose Your Recipe:</h3>
                      {recipeMasterRecipes.map((recipe, index) => (
                        <div key={recipe.id} className="recipe-card" onClick={() => startPlayerRecipe(index)}>
                          <h4>{recipe.name}</h4>
                          <p className={`difficulty ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</p>
                          <p className="recipe-description">{recipe.description}</p>
                          <p className="steps-count">{recipe.steps.length} steps</p>
                        </div>
                      ))}
                    </>
                  )}
                  
                  {player1Recipe && !currentRecipe && !showStartModal && (
                    <div className="start-section">
                      <h3>Recipe Selected: {player1Recipe.name}</h3>
                      <p className="recipe-description">{player1Recipe.description}</p>
                      <p className="steps-count">{player1Recipe.steps.length} steps</p>
                      <p>Get ready! Modal will appear for fair start.</p>
                    </div>
                  )}
                  <button className="cancel-button" onClick={resetTwoPlayerGame}>
                    ❌ Cancel Two Player Mode
                  </button>
                </>
              )}
            </div>
          )}
          
          {gameFinished && (
            <div className="winner-display">
              <h2>🎉 Game Complete! 🎉</h2>
              <div className="final-results">
                <h3>Winner: <span className="winner-name">{winner}</span></h3>
                <div className="player-times">
                  <div className="player-result">
                    <h4>Player 1</h4>
                    <p>Recipe: {player1Recipe?.name}</p>
                    <p>Time: {(player1Time / 1000).toFixed(1)} seconds</p>
                  </div>
                  <div className="player-result">
                    <h4>Player 2</h4>
                    <p>Recipe: {player2Recipe?.name}</p>
                    <p>Time: {(player2Time / 1000).toFixed(1)} seconds</p>
                  </div>
                </div>
                <button className="play-again-button" onClick={resetTwoPlayerGame}>
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Game;