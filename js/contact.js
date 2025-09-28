document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // Verificar si hay un producto en los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const producto = urlParams.get('producto');
    
    if (producto) {
        // Si hay un producto, prellenar el campo de mensaje
        const mensajeField = document.getElementById('mensaje');
        if (mensajeField) {
            mensajeField.value = `Hola, estoy interesado/a en obtener más información sobre: ${decodeURIComponent(producto)}. ¿Podrían enviarme detalles sobre precio, medidas y tiempos de entrega? Gracias.`;
        }
        
        // También actualizar el título de la página si es posible
        const pageTitle = document.querySelector('h1');
        if (pageTitle && pageTitle.textContent.includes('Contacto')) {
            pageTitle.innerHTML = `Contacto <span style="color: var(--primary-color);">- ${decodeURIComponent(producto)}</span>`;
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                mensaje: document.getElementById('mensaje').value
            };

            // Aquí se puede agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch para enviar a un endpoint o Supabase
            
            // Por ahora, solo mostramos un alert
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
});