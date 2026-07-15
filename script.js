const morphText = document.getElementById('morphText');
const petalLayer = document.querySelector('.bubble-layer');
if (morphText) {
  morphText.textContent = '';
}
const bouquetEl = document.querySelector('.bouquet');
const imageEl = document.querySelector('.image-card');
const messages = ['CARA MIA', 'PUMPKIN', 'LOVE', 'PRINCESS', 'GORGEOUS'];
let messageIndex = 0;
let letterIndex = 0;
let lastTime = 0;
let isHolding = false;
let holdStart = 0;
const tick = 420; // ms between typing each letter (slower)
const holdDuration = 1600; // pause when full name is displayed

function setMediaForMessage(msg) {
  if (!bouquetEl || !imageEl) return;
  if (msg === 'CARA MIA') {
    bouquetEl.classList.add('visible');
    bouquetEl.classList.remove('hidden');
    imageEl.classList.add('hidden');
    imageEl.classList.remove('visible');
  } else {
    imageEl.classList.add('visible');
    imageEl.classList.remove('hidden');
    bouquetEl.classList.add('hidden');
    bouquetEl.classList.remove('visible');
  }
}

function animateText(timestamp) {
  if (!lastTime) lastTime = timestamp;

  if (!isHolding && timestamp - lastTime > tick) {
    const current = messages[messageIndex];
    letterIndex += 1;
    morphText.textContent = current.slice(0, letterIndex);
    lastTime = timestamp;

    if (letterIndex >= current.length) {
      isHolding = true;
      holdStart = timestamp;
      setMediaForMessage(current);
    }
  }

  if (isHolding) {
    if (timestamp - holdStart > holdDuration) {
      // move to next name
      messageIndex = (messageIndex + 1) % messages.length;
      letterIndex = 0;
      isHolding = false;
      lastTime = timestamp;
      // ensure media updates for next message early
      setMediaForMessage(messages[messageIndex]);
    }
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
