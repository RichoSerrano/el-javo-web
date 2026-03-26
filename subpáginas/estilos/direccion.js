document.addEventListener("DOMContentLoaded", () => {
    const videoMini = document.getElementById('mini-screen-video');
    const playBtn = document.getElementById('btn-play-mini');
    const volFader = document.getElementById('vol-fader-mini');
    const volFill = document.querySelector('.volume-fill-cyber');
    const seekBar = document.getElementById('mobile-seekbar');
    const seekFill = document.querySelector('.seekbar-fill-cyber');
    const currentTimeDisplay = document.getElementById('current-time-mini');
    const totalTimeDisplay = document.getElementById('total-time-mini');

    // 1. Forzar carga manual por si el navegador lo tiene en espera
    videoMini.load();

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Evento Play/Pause
    playBtn.addEventListener('click', () => {
        if (videoMini.paused) {
            videoMini.play().catch(error => console.log("Error al reproducir:", error));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoMini.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Actualizar barra de progreso
    videoMini.addEventListener('timeupdate', () => {
        const percentage = (videoMini.currentTime / videoMini.duration) * 100;
        if (!isNaN(percentage)) {
            seekBar.value = percentage;
            seekFill.style.width = percentage + '%';
            currentTimeDisplay.textContent = formatTime(videoMini.currentTime);
        }
    });

    // Navegación (Seek)
    seekBar.addEventListener('input', () => {
        const time = (seekBar.value / 100) * videoMini.duration;
        videoMini.currentTime = time;
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

    // Volumen
    volFader.addEventListener('input', () => {
        videoMini.volume = volFader.value;
        volFill.style.width = (volFader.value * 100) + '%';
    });

    // Cargar duración al estar listo
    videoMini.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(videoMini.duration);
    });
});