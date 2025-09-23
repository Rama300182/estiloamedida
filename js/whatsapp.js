/* ===== SCRIPT PARA BOTÓN WHATSAPP ===== */

// Función para generar mensaje dinámico basado en la página actual
function generarMensajeWhatsApp() {
    const url = window.location.href;
    const titulo = document.title;
    let mensaje = "¡Hola! Me interesa conocer más sobre los muebles de Estilo a Medida";
    
    // Si estamos en una página de producto específico
    if (url.includes('detalle-producto.html')) {
        const nombreProducto = document.querySelector('#producto-nombre');
        if (nombreProducto && nombreProducto.textContent.trim()) {
            mensaje = `¡Hola! Me interesa el producto "${nombreProducto.textContent.trim()}" que vi en su sitio web.`;
        }
    }
    // Si estamos en la página de cómodas
    else if (url.includes('comodas.html')) {
        mensaje = "¡Hola! Me interesan las cómodas que vi en su catálogo. Me gustaría conocer más detalles.";
    }
    // Si estamos en la página principal
    else if (url.includes('index.html') || url.endsWith('/')) {
        mensaje = "¡Hola! Vi su sitio web de Estilo a Medida y me interesa conocer más sobre sus muebles a medida.";
    }
    
    return encodeURIComponent(mensaje);
}

// Función para actualizar el enlace de WhatsApp
function actualizarEnlaceWhatsApp() {
    const botonWhatsApp = document.querySelector('.whatsapp-float');
    if (botonWhatsApp) {
        const mensaje = generarMensajeWhatsApp();
        const numeroWhatsApp = "5491173931253"; // Número de Argentina
        botonWhatsApp.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    }
}

// Función para trackear clics en WhatsApp (opcional para analytics)
function trackearClicWhatsApp() {
    const botonWhatsApp = document.querySelector('.whatsapp-float');
    if (botonWhatsApp) {
        botonWhatsApp.addEventListener('click', function(e) {
            // Actualizar mensaje antes de abrir WhatsApp
            actualizarEnlaceWhatsApp();
            
            // Analytics opcional (descomenta si usas Google Analytics)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         'event_category': 'WhatsApp',
            //         'event_label': 'Botón Flotante',
            //         'value': 1
            //     });
            // }
            
            console.log('Click en botón de WhatsApp registrado');
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que el contenido dinámico se haya cargado
    setTimeout(() => {
        actualizarEnlaceWhatsApp();
        trackearClicWhatsApp();
    }, 1000);
});

// También actualizar cuando cambie la página (para SPAs)
window.addEventListener('load', function() {
    actualizarEnlaceWhatsApp();
});