// Servicio para manejar leads/consultas desde Supabase
class LeadsService {
    constructor() {
        this.supabase = getSupabaseClient();
    }

    async enviarConsulta(consultaData) {
        try {
            if (!consultaData.nombre || !consultaData.email) {
                return {
                    success: false,
                    error: 'Nombre y email son campos obligatorios'
                };
            }

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

            console.log('Consulta enviada correctamente:', data);
            return {
                success: true,
                data,
                message: 'Gracias por tu consulta! Te contactaremos pronto.'
            };

        } catch (err) {
            console.error('Error inesperado al enviar consulta:', err);
            return {
                success: false,
                error: 'Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.'
            };
        }
    }

    async suscribirNewsletter(email, nombre = null, apellido = null) {
        console.log('Iniciando suscripción al newsletter...', { email, nombre, apellido });
        
        try {
            if (!this.supabase) {
                console.error('Cliente Supabase no inicializado');
                return {
                    success: false,
                    error: 'Error de conexión con el servidor'
                };
            }

            if (!email) {
                console.warn('Email no proporcionado');
                return {
                    success: false,
                    error: 'El email es requerido'
                };
            }

            const suscripcion = {
                email: email.trim().toLowerCase(),
                nombre: nombre?.trim() || null,
                apellido: apellido?.trim() || null,
                activo: true,
                fecha_suscripcion: new Date().toISOString()
            };

            console.log('Datos a insertar:', suscripcion);

            const { data, error } = await this.supabase
                .from('newsletter')
                .insert([suscripcion])
                .select();

            if (error) {
                console.error('Error de Supabase:', error);
                
                if (error.code === '23505') {
                    return {
                        success: false,
                        error: 'Ya estás suscrito! Gracias por tu interés en nuestras novedades.'
                    };
                }

                if (error.code === '42501' || error.status === 401) {
                    return {
                        success: false,
                        error: 'Error de autenticación con el servidor'
                    };
                }

                return {
                    success: false,
                    error: 'Error al procesar la suscripción: ' + error.message
                };
            }

            console.log('Suscripción exitosa:', data);
            return {
                success: true,
                data,
                message: 'Genial! Te has suscrito a nuestro newsletter. Te mantendremos al tanto de nuestras novedades.'
            };

        } catch (err) {
            console.error('Error inesperado:', err);
            return {
                success: false,
                error: 'Error de conexión: ' + (err.message || 'Error desconocido')
            };
        }
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarTelefono(telefono) {
        const regex = /^(\+54)?(\s?)(9)?([\s\-]?)([0-9]{2,4})[\s\-]?([0-9]{6,8})$/;
        return regex.test(telefono);
    }

    mostrarMensaje(mensaje, tipo = 'success', containerId = 'mensaje-resultado') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log(`Mensaje ${tipo}:`, mensaje);
            return;
        }

        const icon = tipo === 'success' ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-exclamation-circle"></i>';

        container.innerHTML = `
            <div class="mensaje ${tipo}" style="
                display: flex;
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
            ">
                ${icon}
                <span style="flex: 1;">${mensaje}</span>
            </div>
        `;

        // Agregar animaciones CSS si no existen
        if (!document.querySelector('#mensaje-animacion')) {
            const style = document.createElement('style');
            style.id = 'mensaje-animacion';
            style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            const mensajeElement = container.querySelector('.mensaje');
            if (mensajeElement) {
                mensajeElement.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (container.contains(mensajeElement)) {
                        container.innerHTML = '';
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Variables globales
let leadsService;

// Inicializar servicio
function initLeadsService() {
    if (typeof getSupabaseClient === 'function') {
        leadsService = new LeadsService();
        window.leadsService = leadsService; // También asignar a window para mayor compatibilidad
        console.log('✅ LeadsService inicializado y disponible globalmente');
        return true;
    }
    return false;
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    let attempts = 0;
    const maxAttempts = 15;
    
    const tryInit = () => {
        attempts++;
        console.log(`Intento ${attempts}/${maxAttempts} de inicializar LeadsService`);
        
        if (initLeadsService()) {
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 300);
        } else {
            console.error('No se pudo inicializar LeadsService después de', maxAttempts, 'intentos');
        }
    };
    
    setTimeout(tryInit, 500);
});

// Función global para manejar formulario de consulta
async function enviarFormularioConsulta(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    if (!leadsService) {
        console.error('LeadsService no disponible');
        alert('Error: El servicio no está disponible. Por favor, recarga la página.');
        return;
    }
    
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

    const resultado = await leadsService.enviarConsulta(consultaData);
    
    if (resultado.success) {
        leadsService.mostrarMensaje(resultado.message, 'success');
        form.reset();
    } else {
        leadsService.mostrarMensaje(resultado.error, 'error');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}