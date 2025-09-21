document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

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