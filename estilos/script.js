document.addEventListener('DOMContentLoaded', () => {
        
    /* --- A. LÓGICA DE NAVEGACIÓN (Hamburguesa) --- */
    const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Cerrar el menú si se hace clic afuera
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
    }
});

    /* --- B. LÓGICA DEL BUSCADOR --- */
    const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const paginas = [
    { titulo: "Demos de Locución", url: "subpáginas/locucion.html", tags: ["voces", "demo", "locutor"] },
    { titulo: "Solicita tu Brief", url: "subpáginas/brief.HTML", tags: ["contacto", "cotizar", "presupuesto", "formulario"] },
    { titulo: "Demos de Doblaje", url: "doblaje.html", tags: ["personajes", "cine", "actuación", "javo"] }, // <-- AQUÍ FALTABA LA COMA
    { titulo: "Servicios", url: "servicios.html", tags: ["narración", "e-learning", "capacitación"] },
    { titulo: "Trayectoria / Curricula", url: "curricula.HTML", tags: ["historia", "experiencia", "biografía", "javo"] }
];

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const busqueda = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            if (busqueda.length < 2) { searchResults.style.display = 'none'; return; }

            const filtrados = paginas.filter(p => p.titulo.toLowerCase().includes(busqueda) || p.tags.some(t => t.includes(busqueda)));
            
            if (filtrados.length > 0) {
                filtrados.forEach(p => {
                    const div = document.createElement('div');
                    div.className = 'result-item'; // Asegúrate de tener este estilo en CSS
                    div.innerHTML = `<a href="${p.url}" style="color:white; text-decoration:none; display:block; padding:10px;">${p.titulo}</a>`;
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.innerHTML = '<div style="padding:10px; color:red;">No hay resultados</div>';
            }
            searchResults.style.display = 'block';
        });
    }

    /* --- C. LÓGICA DEL CARRUSEL DE VIDEO (Tu código original) --- */
    const slides = document.getElementById('slides');
    // ... aquí va todo tu código de startX, currentIndex, updateSlider y handleEnd ...
    // ... que ya tenías funcionando perfectamente ...

    /* --- D. EFECTO DE BOTONES 3D --- */
    const buttons = document.querySelectorAll('.custom-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('is-active'));
        btn.addEventListener('touchstart', () => btn.classList.add('is-active'), {passive: true});
        const removeActive = () => btn.classList.remove('is-active');
        btn.addEventListener('mouseup', removeActive);
        btn.addEventListener('mouseleave', removeActive);
        btn.addEventListener('touchend', removeActive, {passive: true});
    });
});
    
    // 1. Lógica del Carrusel (Deslizar)
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.dot');
    let startX = 0;
    let currentIndex = 0;

    if (slides) {
        const updateSlider = (index) => {
            slides.style.transform = `translateX(-${(index * 100) / 3}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            
            const allVideos = slides.querySelectorAll('video');
            allVideos.forEach((v, i) => {
                if(i === index) v.play();
                else { v.pause(); v.currentTime = 0; }
            });
        };

        // Eventos Mouse y Touch para deslizar
        slides.addEventListener('mousedown', e => startX = e.pageX);
        slides.addEventListener('touchstart', e => startX = e.touches[0].pageX, {passive: true});

        const handleEnd = (endX) => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < 2) currentIndex++;
                else if (diff < 0 && currentIndex > 0) currentIndex--;
                updateSlider(currentIndex);
            }
        };

        slides.addEventListener('mouseup', e => handleEnd(e.pageX));
        slides.addEventListener('touchend', e => handleEnd(e.changedTouches[0].pageX), {passive: true});

        // 2. Lógica de Audio (Click en el carrusel)
        slides.addEventListener('click', (e) => {
            // NUEVA REGLA: Si el clic fue en un enlace o un icono dentro de un enlace, IGNORAR
            if (e.target.closest('a')) {
                return; 
            }

            const currentVideo = slides.querySelectorAll('video')[currentIndex];
            if (currentVideo) {
                currentVideo.muted = !currentVideo.muted;
                const hint = document.querySelector('.video-hint');
                if (hint) {
                    hint.textContent = currentVideo.muted ? "MUDO" : "AUDIO ACTIVADO";
                    hint.style.background = currentVideo.muted ? "rgba(255,0,0,0.7)" : "rgba(0,255,0,0.7)";
                    setTimeout(() => {
                        hint.textContent = "DESLIZA PARA VER MÁS • CLICK PARA AUDIO";
                        hint.style.background = "rgba(0,0,0,0.7)";
                    }, 2000);
                }
            }
        });
    } // <--- ESTA ES LA LLAVE QUE FALTABA PARA CERRAR EL 'if (slides)'

    // 3. Efecto de Botones Neón
    const buttons = document.querySelectorAll('.custom-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('is-active'));
        btn.addEventListener('touchstart', () => btn.classList.add('is-active'), {passive: true});
        const removeActive = () => btn.classList.remove('is-active');
        btn.addEventListener('mouseup', removeActive);
        btn.addEventListener('mouseleave', removeActive);
        btn.addEventListener('touchend', removeActive, {passive: true});
    
// Asegúrate de que el evento de los botones esté BIEN cerrado
const buttons = document.querySelectorAll('.custom-btn');
buttons.forEach(btn => {
    btn.addEventListener('mousedown', () => btn.classList.add('is-active'));
    btn.addEventListener('touchstart', () => btn.classList.add('is-active'), {passive: true});
    
    const removeActive = () => btn.classList.remove('is-active');
    
    btn.addEventListener('mouseup', removeActive);
    btn.addEventListener('mouseleave', removeActive);
    btn.addEventListener('touchend', removeActive, {passive: true});
});

// Cierre correcto del DOMContentLoaded


});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnContacto');
    const modal = document.getElementById('modalContacto');
    const overlay = document.getElementById('overlayContacto');
    const btnCerrar = document.getElementById('cerrarModal');

    if (btn && modal) {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            overlay.style.display = 'block';
        });

        const ocultar = () => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        };

        btnCerrar.addEventListener('click', ocultar);
        overlay.addEventListener('click', ocultar);
    }
});