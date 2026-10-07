# 🐍 NEON SNAKE — Cyber Arena

### Classic Arcade. Modern Challenge.

A modern cyberpunk-inspired Snake arcade game built with **HTML5 Canvas, CSS3 and JavaScript**.

NEON SNAKE transforms the classic Snake experience into a fast-paced arcade arena with multiple game modes, dynamic obstacles, power-ups, progressive difficulty, combo scoring, neon visuals and cinematic game-over animations.

---

## 🎮 Live Demo

🌐 **Play NEON SNAKE:**

https://tarunakash66-lgtm.github.io/neon-snake/

📦 **GitHub Repository:**

https://github.com/tarunakash66-lgtm/neon-snake

---

## ✨ Key Features

### 🎮 Multiple Game Modes

- **Classic** — Traditional Snake gameplay with progressive difficulty.
- **Time Rush** — Score as much as possible before time runs out.
- **Survival** — Aggressive gameplay with increasing hazards.

### 🎯 Difficulty System

Choose between:

- 🟢 Rookie
- 🟠 Veteran
- 🔴 Nightmare

Higher difficulties increase movement speed and environmental hazards.

### 🧱 Dynamic Obstacles

The arena contains dangerous obstacles that become more challenging as the threat level increases.

Players must carefully control the snake while avoiding:

- Arena boundaries
- Snake body
- Static hazards
- Increasing obstacle patterns

### ⚡ Power-Ups

Special power-ups can change the gameplay:

- 🛡️ **Shield** — Temporary protection
- ⚡ **Turbo** — Increased movement speed
- 🧲 **Magnet** — Helps attract food
- 🐌 **Slow-Mo** — Temporarily slows the game

### 🏆 Combo Scoring

Collect food continuously to build a combo multiplier and increase your score.

### 📈 Progressive Difficulty

The game dynamically increases its challenge through:

- Faster movement
- More obstacles
- Higher threat levels
- Increased survival pressure

### 💀 Comedic Death System

Game-over screens include contextual animations and messages depending on how the player dies.

Examples:

- 🧱 **WALL BONK!**
- 🐍 **SELF-SABOTAGE!**
- ⚡ **HAZARD SMACK!**
- ⏱️ **TIME OUT!**

Each animation is designed to remain inside the game-over panel without interrupting the overall game experience.

### 🎨 Cyber Arena UI

The interface uses a dark cyberpunk-inspired visual system featuring:

- Red neon highlights
- Purple/magenta accents
- Cyan energy effects
- Glowing arena elements
- Animated particles
- Visual impact effects

### 📱 Responsive Controls

Supports:

- Keyboard controls
- Arrow keys
- WASD
- Mobile swipe controls

### 💾 High Score

Player high scores are stored using browser **Local Storage**, allowing scores to persist between sessions.

---

## 🧠 Game Architecture

```text
PLAYER INPUT
     ↓
DIRECTION UPDATE
     ↓
GAME ENGINE
     ↓
MOVEMENT
     ↓
FOOD / POWER-UP CHECK
     ↓
COLLISION DETECTION
     ↓
SCORE + COMBO + LEVEL
     ↓
CANVAS RENDERING
     ↓
REPEAT GAME LOOP
