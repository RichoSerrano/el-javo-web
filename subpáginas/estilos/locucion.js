document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DE LA PLAYLIST PROFESIONAL ---
    const player = document.getElementById('audio-player');
    const tracks = document.querySelectorAll('.playlist-item');

    tracks.forEach(track => {
        track.addEventListener('click', function() {
            const rutaRaw = this.getAttribute('data-src');
            const rutaCodificada = encodeURI(rutaRaw);
            const icon = this.querySelector('i'); // El ícono de FontAwesome

            // CASO A: CLICK EN EL TRACK QUE YA ESTÁ ACTIVO
            if (this.classList.contains('active')) {
                if (!player.paused) {
                    // Si está sonando, pausamos y ponemos ícono de PLAY
                    player.pause();
                    this.classList.remove('playing');
                    icon.classList.replace('fa-pause-circle', 'fa-play-circle');
                } else {
                    // Si está pausado, reanudamos y ponemos ícono de PAUSA
                    player.play();
                    this.classList.add('playing');
                    icon.classList.replace('fa-play-circle', 'fa-pause-circle');
                }
            } 
            // CASO B: CLICK EN UN TRACK DIFERENTE
            else {
                // 1. Limpiar todos los tracks anteriores
                tracks.forEach(t => {
                    t.classList.remove('active', 'playing');
                    const otherIcon = t.querySelector('i');
                    if (otherIcon) {
                        otherIcon.classList.replace('fa-pause-circle', 'fa-play-circle');
                    }
                });

                // 2. Cargar la nueva ruta
                player.src = rutaCodificada;
                player.load();
                
                // 3. Reproducir y actualizar visuales
                player.play()
                    .then(() => {
                        this.classList.add('active', 'playing');
                        icon.classList.replace('fa-play-circle', 'fa-pause-circle');
                    })
                    .catch(err => console.error("Error de reproducción:", err));
            }
        });
    });

    // --- 2. LÓGICA BOTONES DE CONTACTO (EFECTO METAL) ---
    const contactBtns = document.querySelectorAll('.metal-contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('is-active-metal'));
        
        const removeActive = () => btn.classList.remove('is-active-metal');
        btn.addEventListener('mouseup', removeActive);
        btn.addEventListener('mouseleave', removeActive);
    });

    // --- 3. MENÚ DE NAVEGACIÓN MÓVIL ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al document
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Cerrar al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    }

    // Añadir dentro de tu DOMContentLoaded
let currentTrackIndex = 0;
const trackData = Array.from(document.querySelectorAll('.playlist-item')).map(t => ({
    src: t.getAttribute('data-src'),
    title: t.innerText.trim()
}));

const mobilePlayBtn = document.getElementById('mobile-play-pause');
const mobileTitle = document.getElementById('mobile-track-title');
const seekbar = document.getElementById('mobile-seekbar');

function updateMobilePlayer() {
    const track = trackData[currentTrackIndex];
    player.src = encodeURI(track.src);
    mobileTitle.innerText = track.title;
    player.play();
    mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Botón Siguiente
document.getElementById('mobile-next')?.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackData.length;
    updateMobilePlayer();
});

// Botón Anterior
document.getElementById('mobile-prev')?.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + trackData.length) % trackData.length;
    updateMobilePlayer();
});

// Play/Pausa Móvil
mobilePlayBtn?.addEventListener('click', () => {
    if (player.paused) {
        player.play();
        mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        player.pause();
        mobilePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Actualizar Barra de Progreso
player.addEventListener('timeupdate', () => {
    if (!isNaN(player.duration)) {
        seekbar.value = (player.currentTime / player.duration) * 100;
    }

    
});

// Dentro del evento 'timeupdate' del player:
player.addEventListener('timeupdate', () => {
    if (!isNaN(player.duration)) {
        const percentage = (player.currentTime / player.duration) * 100;
        seekbar.value = percentage;
        
        // Esto crea el efecto de "progreso morado" en el fondo de la barra
        seekbar.style.background = `linear-gradient(to right, #8147ff ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
    }
});
});