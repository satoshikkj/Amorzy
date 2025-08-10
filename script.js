let player;

// Função que o YouTube chama quando a API está pronta — deve estar no escopo global
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '0',
        width: '0',
        videoId: 'pl_zwfpwmbk', // ID do vídeo que você quer tocar
        playerVars: { 
            'autoplay': 0, 
            'controls': 0 
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player carregado, pode adicionar lógica aqui se quiser
    console.log('Player do YouTube pronto!');
}

function playMusic() {
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
    } else {
        alert('O player ainda não está pronto. Por favor, aguarde um momento e tente novamente.');
    }
}

// Efeito dos corações caindo
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.innerHTML = '❤';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);

// Configuração do carrossel Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
});
