// SECTIONS & NAVIGATION
const allSections = document.querySelectorAll('.page-section');
let currentSection = 0;

// BUILD NAV DOTS
const dotsContainer = document.getElementById('navDots');
allSections.forEach((sec, i) => {
  const dot = document.createElement('button');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.innerHTML = `<span class="nav-label">${sec.dataset.section}</span>`;
  dot.onclick = () => goToSection(i);
  dotsContainer.appendChild(dot);
});

function goToSection(index) {
  if (index < 0 || index >= allSections.length) return;
  currentSection = index;
  allSections[index].scrollIntoView({ behavior: 'smooth' });
  updateActiveDot();
  updateProgress();
}

function updateActiveDot() {
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSection);
  });
}

function updateProgress() {
  const pct = ((currentSection) / (allSections.length - 1)) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
}

function startJourney() {
  goToSection(1);
  const music = document.getElementById('bgMusic');
  if (music && music.paused) {
    music.play().then(() => {
      document.getElementById('musicBtn').classList.add('playing');
    }).catch(e => console.log("Audio autoplay blocked"));
  }
}

// SCROLL OBSERVER
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const idx = Array.from(allSections).indexOf(e.target);
      if (idx !== -1) {
        currentSection = idx;
        updateActiveDot();
        updateProgress();
      }
    }
  });
}, { threshold: 0.3 });

allSections.forEach(s => sectionObserver.observe(s));

// MUSIC TOGGLE
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
if (musicBtn && bgMusic) {
  musicBtn.onclick = () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.classList.add('playing');
    } else {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
    }
  };
}

// GALLERY LIGHTBOX
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = img.src;
  lb.classList.add('active');
}

// CONFETTI EFFECT
function triggerConfetti(count = 120) {
  const colors = ['#f472b6','#a78bfa','#fbbf24','#34d399','#60a5fa','#fb923c','#f43f5e'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = Math.random() * 10 + 6;
    const isCircle = Math.random() > 0.5;
    
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -20px;
      width: ${size}px;
      height: ${isCircle ? size : size * 2.5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${isCircle ? '50%' : '2px'};
      animation-duration: ${Math.random() * 2 + 2}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// BACKGROUND PARTICLES GENERATOR
function createBgParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255,255,255,${Math.random() * 0.3});
      border-radius: 50%;
      top: ${Math.random() * 100}vh;
      left: ${Math.random() * 100}vw;
      pointer-events: none;
    `;
    container.appendChild(p);
  }
}
createBgParticles();


// BALLOONS
function triggerBalloons(count = 25) {
  const colors = ['#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#60a5fa', '#f43f5e'];
  
  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.setProperty('--b-color', color);
    
    const left = Math.random() * 100;
    const sizeMult = Math.random() * 0.5 + 0.8; 
    const duration = Math.random() * 4 + 4; 
    const delay = Math.random() * 1.5;
    
    balloon.style.left = `${left}vw`;
    balloon.style.transform = `scale(${sizeMult})`;
    balloon.style.animationDuration = `${duration}s`;
    balloon.style.animationDelay = `${delay}s`;
    
    document.body.appendChild(balloon);
    
    setTimeout(() => balloon.remove(), (duration + delay) * 1000);
  }
}

// BLOW OUT CANDLES
function blowOutCandle() {
  const flame = document.getElementById('candleFlame');
  const btn = document.querySelector('.blow-btn');
  const instruction = document.getElementById('cakeInstruction');
  
  if (flame && !flame.classList.contains('extinguished')) {
    flame.classList.add('extinguished');
    
    if (btn) {
      btn.style.opacity = '0';
      setTimeout(() => btn.style.display = 'none', 300);
    }

    if (instruction) {
      instruction.innerText = "Yay! Happy Birthday! 🎉🎂";
      instruction.style.color = "var(--accent)";
      instruction.style.fontSize = "1.5rem";
      instruction.style.textShadow = "0 0 20px var(--glow)";
    }
    
    triggerBalloons(35);
    triggerConfetti(150); 
  }
}

// ENVELOPE OPENING FUNCTION
function openEnvelope() {
  const env = document.querySelector('.envelope');
  if (env && !env.classList.contains('open')) {
    env.classList.add('open');
    // إطلاق بعض الكونفيتي البسيط احتفالاً بفتح الرسالة
    triggerConfetti(60);
  }
}

// LUCIDE ICONS
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// LOADER REMOVAL
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hide');
    }
  }, 1500); 
});
  
