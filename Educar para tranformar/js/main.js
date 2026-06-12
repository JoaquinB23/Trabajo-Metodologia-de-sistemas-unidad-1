// main.js - Archivo de lógica central

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMART NAVBAR (Ocultar al bajar, mostrar al subir) ---
    let lastScrollTop = 0;
    const navbar = document.getElementById('mainNavbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Solo aplica el efecto si hemos bajado más de 100px
            if (scrollTop > 100) {
                if (scrollTop > lastScrollTop) {
                    // Hacia abajo: ocultar
                    navbar.classList.add('hidden-nav');
                } else {
                    // Hacia arriba: mostrar
                    navbar.classList.remove('hidden-nav');
                }
            } else {
                navbar.classList.remove('hidden-nav'); // Siempre visible arriba del todo
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para dispositivos móviles
        });
    }

    // --- 2. ANIMACIONES DE SCROLL (Efecto aparecer hacia arriba) ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Activa la animación cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Dispara un poco antes de llegar al borde inferior
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejamos de observar para que no se repita
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 3. INTERFAZ DINÁMICA DEL LOGIN (Cambio de imágenes y textos) ---
    const roleSelectors = document.querySelectorAll('.role-selector');
    const subRoleContainer = document.getElementById('subRoleContainer');
    const imagePanel = document.getElementById('loginImagePanel');
    const loginTitle = document.getElementById('loginTitle');
    const loginDesc = document.getElementById('loginDesc');

    if (roleSelectors.length > 0) {
        roleSelectors.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const selectedRole = e.target.value;
                
                if (selectedRole === 'alumno') {
                    if (subRoleContainer) subRoleContainer.style.display = 'flex';
                    if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/ninosEstudiando.jpg')";
                    if (loginTitle) loginTitle.innerText = "Portal del Alumno";
                    if (loginDesc) loginDesc.innerText = "Accede a tus calificaciones, material de estudio y comunicados docentes.";
                } else if (selectedRole === 'docente') {
                    if (subRoleContainer) subRoleContainer.style.display = 'flex';
                    if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/docente.jpg')";
                    if (loginTitle) loginTitle.innerText = "Portal Docente";
                    if (loginDesc) loginDesc.innerText = "Gestiona tus clases, asistencias, planeaciones y comunicación con las familias.";
                } else if (selectedRole === 'familia') {
                    if (subRoleContainer) subRoleContainer.style.display = 'none';
                    if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/tutores.jpg')";
                    if (loginTitle) loginTitle.innerText = "Portal Familia";
                    if (loginDesc) loginDesc.innerText = "Acompaña el progreso académico, revisa reportes y autorizaciones.";
                }
            });
        });
    }

    // --- 4. ENVÍO DEL FORMULARIO DE LOGIN (Conexión a la API) ---
    const loginForm = document.getElementById('loginForm'); // Asegúrate de que tu etiqueta <form> tenga id="loginForm"
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue sola

            // Capturamos los datos ingresados por el usuario
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rol = document.querySelector('.role-selector:checked')?.value;

            try {
                // Usamos ruta relativa '/login' para que funcione en local y en Render automáticamente
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, rol })
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardamos la sesión en el localStorage (Nombre y Rol)
                    localStorage.setItem('usuario', JSON.stringify({ nombre: data.nombre, rol: rol }));

                    // Redirección inteligente según el rol seleccionado
                    if (rol === 'alumno') {
                        window.location.href = 'dashboard-alumno.html';
                    } else if (rol === 'docente') {
                        window.location.href = 'dashboard-docente.html';
                    } else {
                        window.location.href = 'dashboard.html'; // Fallback genérico
                    }
                } else {
                    // Si el servidor responde con un error de credenciales
                    alert(data.mensaje || 'Error al iniciar sesión. Verifica tus datos.');
                }
            } catch (error) {
                console.error('Error en la conexión:', error);
                alert('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
            }
        });
    }

    // --- 5. FONDO DE BURBUJAS (Más pequeñas y confinadas) ---
    const container = document.getElementById('bubbleContainer');
    if (container) {
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
    
});