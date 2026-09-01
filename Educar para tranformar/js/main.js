// main.js - Archivo de lógica central

document.addEventListener('DOMContentLoaded', () => {
    inicializarNavbarInteligente();
    inicializarAnimacionesScroll();
    inicializarSelectorDeRol();
    inicializarFormularioLogin();
    inicializarFondoDeBurbujas();
});

// ==========================================
// 1. NAVBAR INTELIGENTE (ocultar al bajar, mostrar al subir)
// ==========================================
function inicializarNavbarInteligente() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('mainNavbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Solo aplica el efecto si se bajó más de 100px
        if (scrollTop > 100) {
            navbar.classList.toggle('hidden-nav', scrollTop > lastScrollTop);
        } else {
            navbar.classList.remove('hidden-nav');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // clamp para dispositivos móviles
    });
}

// ==========================================
// 2. ANIMACIONES DE SCROLL (efecto aparecer)
// ==========================================
function inicializarAnimacionesScroll() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Activa la animación cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Dispara un poco antes de llegar al borde inferior
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Dejamos de observar para que no se repita
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
}

// ==========================================
// 3. INTERFAZ DINÁMICA DEL LOGIN (cambio de imágenes y textos según rol)
// ==========================================

// Configuración por rol: evita repetir el mismo bloque if/else
// tres veces con solo los valores cambiando.
const datosPorRol = {
    alumno: {
        mostrarSubRol: true,
        imagenFondo: "img/ninosEstudiando.jpg",
        titulo: "Portal del Alumno",
        descripcion: "Accede a tus calificaciones, material de estudio y comunicados docentes."
    },
    docente: {
        mostrarSubRol: true,
        imagenFondo: "img/docente.jpg",
        titulo: "Portal Docente",
        descripcion: "Gestiona tus clases, asistencias, planeaciones y comunicación con las familias."
    },
    familia: {
        mostrarSubRol: false,
        imagenFondo: "img/tutores.jpg",
        titulo: "Portal Familia",
        descripcion: "Acompaña el progreso académico, revisa reportes y autorizaciones."
    }
};

function actualizarPanelSegunRol(rolSeleccionado) {
    const config = datosPorRol[rolSeleccionado];
    if (!config) return;

    const subRoleContainer = document.getElementById('subRoleContainer');
    const imagePanel = document.getElementById('loginImagePanel');
    const loginTitle = document.getElementById('loginTitle');
    const loginDesc = document.getElementById('loginDesc');

    if (subRoleContainer) subRoleContainer.style.display = config.mostrarSubRol ? 'flex' : 'none';
    if (imagePanel) imagePanel.style.backgroundImage =
        `linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('${config.imagenFondo}')`;
    if (loginTitle) loginTitle.innerText = config.titulo;
    if (loginDesc) loginDesc.innerText = config.descripcion;
}

function inicializarSelectorDeRol() {
    const roleSelectors = document.querySelectorAll('.role-selector');
    if (roleSelectors.length === 0) return;

    roleSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            actualizarPanelSegunRol(e.target.value);
        });
    });
}

// ==========================================
// 4. ENVÍO DEL FORMULARIO DE LOGIN (conexión a la API)
// ==========================================
function inicializarFormularioLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const identificador = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rol = document.querySelector('.role-selector:checked')?.value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identificador, password, rol })
            });

            const resData = await response.json();

            if (response.ok && resData.ok) {
                const usuario = resData.data.usuario;

                // NOTA: por ahora solo se guarda la info del usuario en localStorage,
                // no un token de sesión. Pendiente reforzar cuando se agregue manejo de sesión seguro.
                localStorage.setItem('usuario', JSON.stringify(usuario));

                redirigirSegunRol(rol);
            } else {
                alert(resData.error || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
            alert('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
        }
    });
}

function redirigirSegunRol(rol) {
    if (rol === 'alumno') {
        window.location.href = 'dashboard-alumno.html';
    } else if (rol === 'docente') {
        window.location.href = 'dashboard-docente.html';
    } else {
        window.location.href = 'dashboard.html';
    }
}

// ==========================================
// 5. FONDO DE BURBUJAS
// ==========================================
function inicializarFondoDeBurbujas() {
    const container = document.getElementById('bubbleContainer');
    if (!container) return;

    const cantidad = 50;
    for (let i = 0; i < cantidad; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * 17 + 8; // Tamaños entre 8px y 25px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 15 + 8}s`; // Suben más lento
        bubble.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(bubble);
    }
}