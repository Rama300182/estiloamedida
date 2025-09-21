/**
 * Configuración de Supabase
 * Reemplaza SUPABASE_URL y SUPABASE_ANON_KEY con tus valores reales
 */

// ⚠️ IMPORTANTE: Reemplaza estos valores con los de tu proyecto Supabase
const SUPABASE_URL = 'https://wxtadloiqojfevtyjrqw.supabase.co'; // ej: https://xyzxyzxyz.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dGFkbG9pcW9qZmV2dHlqcnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTY1MjksImV4cCI6MjA3Mzk3MjUyOX0.FsmcclNXN4CEpfwKSr-K0ZNLAOdGGm1_Gbqn6W0wwT0'; // La clave pública (anon/public)

// Verificar que las credenciales estén configuradas
if (SUPABASE_URL === 'TU_SUPABASE_URL_AQUI' || SUPABASE_ANON_KEY === 'TU_SUPABASE_ANON_KEY_AQUI') {
    console.error('⚠️ CONFIGURACIÓN REQUERIDA: Actualiza las credenciales de Supabase en config/supabase.js');
    alert('Error: Configura las credenciales de Supabase antes de usar la aplicación');
    throw new Error('Credenciales de Supabase no configuradas'); // Cambio: usar throw en lugar de return
}

// Crear cliente de Supabase
let supabaseClient;

// Función para inicializar Supabase (se llama después de cargar la librería)
function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('❌ La librería supabase-js no está cargada');
        return null;
    }
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Cliente Supabase creado correctamente');
        console.log('🔗 URL:', SUPABASE_URL);
        console.log('🔑 Key:', SUPABASE_ANON_KEY.substring(0, 20) + '...');
        return supabaseClient;
    } catch (error) {
        console.error('❌ Error creando cliente Supabase:', error);
        return null;
    }
}

// Función helper para obtener el cliente
function getSupabaseClient() {
    if (!supabaseClient) {
        console.log('🔄 Cliente no inicializado, intentando inicializar...');
        const client = initSupabase();
        if (!client) {
            console.error('❌ No se pudo inicializar el cliente de Supabase');
            return null;
        }
    }
    console.log('✅ Cliente Supabase disponible');
    return supabaseClient;
}

// Inicializar automáticamente cuando se cargue el script
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Inicializando Supabase...');
    // Esperar un poco para asegurar que Supabase se cargó
    let attempts = 0;
    const maxAttempts = 20;
    
    const tryInit = () => {
        attempts++;
        if (typeof supabase !== 'undefined') {
            initSupabase();
            console.log('✅ Supabase inicializado después de', attempts, 'intentos');
        } else if (attempts < maxAttempts) {
            setTimeout(tryInit, 100);
        } else {
            console.error('❌ No se pudo inicializar Supabase después de', maxAttempts, 'intentos');
        }
    };
    
    tryInit();
});

// Configuración global para manejo de errores
window.addEventListener('error', (event) => {
    if (event.message.includes('supabase')) {
        console.error('Error relacionado con Supabase:', event.error);
    }
});

// Exportar para uso global (compatible con módulos y scripts tradicionales)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getSupabaseClient, initSupabase };
} else {
    window.getSupabaseClient = getSupabaseClient;
    window.initSupabase = initSupabase;
    window.testSupabaseConnection = testSupabaseConnection;
}

// Función de test para diagnosticar problemas de conexión
async function testSupabaseConnection() {
    console.log('🧪 === INICIANDO TEST DE CONEXIÓN ===');
    
    // 1. Verificar librería
    if (typeof supabase === 'undefined') {
        console.error('❌ Librería supabase-js no cargada');
        return false;
    } else {
        console.log('✅ Librería supabase-js disponible');
    }
    
    // 2. Verificar credenciales
    console.log('🔍 Verificando credenciales...');
    console.log('URL:', SUPABASE_URL);
    console.log('Key (primeros 20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...');
    
    // 3. Crear cliente
    const client = getSupabaseClient();
    if (!client) {
        console.error('❌ No se pudo crear el cliente');
        return false;
    }
    
    // 4. Test básico de conectividad
    console.log('🔗 Probando conectividad básica...');
    try {
        const { data, error } = await client
            .from('categorias')
            .select('id')
            .limit(1);
        
        if (error) {
            console.error('❌ Error de conexión:', error);
            console.error('Código de error:', error.code);
            console.error('Detalle:', error.details);
            console.error('Pista:', error.hint);
            
            // Diagnósticos específicos
            if (error.code === 'PGRST116') {
                console.error('💡 SOLUCIÓN: La tabla "categorias" no existe. Ejecuta el script estructura_estiloamedida.sql');
            } else if (error.code === '42501') {
                console.error('💡 SOLUCIÓN: Problema de permisos RLS. Ejecuta el script politicas_rls_supabase.sql');
            } else if (error.message.includes('JWT')) {
                console.error('💡 SOLUCIÓN: API Key inválida. Verifica tu SUPABASE_ANON_KEY');
            } else if (error.message.includes('not found')) {
                console.error('💡 SOLUCIÓN: URL incorrecta. Verifica tu SUPABASE_URL');
            }
            
            return false;
        } else {
            console.log('✅ Conexión exitosa con Supabase');
            console.log('Datos obtenidos:', data);
            return true;
        }
    } catch (networkError) {
        console.error('❌ Error de red:', networkError);
        console.error('💡 SOLUCIÓN: Verifica tu conexión a internet o que la URL de Supabase sea correcta');
        return false;
    }
}