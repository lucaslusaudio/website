const hero = document.querySelector(".hero");
console.log(hero);
// Partículas flutuando sutilmente pelo fundo
const particlesContainer = document.createElement("div");
particlesContainer.className = "particles";

const PARTICLE_COUNT = 22;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";

  const left = Math.random() * 100;
  const duration = 14 + Math.random() * 12;
  const delay = Math.random() * 20;
  const size = 1 + Math.random() * 2;

  particle.style.left = `${left}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  console.log("Criando partículas");
  particlesContainer.appendChild(particle);
}

if (hero) {
  hero.appendChild(particlesContainer);
}
