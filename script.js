const morphText = document.getElementById('morphText');
const petalLayer = document.querySelector('.bubble-layer');
const messages = ['SALMA', 'CARA MIA'];
let messageIndex = 0;
let letterIndex = 0;
let morphDirection = 1;
let lastTime = 0;

function animateText(timestamp) {
  if (timestamp - lastTime > 240) {
    const current = messages[messageIndex];
    const next = messages[(messageIndex + 1) % messages.length];
    const letters = morphDirection > 0 ? current : next;
    letterIndex += 1;

    if (letterIndex > letters.length) {
      letterIndex = 0;
      morphDirection *= -1;
      messageIndex = (messageIndex + 1) % messages.length;
    }

    morphText.textContent = letters.slice(0, letterIndex);
    lastTime = timestamp;
  }

  requestAnimationFrame(animateText);
}

function createPetal() {
  const petal = document.createElement('div');
  const sizeClass = ['petal--small', 'petal--medium', 'petal--large'][Math.floor(Math.random() * 3)];
  petal.className = `petal ${sizeClass}`;

  const startLeft = Math.random() * 110;
  const duration = 10 + Math.random() * 10;
  const delay = -Math.random() * 8;

  petal.style.left = `${startLeft}%`;
  petal.style.bottom = `${-80 - Math.random() * 40}px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
  petal.style.opacity = 0.7 + Math.random() * 0.2;

  petalLayer.appendChild(petal);

  setTimeout(() => petal.remove(), (duration + 2) * 1000);
}

function spawnPetals() {
  createPetal();
  createPetal();
  createPetal();
  setTimeout(spawnPetals, 1200);
}

function init() {
  requestAnimationFrame(animateText);
  spawnPetals();
}

init();
