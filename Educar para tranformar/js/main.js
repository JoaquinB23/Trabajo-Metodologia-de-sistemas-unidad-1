// main.js - Archivo de lógica central

document.addEventListener('DOMContentLoaded', () => {





    // --- NUEVO: SMART NAVBAR (Ocultar al bajar, mostrar al subir) ---
    let lastScrollTop = 0;
    const navbar = document.getElementById('mainNavbar');
    
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

    // ... (Mantén aquí abajo el resto de tu código de Scroll Reveal, Login y Burbujas) ...



    // 1. Lógica para animaciones de Scroll (Efecto aparecer hacia arriba)
    const reveals = document.querySelectorAll('.reveal');
    
    // Configuramos el observador
    const revealOptions = {
        threshold: 0.15, // Activa la animación cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Dispara un poco antes de llegar al borde inferior
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Añade la clase active que ejecuta la transición en CSS
                entry.target.classList.add('active');
                // Dejamos de observar el elemento para que no se anime cada vez que subimos y bajamos
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. Lógica para Login (Mantenemos la que ya tenías)
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
                    subRoleContainer.style.display = 'flex';
                    imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/ninosEstudiando.jpg')";
                    loginTitle.innerText = "Portal del Alumno";
                    loginDesc.innerText = "Accede a tus calificaciones, material de estudio y comunicados docentes.";
                } else if (selectedRole === 'docente') {
                    subRoleContainer.style.display = 'flex';
                    imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/docente.jpg')";
                    loginTitle.innerText = "Portal Docente";
                    loginDesc.innerText = "Gestiona tus clases, asistencias, planeaciones y comunicación con las familias.";
                } else if (selectedRole === 'familia') {
                    subRoleContainer.style.display = 'none';
                    imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/tutores.jpg')";
                    loginTitle.innerText = "Portal Familia";
                    loginDesc.innerText = "Acompaña el progreso académico, revisa reportes y autorizaciones.";
                }
            });
        });
    }














// 1. Lógica para el fondo de burbujas (Más pequeñas y confinadas)
    const container = document.getElementById('bubbleContainer');
    if (container) {
        const cantidad = 50; // Más cantidad porque son pequeñas
        for (let i = 0; i < cantidad; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Tamaños más pequeños (entre 8px y 25px)
            const size = Math.random() * 17 + 8;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 15 + 8}s`; // Suben más lento
            bubble.style.animationDelay = `${Math.random() * 10}s`;

            container.appendChild(bubble);
        }
    }
    
});
// // Lógica para Login (Cambio de imagen y texto)
// document.addEventListener('DOMContentLoaded', () => {
//     const roleSelectors = document.querySelectorAll('.role-selector');
//     const subRoleContainer = document.getElementById('subRoleContainer');
//     const imagePanel = document.getElementById('loginImagePanel');
//     const loginTitle = document.getElementById('loginTitle');
//     const loginDesc = document.getElementById('loginDesc');

//     if (!roleSelectors) return;

//     roleSelectors.forEach(radio => {
//         radio.addEventListener('change', (e) => {
//             const selectedRole = e.target.value;
            
//             // Lógica para mostrar/ocultar sub-niveles y cambiar imagen
//             if (selectedRole === 'alumno') {
//                 if (subRoleContainer) subRoleContainer.style.display = 'flex';
//                 if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/ninosEstudiando.jpg')";
//                 if (loginTitle) loginTitle.innerText = "Portal del Alumno";
//                 if (loginDesc) loginDesc.innerText = "Accede a tus calificaciones y material de estudio.";
//             } else if (selectedRole === 'docente') {
//                 if (subRoleContainer) subRoleContainer.style.display = 'flex';
//                 if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/jardin.jpg')";
//                 if (loginTitle) loginTitle.innerText = "Portal Docente";
//                 if (loginDesc) loginDesc.innerText = "Gestiona tus clases y comunicación con familias.";
//             } else {
//                 if (subRoleContainer) subRoleContainer.style.display = 'none';
//                 if (imagePanel) imagePanel.style.backgroundImage = "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.75)), url('img/Niños felices.jpg')";
//                 if (loginTitle) loginTitle.innerText = "Portal Familia";
//                 if (loginDesc) loginDesc.innerText = "Acompaña el progreso académico y reportes.";
//             }
//         });
//     });
// });
