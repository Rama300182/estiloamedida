document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Inicializando manejador de newsletter...');
    
    // Función para mostrar mensajes específica para newsletter (definida globalmente)
    function mostrarMensajeNewsletter(mensaje, tipo = 'success') {
        console.log(`🔄 Intentando mostrar mensaje: "${mensaje}" tipo: ${tipo}`);
        
        const container = document.getElementById('newsletter-mensaje');
        if (!container) {
            console.error('❌ No se encontró el contenedor newsletter-mensaje');
            alert(`Newsletter ${tipo}: ${mensaje}`); // Fallback para debugging
            return;
        }

        console.log('✅ Contenedor encontrado, mostrando mensaje');

        const icon = tipo === 'success' ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-exclamation-circle"></i>';

        container.innerHTML = `
            <div class="mensaje ${tipo}" style="
                display: flex !important;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
                border-radius: 8px;
                margin: 15px 0;
                background-color: ${tipo === 'success' ? '#f0f9f4' : '#fef1f2'};
                border: 1px solid ${tipo === 'success' ? '#c3e6cb' : '#f5c6cb'};
                color: ${tipo === 'success' ? '#0f5132' : '#842029'};
                font-size: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                animation: slideIn 0.3s ease forwards;
                opacity: 1;
                visibility: visible;
                z-index: 1000;
            ">
                ${icon}
                <span style="flex: 1;">${mensaje}</span>
            </div>
        `;

        console.log('📝 HTML del mensaje insertado:', container.innerHTML);

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            const mensajeElement = container.querySelector('.mensaje');
            if (mensajeElement) {
                mensajeElement.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (container.contains(mensajeElement)) {
                        container.innerHTML = '';
                        console.log('🗑️ Mensaje ocultado automáticamente');
                    }
                }, 300);
            }
        }, 5000);
    }

    // Hacer la función disponible globalmente
    window.mostrarMensajeNewsletter = mostrarMensajeNewsletter;
    
    // Función para intentar inicializar el newsletter
    function initNewsletterHandler() {
        // Verificar que LeadsService esté disponible globalmente
        if (typeof leadsService === 'undefined' || !leadsService) {
            console.log('⏳ leadsService no disponible, reintentando...');
            return false;
        }

        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            console.log('✅ Formulario de newsletter encontrado');
            
            newsletterForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                console.log('📝 Procesando envío del formulario newsletter...');

                // Obtener los valores del formulario
                const nombre = document.getElementById('newsletter-nombre').value;
                const apellido = document.getElementById('newsletter-apellido').value;
                const email = document.getElementById('newsletter-email').value;

                console.log('📋 Datos del formulario:', { nombre, apellido, email });

                // Validar email básico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    console.log('❌ Email inválido');
                    mostrarMensajeNewsletter('Por favor, ingresa un email válido', 'error');
                    return;
                }

                // Mostrar estado de carga
                const submitButton = newsletterForm.querySelector('.newsletter-submit');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="submit-text">...</span>';
                submitButton.disabled = true;

                try {
                    console.log('🔄 Enviando datos a Supabase...');
                    const resultado = await leadsService.suscribirNewsletter(email, nombre, apellido);
                    console.log('📨 Respuesta de Supabase:', resultado);
                    
                    if (resultado.success) {
                        console.log('✅ Suscripción exitosa');
                        mostrarMensajeNewsletter(resultado.message, 'success');
                        newsletterForm.reset();
                    } else {
                        console.log('❌ Error en la suscripción:', resultado.error);
                        mostrarMensajeNewsletter(resultado.error, 'error');
                    }
                } catch (error) {
                    console.error('❌ Error crítico:', error);
                    mostrarMensajeNewsletter('Error al procesar la suscripción. Por favor, intenta nuevamente.', 'error');
                } finally {
                    // Restaurar botón
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            });
            
            console.log('✅ Newsletter handler inicializado correctamente');
            return true;
        } else {
            console.warn('⚠️ No se encontró el formulario de newsletter');
            return false;
        }
    }

    // Intentar inicializar varias veces hasta que esté disponible
    let attempts = 0;
    const maxAttempts = 30;
    
    const tryInit = () => {
        attempts++;
        console.log(`Intento ${attempts}/${maxAttempts} de inicializar newsletter`);
        
        if (initNewsletterHandler()) {
            console.log('✅ Newsletter inicializado correctamente');
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('❌ No se pudo inicializar Newsletter después de', maxAttempts, 'intentos');
        }
    };
    
    // Empezar a intentar después de un delay
    setTimeout(tryInit, 1000);
});