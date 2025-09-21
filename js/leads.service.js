/**
 * Servicio para manejar leads/consultas desde Supabase
 * Permite enviar consultas de clientes y suscripciones a newsletter
 */

class LeadsService {
    constructor() {
        this.supabase = getSupabaseClient();
    }

    /**
     * Enviar consulta de cliente
     * @param {object} consultaData - Datos de la consulta
     */
    async enviarConsulta(consultaData) {
        try {
            // Validar datos requeridos
            if (!consultaData.nombre || !consultaData.email) {
                return {
                    success: false,
                    error: 'Nombre y email son campos obligatorios'
                };
            }

            // Preparar datos para insertar
            const consulta = {
                nombre: consultaData.nombre.trim(),
                email: consultaData.email.trim().toLowerCase(),
                telefono: consultaData.telefono?.trim() || null,
                mensaje: consultaData.mensaje?.trim() || null,
                producto_interes: consultaData.producto_interes || null,
                presupuesto_estimado: consultaData.presupuesto_estimado || null,
                origen: consultaData.origen || 'web',
                estado: 'nuevo'
            };

            const { data, error } = await this.supabase
                .from('consultas')
                .insert([consulta])
                .select()
                .single();

            if (error) {
                console.error('Error al enviar consulta:', error);
                return {
                    success: false,
                    error: 'Error al enviar la consulta. Por favor, inténtalo de nuevo.'
                };
            }

            console.log('✅ Consulta enviada correctamente:', data);
            return {
                success: true,
                data,
                message: '¡Gracias por tu consulta! Te contactaremos pronto.'
            };

        } catch (err) {
            console.error('Error inesperado al enviar consulta:', err);
            return {
                success: false,
                error: 'Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.'
            };
        }
    }

    /**
     * Suscribirse al newsletter
     * @param {string} email - Email para suscripción
     * @param {string} nombre - Nombre opcional
     */
    async suscribirNewsletter(email, nombre = null) {
        try {
            if (!email) {
                return {
                    success: false,
                    error: 'El email es requerido'
                };
            }

            const suscripcion = {
                email: email.trim().toLowerCase(),
                nombre: nombre?.trim() || null,
                activo: true,
                origen: 'web'
            };

            const { data, error } = await this.supabase
                .from('newsletter')
                .insert([suscripcion])
                .select()
                .single();

            if (error) {
                // Si el error es por email duplicado
                if (error.code === '23505') {
                    return {
                        success: false,
                        error: 'Este email ya está suscrito al newsletter'
                    };
                }

                console.error('Error al suscribir al newsletter:', error);
                return {
                    success: false,
                    error: 'Error al procesar la suscripción'
                };
            }

            return {
                success: true,
                data,
                message: '¡Te has suscrito exitosamente al newsletter!'
            };

        } catch (err) {
            console.error('Error inesperado al suscribir newsletter:', err);
            return {
                success: false,
                error: 'Error de conexión'
            };
        }
    }

    /**
     * Validar formato de email
     * @param {string} email - Email a validar
     */
    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Validar formato de teléfono (argentina)
     * @param {string} telefono - Teléfono a validar
     */
    validarTelefono(telefono) {
        // Acepta formatos como: +54911234567, 01134567890, 1134567890
        const regex = /^(\+54)?(\s?)(9)?([\s\-]?)([0-9]{2,4})[\s\-]?([0-9]{6,8})$/;
        return regex.test(telefono);
    }

    /**
     * Mostrar mensaje de éxito o error en la UI
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - 'success' o 'error'
     * @param {string} containerId - ID del contenedor donde mostrar el mensaje
     */
    mostrarMensaje(mensaje, tipo = 'success', containerId = 'mensaje-resultado') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log(`Mensaje ${tipo}:`, mensaje);
            return;
        }

        container.innerHTML = `
            <div class="mensaje ${tipo}" style="
                padding: 15px;
                border-radius: 5px;
                margin: 10px 0;
                background-color: ${tipo === 'success' ? '#d4edda' : '#f8d7da'};
                border: 1px solid ${tipo === 'success' ? '#c3e6cb' : '#f5c6cb'};
                color: ${tipo === 'success' ? '#155724' : '#721c24'};
            ">
                ${mensaje}
            </div>
        `;

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            if (container.innerHTML.includes(mensaje)) {
                container.innerHTML = '';
            }
        }, 5000);
    }
}

// Instancia global del servicio
let leadsService;

// Inicializar el servicio cuando Supabase esté listo
function initLeadsService() {
    if (typeof getSupabaseClient === 'function') {
        leadsService = new LeadsService();
        console.log('✅ LeadsService inicializado');
        return true;
    }
    return false;
}

// Intentar inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Intentar varias veces hasta que Supabase esté listo
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInit = () => {
        attempts++;
        if (initLeadsService()) {
            return; // Éxito, salir
        }
        
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('No se pudo inicializar LeadsService después de', maxAttempts, 'intentos');
        }
    };
    
    // Empezar a intentar después de un pequeño delay
    setTimeout(tryInit, 350);
});

/**
 * Funciones globales para manejar formularios
 */

// Manejar formulario de consulta general
async function enviarFormularioConsulta(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Mostrar loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const consultaData = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        mensaje: formData.get('mensaje'),
        producto_interes: formData.get('producto_interes'),
        presupuesto_estimado: formData.get('presupuesto_estimado'),
        origen: 'formulario_contacto'
    };

    // Validaciones básicas
    if (!leadsService.validarEmail(consultaData.email)) {
        leadsService.mostrarMensaje('Por favor, ingresa un email válido', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    if (consultaData.telefono && !leadsService.validarTelefono(consultaData.telefono)) {
        leadsService.mostrarMensaje('Por favor, ingresa un teléfono válido', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    // Enviar consulta
    const resultado = await leadsService.enviarConsulta(consultaData);
    
    if (resultado.success) {
        leadsService.mostrarMensaje(resultado.message, 'success');
        form.reset(); // Limpiar formulario
    } else {
        leadsService.mostrarMensaje(resultado.error, 'error');
    }

    // Restaurar botón
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}

// Manejar suscripción a newsletter
async function suscribirNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const email = formData.get('email');
    const nombre = formData.get('nombre');

    if (!leadsService.validarEmail(email)) {
        leadsService.mostrarMensaje('Por favor, ingresa un email válido', 'error', 'newsletter-mensaje');
        return;
    }

    const resultado = await leadsService.suscribirNewsletter(email, nombre);
    
    if (resultado.success) {
        leadsService.mostrarMensaje(resultado.message, 'success', 'newsletter-mensaje');
        form.reset();
    } else {
        leadsService.mostrarMensaje(resultado.error, 'error', 'newsletter-mensaje');
    }
}