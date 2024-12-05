particlesJS('snow-container', {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    size: { value: 3, random: true },
    move: { direction: 'bottom', speed: 1 },
    opacity: { value: 0.6, random: true }
  },
  interactivity: {
    events: { onhover: { enable: false } }
  }
});
const numberOfSnowflakes = 100; // Change this for more or fewer flakes
for (let i = 0; i < numberOfSnowflakes; i++) {
  let snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄';
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.top = Math.random() * window.innerHeight + 'px';
  snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;

  document.body.appendChild(snowflake);

  // Add CSS animation for the falling snow
  let style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      0% { transform: translateY(0); }
      100% { transform: translateY(100vh); }
    }
  `;
  document.head.appendChild(style);
}