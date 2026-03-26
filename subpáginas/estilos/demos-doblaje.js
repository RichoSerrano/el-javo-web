/* ============================================================
   DEMOS DOBLAJE - JAVASCRIPT ESPECÍFICO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    // Referencias a elementos
    const masterVideo = document.getElementById('master-video-doblaje');
    const timecodeDisplay = document.getElementById('cineTimecode');
    const charVigilante = document.getElementById('charVigilante');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // --- 1. EFECTO DE TIMECODE DINÁMICO (TIPO CINE) ---
    // Función para formatear el tiempo a formato HH:MM:SS:FF (horas:minutos:segundos:frames)
    function formatTimecode(seconds) {
        if (isNaN(seconds)) seconds = 0;
        
        const date = new Date(null);
        date.setSeconds(seconds);
        
        // Obtenemos HH:MM:SS
        const hhmmss = date.toISOString().substr(11, 8);
        
        // Calculamos los frames (suponiendo 24fps para cine)
        const totalFrames = Math.floor(seconds * 24);
        const frames = (totalFrames % 24).toString().padStart(2, '0');
        
        return `${hhmmss}:${frames}`;
    }

    // Actualizar el timecode continuamente mientras se reproduce
    masterVideo.addEventListener('timeupdate', () => {
        const currentTimecode = formatTimecode(masterVideo.currentTime);
        timecodeDisplay.innerHTML = `REC ${currentTimecode}`;
    });

    // Resetear al terminar el video
    masterVideo.addEventListener('ended', () => {
        timecodeDisplay.innerHTML = `REC 00:00:00:00`;
    });


    // --- 2. INTERACCIÓN DEL ICONO FLOTANTE ---
    // El Guasón "se ríe" al pasar el mouse (un mini-vibrato)
    charVigilante.addEventListener('mouseenter', () => {
        charVigilante.style.animation = 'vibrato 0.2s ease infinite';
    });

    charVigilante.addEventListener('mouseleave', () => {
        charVigilante.style.animation = 'none';
    });

    // Pequeño guiño: Clic en el Guasón detiene/reproduce el video
    charVigilante.addEventListener('click', () => {
        if (masterVideo.paused) {
            masterVideo.play();
        } else {
            masterVideo.pause();
        }
    });

    // CSS para el vibrato (lo inyectamos aquí para simplicidad)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes vibrato {
            0% { transform: translate(0, 0); }
            25% { transform: translate(2px, -2px); }
            50% { transform: translate(0, 0); }
            75% { transform: translate(-2px, 2px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- 3. MENÚ DE NAVEGACIÓN MÓVIL ---
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

});