// Variables globales
let currentIndex = 0;
let isPlaying = false;
let currentSongIndex = 0;
const slides = document.querySelector('.slides');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const songs = [
    new Audio('Musica/Cigarettes After Sex - Nothing\'s Gonna Hurt You Baby.mp3'),
    new Audio('Musica/Gorillaz - On Melancholy Hill.mp3'),
    new Audio('Musica/ILLENIUM & Sasha Sloan - U & Me.mp3'),
    new Audio('Musica/Imagine Dragons - West Coast.mp3'),
    new Audio('Musica/Joji - Like You Do.mp3'),
    new Audio('Musica/Kali Uchis - Melting.mp3'),
    new Audio('Musica/Kenny Rogers - You Decorated My Life.mp3'),
    new Audio('Musica/Lady Gaga - Shallow ft Bradley Cooper.mp3'),
    new Audio('Musica/Lana Del Rey - Love song.mp3'),
    new Audio('Musica/Lana Del Rey - Queen of Disaster.mp3'),
    new Audio('Musica/Melanie Martinez - Training Wheels.mp3'),
    new Audio('Musica/Metro Boomin - Calling.mp3'),
    new Audio('Musica/Mon Laferte - Primaveral.mp3'),
    new Audio('Musica/Qué Se Siente Que Me Gustes Tanto - Daniel, Me Estás Matando.mp3'),
    new Audio('Musica/Slander - Superhuman feat. Eric Leva.mp3'),
    new Audio('Musica/Stephen Sanchez - Until I Found You.mp3'),
    new Audio('Musica/The Neighbourhood - Stargazing.mp3')
];


const songTitles = [
    "Cigarettes After Sex - Nothing's Gonna Hurt You Baby",
    "Gorillaz - On Melancholy Hill",
    "ILLENIUM & Sasha Sloan - U & Me",
    "Imagine Dragons - West Coast",
    "Joji - Like You Do",
    "Kali Uchis - Melting",
    "Kenny Rogers - You Decorated My Life",
    "Lady Gaga - Shallow ft. Bradley Cooper",
    "Lana Del Rey - Love Song",
    "Lana Del Rey - Queen of Disaster",
    "Melanie Martinez - Training Wheels",
    "Metro Boomin - Calling",
    "Mon Laferte - Primaveral",
    "Qué Se Siente Que Me Gustes Tanto - Daniel, Me Estás Matando",
    "Slander - Superhuman feat. Eric Leva",
    "Stephen Sanchez - Until I Found You",
    "The Neighbourhood - Stargazing"
];


// Elementos de la interfaz
const playPauseButton = document.getElementById('play-pause');
const songTitleElement = document.getElementById('song-title');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');

// Funciones del reproductor de música
function togglePlay() {
    const song = songs[currentSongIndex];
    if (isPlaying) {
        song.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        song.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        song.addEventListener('timeupdate', updateProgressBar);
    }
    isPlaying = !isPlaying;
}

function changeSong(direction) {
    // Pausar la canción actual y reiniciar el tiempo
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;

    // Cambiar el índice de la canción
    currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
    
    // Reproducir la nueva canción si está en reproducción
    if (isPlaying) {
        songs[currentSongIndex].play();
        songs[currentSongIndex].addEventListener('timeupdate', updateProgressBar);
    }
    updateSongTitle();
}

function selectSong(index) {
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;
    currentSongIndex = parseInt(index);
    if (isPlaying) {
        songs[currentSongIndex].play();
    }
    updateSongTitle();
}

function setVolume() {
    songs[currentSongIndex].volume = volumeControl.value;
}

function updateSongTitle() {
    songTitleElement.textContent = songTitles[currentSongIndex];
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const song = songs[currentSongIndex];
    const progress = (song.currentTime / song.duration) * 100;
    progressBar.style.width = progress + '%';
}

// Función para saltar a un punto en la canción
function seekSong(event) {
    const song = songs[currentSongIndex];
    const clickX = event.offsetX;
    const progressWidth = event.target.clientWidth;
    const newTime = (clickX / progressWidth) * song.duration;
    song.currentTime = newTime;
}

// Efectos de partículas en el fondo
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const heartImage = new Image();
heartImage.src = 'Fotos/heart_black.png';
const serpentineImage = new Image();
serpentineImage.src = 'Fotos/serpentine_image.png';

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        const type = Math.random() > 0.5 ? 'heart' : 'serpentine';
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 30 + 20, 
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            type: type
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        if (p.type === 'heart') {
            ctx.drawImage(heartImage, p.x, p.y, p.size, p.size);
        } else if (p.type === 'serpentine') {
            ctx.drawImage(serpentineImage, p.x, p.y, p.size, p.size);
        }
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
}

function animateParticles() {
    drawParticles();
    requestAnimationFrame(animateParticles);
}

// Inicialización al cargar la página
window.addEventListener('load', () => {
    initCanvas();
    animateParticles();
});

// Escuchar eventos
song.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', seekSong);
volumeControl.addEventListener('input', setVolume);
function updateSlider() {
    // Mover las diapositivas
    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    const totalSlides = slides.children.length;

    // Actualizar el índice de la diapositiva actual
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Actualizar el slider
    updateSlider();
}

// Inicializar el slider
updateSlider();
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});


