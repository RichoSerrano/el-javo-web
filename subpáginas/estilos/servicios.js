document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DEL CARRUSEL ---
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.curso-card-neon');
    
    let currentStep = 0;

    function updateCarousel() {
        if (!cards.length) return;

        // 1. Detectamos cuántas tarjetas se ven según el ancho de pantalla
        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxSteps = cards.length - visibleCards;

        // 2. Aseguramos que el paso actual no se pase del límite si redimensionan la pantalla
        if (currentStep > maxSteps) currentStep = maxSteps;

        // 3. Calculamos el ancho de movimiento (Tarjeta + Gap)
        const firstCard = cards[0];
        const trackStyle = window.getComputedStyle(track);
        const gap = parseInt(trackStyle.gap) || 0;
        const moveAmount = firstCard.offsetWidth + gap;
        
        // 4. Aplicamos el movimiento
        track.style.transform = `translateX(-${currentStep * moveAmount}px)`;

        // 5. Visibilidad y bloqueo de flechas (USANDO maxSteps)
        prevBtn.style.opacity = currentStep === 0 ? "0.3" : "1";
        prevBtn.style.pointerEvents = currentStep === 0 ? "none" : "auto";
        
        nextBtn.style.opacity = currentStep >= maxSteps ? "0.3" : "1";
        nextBtn.style.pointerEvents = currentStep >= maxSteps ? "none" : "auto";
    }

    nextBtn.addEventListener('click', () => {
        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxSteps = cards.length - visibleCards;

        if (currentStep < maxSteps) {
            currentStep++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateCarousel();
        }
    });

    // Ajustar si cambian el tamaño de la pantalla
    window.addEventListener('resize', updateCarousel);
    
    // Llamada inicial
    updateCarousel();
});

    // --- 2. CONTROL DE VIDEOS (AUTO-PAUSA) ---
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.addEventListener('play', () => {
            allVideos.forEach(v => {
                if (v !== video) v.pause();
            });
        });
    });

    // --- 3. MENÚ MÓVIL ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }
