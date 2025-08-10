// Configuração do carrossel
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
});

// Efeito de corações caindo
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

// Player do YouTube
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '0',
        width: '0',
        videoId: 'pl_zwfpwmbk', // ID da música que você enviou
        playerVars: { 
            'autoplay': 0, 
            'controls': 0 
        }
    });
}

// Tocar música
function playMusic() {
    if (player) {
        player.playVideo();
    }
}
