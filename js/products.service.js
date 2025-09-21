/**
 * Servicio para manejar productos desde Supabase
 * Incluye funciones para leer categorías y productos
 */

class ProductsService {
    constructor() {
        this.supabase = getSupabaseClient();
    }

    /**
     * Obtener todas las categorías ordenadas
     */
    async getCategorias() {
        try {
            const { data, error } = await this.supabase
                .from('categorias')
                .select('*')
                .order('orden', { ascending: true });

            if (error) {
                console.error('Error al obtener categorías:', error);
                return { success: false, error: error.message, data: [] };
            }

            return { success: true, data: data || [] };
        } catch (err) {
            console.error('Error inesperado al obtener categorías:', err);
            return { success: false, error: 'Error de conexión', data: [] };
        }
    }

    /**
     * Obtener productos por categoría
     * @param {string} categoriaSlug - Slug de la categoría (ej: 'comodas')
     */
    async getProductosByCategoria(categoriaSlug) {
        try {
            const { data, error } = await this.supabase
                .from('productos')
                .select(`
                    *,
                    categorias (
                        id,
                        nombre,
                        slug
                    )
                `)
                .eq('categorias.slug', categoriaSlug)
                .order('destacado', { ascending: false })
                .order('nombre', { ascending: true });

            if (error) {
                console.error('Error al obtener productos:', error);
                return { success: false, error: error.message, data: [] };
            }

            return { success: true, data: data || [] };
        } catch (err) {
            console.error('Error inesperado al obtener productos:', err);
            return { success: false, error: 'Error de conexión', data: [] };
        }
    }

    /**
     * Obtener todos los productos
     * @param {object} filtros - Filtros opcionales
     */
    async getAllProductos(filtros = {}) {
        try {
            let query = this.supabase
                .from('productos')
                .select(`
                    *,
                    categorias (
                        id,
                        nombre,
                        slug
                    )
                `);

            // Aplicar filtros si existen
            if (filtros.destacado !== undefined) {
                query = query.eq('destacado', filtros.destacado);
            }

            if (filtros.categoriaId) {
                query = query.eq('categoria_id', filtros.categoriaId);
            }

            const { data, error } = await query
                .order('destacado', { ascending: false })
                .order('nombre', { ascending: true });

            if (error) {
                console.error('Error al obtener productos:', error);
                return { success: false, error: error.message, data: [] };
            }

            return { success: true, data: data || [] };
        } catch (err) {
            console.error('Error inesperado al obtener productos:', err);
            return { success: false, error: 'Error de conexión', data: [] };
        }
    }

    /**
     * Obtener un producto específico por ID
     * @param {number} id - ID del producto
     */
    async getProductoById(id) {
        try {
            const { data, error } = await this.supabase
                .from('productos')
                .select(`
                    *,
                    categorias (
                        id,
                        nombre,
                        slug
                    ),
                    producto_fotos (
                        id,
                        url,
                        alt,
                        orden
                    ),
                    producto_features (
                        id,
                        texto,
                        orden
                    )
                `)
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error al obtener producto:', error);
                return { success: false, error: error.message, data: null };
            }

            return { success: true, data };
        } catch (err) {
            console.error('Error inesperado al obtener producto:', err);
            return { success: false, error: 'Error de conexión', data: null };
        }
    }

    /**
     * Obtener productos destacados para la página principal
     * @param {number} limite - Número máximo de productos a obtener
     */
    async getProductosDestacados(limite = 6) {
        try {
            const { data, error } = await this.supabase
                .from('productos')
                .select(`
                    *,
                    categorias (
                        id,
                        nombre,
                        slug
                    )
                `)
                .eq('destacado', true)
                .limit(limite)
                .order('creado_at', { ascending: false });

            if (error) {
                console.error('Error al obtener productos destacados:', error);
                return { success: false, error: error.message, data: [] };
            }

            return { success: true, data: data || [] };
        } catch (err) {
            console.error('Error inesperado al obtener productos destacados:', err);
            return { success: false, error: 'Error de conexión', data: [] };
        }
    }

    /**
     * Buscar productos por término
     * @param {string} termino - Término de búsqueda
     */
    async buscarProductos(termino) {
        try {
            const { data, error } = await this.supabase
                .from('productos')
                .select(`
                    *,
                    categorias (
                        id,
                        nombre,
                        slug
                    )
                `)
                .or(`nombre.ilike.%${termino}%,descripcion_corta.ilike.%${termino}%`)
                .order('destacado', { ascending: false })
                .order('nombre', { ascending: true });

            if (error) {
                console.error('Error al buscar productos:', error);
                return { success: false, error: error.message, data: [] };
            }

            return { success: true, data: data || [] };
        } catch (err) {
            console.error('Error inesperado al buscar productos:', err);
            return { success: false, error: 'Error de conexión', data: [] };
        }
    }

    /**
     * Generar HTML para una tarjeta de producto
     * @param {object} producto - Objeto producto de Supabase
     */
    generarTarjetaProducto(producto) {
        const categoriaClass = producto.categorias?.slug || 'general';
        // Usar imagen por defecto si no hay imagen_url
        const imagenUrl = producto.imagen_url || 'image/logo.png';
        const precio = producto.precio_desde ? `Desde $${Number(producto.precio_desde).toLocaleString()}` : 'Consultar precio';

        return `
            <div class="product-card" data-category="${categoriaClass}">
                <div class="product-image">
                    <img src="${imagenUrl}" alt="${producto.nombre}" loading="lazy" onerror="this.src='image/logo.png'">
                    <div class="product-overlay">
                        <button class="btn-view" onclick="verDetalleProducto(${producto.id})">Ver detalles</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion_corta || ''}</p>
                    ${producto.precio_desde ? `<div class="product-price">${precio}</div>` : ''}
                </div>
            </div>
        `;
    }
}

// Instancia global del servicio
let productsService;

// Inicializar el servicio cuando Supabase esté listo
function initProductsService() {
    if (typeof getSupabaseClient === 'function') {
        productsService = new ProductsService();
        // Hacer disponible globalmente
        window.ProductsService = productsService;
        console.log('✅ ProductsService inicializado y disponible globalmente');
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
        if (initProductsService()) {
            return; // Éxito, salir
        }
        
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('No se pudo inicializar ProductsService después de', maxAttempts, 'intentos');
        }
    };
    
    // Empezar a intentar después de un pequeño delay
    setTimeout(tryInit, 300);
});

// Función global para ver detalles del producto
function verDetalleProducto(id) {
    if (id && id > 0) {
        window.location.href = `detalle-producto.php?id=${id}`;
    } else {
        console.error('ID de producto inválido:', id);
    }
}