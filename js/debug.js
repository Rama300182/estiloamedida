/**
 * Script de diagnostico para debugging
 * Incluye este script en las paginas para diagnosticar problemas
 */

console.log('🔍 Debug script cargado');

// Test inmediato de variables
console.log('🧪 TEST INMEDIATO:');
console.log('- typeof supabase:', typeof supabase);
console.log('- SUPABASE_URL:', typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : 'NO DEFINIDA');
console.log('- SUPABASE_ANON_KEY:', typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'NO DEFINIDA');
console.log('- getSupabaseClient:', typeof getSupabaseClient);

// Verificar que Supabase este disponible
setTimeout(() => {
    console.log('📊 === DIAGNOSTICO DEL SISTEMA (después de 2s) ===');
    
    // 1. Verificar Supabase
    if (typeof supabase !== 'undefined') {
        console.log('✅ Supabase: Libreria cargada correctamente');
        console.log('   - Version:', supabase.version || 'desconocida');
    } else {
        console.error('❌ Supabase: Libreria NO encontrada');
        console.log('💡 Solucion: Verificar que el CDN de Supabase este funcionando');
    }
    
    // 2. Verificar variables de configuración
    if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined') {
        console.log('✅ Variables de configuración: Definidas');
        console.log('   - URL:', SUPABASE_URL);
        console.log('   - Key (20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...');
        
        // Validar formato de URL
        if (SUPABASE_URL.startsWith('https://') && SUPABASE_URL.includes('.supabase.co')) {
            console.log('✅ Formato de URL: Correcto');
        } else {
            console.error('❌ Formato de URL: Incorrecto');
        }
        
        // Validar formato de Key
        if (SUPABASE_ANON_KEY.startsWith('eyJ') && SUPABASE_ANON_KEY.length > 100) {
            console.log('✅ Formato de API Key: Correcto');
        } else {
            console.error('❌ Formato de API Key: Incorrecto');
        }
        
    } else {
        console.error('❌ Variables de configuración: NO definidas');
        console.log('💡 Solucion: Verificar que config/supabase.js se haya cargado');
    }
    
    // 3. Verificar cliente Supabase
    if (typeof getSupabaseClient === 'function') {
        console.log('✅ Cliente Supabase: Función disponible');
        
        try {
            const client = getSupabaseClient();
            if (client) {
                console.log('✅ Cliente Supabase: Creado correctamente');
                console.log('   - URL del cliente:', client.supabaseUrl);
                console.log('   - Key del cliente:', client.supabaseKey.substring(0, 20) + '...');
                
                // Test rápido
                console.log('🔗 Probando conexión básica...');
                client.from('test').select('*').limit(1)
                    .then(response => {
                        if (response.error) {
                            if (response.error.message.includes('relation "public.test" does not exist')) {
                                console.log('✅ Conexión: OK (tabla test no existe, pero la conexión funciona)');
                            } else {
                                console.log('⚠️ Conexión: Conecta pero hay otros problemas:', response.error.message);
                            }
                        } else {
                            console.log('✅ Conexión: Perfecta');
                        }
                    })
                    .catch(err => {
                        console.error('❌ Error de red:', err.message);
                    });
                    
            } else {
                console.error('❌ Cliente Supabase: Error en la creación');
            }
        } catch (error) {
            console.error('❌ Error creando cliente:', error);
        }
    } else {
        console.error('❌ Cliente Supabase: Función getSupabaseClient no encontrada');
        console.log('💡 Solucion: Verificar que config/supabase.js se haya cargado');
    }
    
    console.log('📊 === FIN DEL DIAGNOSTICO ===');
    
}, 2000);

// Función para mostrar estado en la página
function mostrarEstadoSistema() {
    const statusDiv = document.createElement('div');
    statusDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        max-width: 300px;
    `;
    
    let status = [];
    
    // Verificar componentes
    if (typeof supabase !== 'undefined') status.push('✅ Supabase');
    else status.push('❌ Supabase');
    
    if (typeof getSupabaseClient === 'function') status.push('✅ Config');
    else status.push('❌ Config');
    
    if (typeof productsService !== 'undefined' && productsService) status.push('✅ Products');
    else status.push('❌ Products');
    
    if (typeof leadsService !== 'undefined' && leadsService) status.push('✅ Leads');
    else status.push('❌ Leads');
    
    statusDiv.innerHTML = `
        <strong>Estado del Sistema:</strong><br>
        ${status.join('<br>')}
        <br><br>
        <small>Click para ocultar</small>
    `;
    
    statusDiv.onclick = () => statusDiv.remove();
    document.body.appendChild(statusDiv);
    
    // Auto-ocultar después de 10 segundos
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 10000);
}

// Mostrar estado después de cargar
setTimeout(mostrarEstadoSistema, 3000);