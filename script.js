// === Controle dos modais ===
const openMainModalBtn = document.getElementById('openMainModal');
const closeMainModalBtn = document.getElementById('closeMainModal');
const mainModal = document.getElementById('mainModal');

const openGalleryModalBtn = document.getElementById('openGalleryModal');
const closeGalleryModalBtn = document.getElementById('closeGalleryModal');
const galleryModal = document.getElementById('galleryModal');

// Abrir modais
openMainModalBtn.addEventListener('click', () => {
  mainModal.classList.remove('hidden');
  mainModal.focus();
});
openGalleryModalBtn.addEventListener('click', () => {
  galleryModal.classList.remove('hidden');
  galleryModal.focus();
  startHearts(); // inicia corações animados no modal galeria
});

// Fechar modais
closeMainModalBtn.addEventListener('click', () => {
  mainModal.classList.add('hidden');
});
closeGalleryModalBtn.addEventListener('click', () => {
  galleryModal.classList.add('hidden');
  stopHearts(); // para corações animados
});

// Fechar modal ao clicar fora do conteúdo modal
window.addEventListener('click', (e) => {
  if (e.target === mainModal) mainModal.classList.add('hidden');
  if (e.target === galleryModal) {
    galleryModal.classList.add('hidden');
    stopHearts();
  }
});

// Fechar modais ao apertar ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!mainModal.classList.contains('hidden')) mainModal.classList.add('hidden');
    if (!galleryModal.classList.contains('hidden')) {
      galleryModal.classList.add('hidden');
      stopHearts();
    }
  }
});

// === Contador de dias juntos (desde 18/07/2025) ===
function updateDaysTogether() {
  const startDate = new Date('2025-07-18T00:00:00');
  const today = new Date();
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysElem = document.getElementById('daysTogether');
  if (daysElem) {
    daysElem.textContent = diffDays;
  }
}
updateDaysTogether();

// === Zoom nas fotos da galeria ===
const galleryContainer = document.getElementById('galleryContainer');
if (galleryContainer) {
  galleryContainer.addEventListener('click', (e) => {
    if (
      e.target.tagName === 'IMG' &&
      e.target.parentElement.classList.contains('polaroid-photo')
    ) {
      const clickedPhoto = e.target.parentElement;
      if (clickedPhoto.classList.contains('zoomed')) {
        clickedPhoto.classList.remove('zoomed');
      } else {
        document.querySelectorAll('.polaroid-photo.zoomed').forEach((photo) => {
          photo.classList.remove('zoomed');
        });
        clickedPhoto.classList.add('zoomed');
      }
    }
  });
}

// === Animação corações caindo no modal da galeria ===
const heartLayer = document.getElementById('heartLayer');
let heartInterval;

function createHeart() {
  if (galleryModal.classList.contains('hidden')) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 24 + 16) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  heart.innerHTML = '❤';

  if (heartLayer) {
    heartLayer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }
}

function startHearts() {
  if (!heartInterval) {
    heartInterval = setInterval(createHeart, 500);
  }
}

function stopHearts() {
  if (heartInterval) {
    clearInterval(heartInterval);
    heartInterval = null;
  }
}

// === Efeito corações flutuantes no fundo da página (fora do modal) ===
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  heart.innerHTML = '❤';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createFloatingHeart, 500);

// === Inicializar Swiper após DOM e script carregarem ===
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.vertical-swiper', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: true,
    });
  }
});

// === Botão voltar ao topo ===
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// === YouTube Player (precisa do <div id="ytplayer"></div> no HTML) ===
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '0',
    width: '0',
    videoId: 'pl_zwfpwmbk', // ATENÇÃO: verificar ID correto do vídeo
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  console.log('Player do YouTube pronto!');
}

function playMusic() {
  if (player && typeof player.playVideo === 'function') {
    player.playVideo();
  } else {
    alert('O player ainda não está pronto. Aguarde um momento e tente novamente.');
  }
}
