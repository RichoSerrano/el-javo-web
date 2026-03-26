document.addEventListener('DOMContentLoaded', () => {
    // --- BOTÓN VOLVER AL INICIO ---
    const btnBack = document.querySelector('.btn-back');

    if (btnBack) {
        // Efecto Neon al pasar el mouse (PC)
        btnBack.addEventListener('mouseenter', () => {
            btnBack.classList.add('white-glow-pulse');
        });

        btnBack.addEventListener('mouseleave', () => {
            btnBack.classList.remove('white-glow-pulse');
        });

        // Efecto Flash al hacer Click o Tocar (Móvil/PC)
        btnBack.addEventListener('click', function(e) {
            e.preventDefault(); // Detenemos el salto un momento
            const targetUrl = this.getAttribute('href');

            this.classList.add('btn-active-glow');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 150); // 150ms es perfecto para notar el flash
        });
    }

    // --- BOTÓN DESCARGA CURRÍCULA (ROJO) ---
    const replicaBtn = document.getElementById('replicaBtn');

    if (replicaBtn) {
        // Al presionar (Mousedown o Touchstart)
        const startPress = () => replicaBtn.classList.add('is-active');
        const endPress = () => replicaBtn.classList.remove('is-active');

        replicaBtn.addEventListener('mousedown', startPress);
        replicaBtn.addEventListener('touchstart', startPress); // Para móviles

        replicaBtn.addEventListener('mouseup', endPress);
        replicaBtn.addEventListener('mouseleave', endPress);
        replicaBtn.addEventListener('touchend', endPress); // Para móviles
    }
    // --- LÓGICA DEL MENÚ DESPLEGABLE ---
const btnReplica = document.getElementById('replicaBtn');
const lista = document.getElementById('listaCurriculas');

if (btnReplica && lista) {
    btnReplica.addEventListener('click', (e) => {
        // Evitamos que el clic se cierre inmediatamente al tocar el botón
        e.stopPropagation();
        
        // Alternar visibilidad
        if (lista.style.display === 'none') {
            lista.style.display = 'block';
        } else {
            lista.style.display = 'none';
        }
    });

    // Cerrar la lista si el usuario hace clic en cualquier otro lugar de la pantalla
    document.addEventListener('click', () => {
        lista.style.display = 'none';
    });
}
});