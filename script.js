const morphText = document.getElementById('morphText');
const bubbleLayer = document.querySelector('.bubble-layer');
const messages = ['SALMA', 'SALMA', 'CARA MIA', 'CARA MIA'];
let messageIndex = 0;
let letterIndex = 0;
let morphDirection = 1;
let lastTime = 0;

function animateText(timestamp) {
  if (timestamp - lastTime > 120) {
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

function createBubble() {
  const bubble = document.createElement('div');
  const sizeClass = ['bubble--small', 'bubble--medium', 'bubble--large'][Math.floor(Math.random() * 3)];
  bubble.className = `bubble ${sizeClass}`;

  const startLeft = Math.random() * 110;
  const duration = 10 + Math.random() * 10;
  const delay = -Math.random() * 8;

  bubble.style.left = `${startLeft}%`;
  bubble.style.bottom = `${-80 - Math.random() * 40}px`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.opacity = 0.7 + Math.random() * 0.2;

  bubbleLayer.appendChild(bubble);

  setTimeout(() => bubble.remove(), (duration + 2) * 1000);
}

function spawnBubbles() {
  createBubble();
  createBubble();
  createBubble();
  setTimeout(spawnBubbles, 1200);
}

function init() {
  requestAnimationFrame(animateText);
  spawnBubbles();
}

init();
