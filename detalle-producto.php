<?php 
// Obtener el ID del producto desde la URL
$producto_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($producto_id <= 0) {
    header('Location: index.php');
    exit;
}
?>
<?php include 'header.html'; ?>

<main class="detalle-producto">
    <!-- Loading State -->
    <div id="loading-estado" class="loading-container">
        <div class="loading-spinner">
            <div class="loading-bar"></div>
            <div class="loading-text">Cargando detalles del producto...</div>
        </div>
    </div>

    <!-- Error State -->
    <div id="error-estado" class="error-container" style="display: none;">
        <div class="error-message">
            <h2>❌ Error</h2>
            <p id="error-mensaje">No se pudo cargar el producto</p>
            <a href="comodas.php" class="btn-primary">← Volver a Cómodas</a>
        </div>
    </div>

    <!-- Producto Content -->
    <div id="producto-contenido" style="display: none;">
        <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="index.php">Inicio</a> > 
                <a href="comodas.php">Cómodas</a> > 
                <span id="breadcrumb-producto">Producto</span>
            </nav>

            <!-- Hero del Producto -->
            <section class="producto-hero">
                <div class="producto-galeria">
                    <div class="imagen-principal">
                        <img id="imagen-principal" src="" alt="Producto">
                        <div class="imagen-navegacion">
                            <button id="prev-imagen" class="nav-btn">❮</button>
                            <button id="next-imagen" class="nav-btn">❯</button>
                        </div>
                    </div>
                    <div class="imagenes-thumbnails" id="thumbnails-container">
                        <!-- Thumbnails se generan dinámicamente -->
                    </div>
                </div>

                <div class="producto-info">
                    <div class="categoria-badge" id="categoria-badge">Categoría</div>
                    <h1 id="producto-nombre">Nombre del Producto</h1>

                    <div class="precio-container" id="precio-container" style="display: none;">
                        <div class="precio-valor" id="precio-valor">$—</div>
                    </div>
                    
                    <p class="producto-slogan" id="producto-slogan">Slogan del producto</p>
                    
                    <div class="producto-especificaciones" id="especificaciones-container">
                        <div class="especificaciones-titulo">Especificaciones</div>
                        <div class="especificaciones-grid">
                            <div class="especificacion">
                                <span class="especificacion-label">Ancho</span>
                                <span class="especificacion-valor" id="dimension-ancho">—</span>
                            </div>
                            <div class="especificacion">
                                <span class="especificacion-label">Alto</span>
                                <span class="especificacion-valor" id="dimension-alto">—</span>
                            </div>
                            <div class="especificacion">
                                <span class="especificacion-label">Profundidad</span>
                                <span class="especificacion-valor" id="dimension-profundidad">—</span>
                            </div>
                        </div>
                    </div>

                    <div class="acciones-producto">
                        <button class="btn-principal" onclick="contactarProducto()">
                            Solicitar información
                        </button>
                        <a href="comodas.php" class="btn-secundario">
                            Ver catálogo completo
                        </a>
                    </div>
                </div>
            </section>

            <!-- Contenido adicional -->
            <div class="producto-contenido">
                <!-- Descripción -->
                <section class="seccion">
                    <h2 class="seccion-titulo">Descripción</h2>
                    <div id="producto-descripcion-texto" class="descripcion-texto">
                        <!-- Se llena dinámicamente -->
                    </div>
                </section>

                <!-- Características -->
                <section class="seccion" id="caracteristicas-section" style="display: none;">
                    <h2 class="seccion-titulo">Características destacadas</h2>
                    <ul id="caracteristicas-lista" class="caracteristicas-lista">
                        <!-- Se llena dinámicamente -->
                    </ul>
                </section>

                <!-- Call to Action Final -->
                <section class="cta-final">
                    <h3 class="cta-titulo">¿Necesitas más información?</h3>
                    <p class="cta-descripcion">
                        Contáctanos para recibir asesoramiento personalizado, 
                        presupuestos detallados y opciones de personalización.
                    </p>
                    <div class="cta-acciones">
                        <button class="btn-principal" onclick="contactarProducto()">
                            Contactar ahora
                        </button>
                        <button class="btn-secundario" onclick="compartirProducto()">
                            Compartir producto
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</main>

<script>
let productoActual = null;
let imagenesProducto = [];
let imagenActualIndex = 0;

// Cargar producto cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const productoId = <?php echo $producto_id; ?>;
    cargarProducto(productoId);
});

async function cargarProducto(id) {
    try {
        // Mostrar loading
        mostrarEstado('loading');
        
        // Esperar a que ProductsService esté disponible
        await esperarServicio('ProductsService');
        
        const resultado = await window.ProductsService.getProductoById(id);
        
        if (!resultado.success) {
            throw new Error(resultado.error || 'Error desconocido');
        }
        
        if (!resultado.data) {
            throw new Error('Producto no encontrado');
        }
        
        productoActual = resultado.data;
        mostrarProducto(resultado.data);
        mostrarEstado('success');
        
    } catch (error) {
        console.error('Error cargando producto:', error);
        mostrarError(error.message);
    }
}

function mostrarEstado(estado) {
    const loading = document.getElementById('loading-estado');
    const error = document.getElementById('error-estado');
    const contenido = document.getElementById('producto-contenido');
    
    loading.style.display = estado === 'loading' ? 'block' : 'none';
    error.style.display = estado === 'error' ? 'block' : 'none';
    contenido.style.display = estado === 'success' ? 'block' : 'none';
}

function mostrarError(mensaje) {
    document.getElementById('error-mensaje').textContent = mensaje;
    mostrarEstado('error');
}

function mostrarProducto(producto) {
    // Título y breadcrumb
    document.title = `${producto.nombre} | Estilo a Medida`;
    document.getElementById('breadcrumb-producto').textContent = producto.nombre;
    
    // Información básica
    document.getElementById('categoria-badge').textContent = producto.categorias?.nombre || 'Producto';
    document.getElementById('producto-nombre').textContent = producto.nombre;
    document.getElementById('producto-slogan').textContent = producto.descripcion_corta || '';
    
    // Descripción
    document.getElementById('producto-descripcion-texto').textContent = producto.descripcion_larga || producto.descripcion_corta || 'Sin descripción disponible.';
    
    // Dimensiones
    if (producto.ancho_cm || producto.alto_cm || producto.profundidad_cm) {
        document.getElementById('dimension-ancho').textContent = producto.ancho_cm ? `${producto.ancho_cm} cm` : '-';
        document.getElementById('dimension-alto').textContent = producto.alto_cm ? `${producto.alto_cm} cm` : '-';
        document.getElementById('dimension-profundidad').textContent = producto.profundidad_cm ? `${producto.profundidad_cm} cm` : '-';
    }
    
    // Precio
    if (producto.precio_desde && producto.precio_desde > 0) {
        document.getElementById('precio-valor').textContent = `$${producto.precio_desde.toLocaleString()}`;
        document.getElementById('precio-container').style.display = 'block';
    }
    
    // Galería de imágenes
    configurarGaleria(producto);
    
    // Features
    mostrarFeatures(producto.producto_features || []);
}

function configurarGaleria(producto) {
    imagenesProducto = [];
    
    // Primero, añadir imágenes adicionales desde producto_fotos
    if (producto.producto_fotos && producto.producto_fotos.length > 0) {
        producto.producto_fotos
            .sort((a, b) => (a.orden || 0) - (b.orden || 0))
            .forEach(foto => {
                imagenesProducto.push({
                    url: foto.url,
                    alt: foto.alt || producto.nombre
                });
            });
    }
    
    // Solo añadir imagen principal si no hay fotos adicionales o si no está ya incluida
    if (producto.imagen_url) {
        const yaExiste = imagenesProducto.some(img => img.url === producto.imagen_url);
        if (!yaExiste) {
            // Añadir al principio si no existe
            imagenesProducto.unshift({
                url: producto.imagen_url,
                alt: producto.nombre
            });
        }
    }
    
    // Si no hay imágenes en producto_fotos, usar la imagen principal
    if (imagenesProducto.length === 0 && producto.imagen_url) {
        imagenesProducto.push({
            url: producto.imagen_url,
            alt: producto.nombre
        });
    }
    
    if (imagenesProducto.length > 0) {
        imagenActualIndex = 0;
        mostrarImagenPrincipal();
        generarThumbnails();
        configurarNavegacionImagenes();
    }
}

function mostrarImagenPrincipal() {
    if (imagenesProducto.length > imagenActualIndex) {
        const imagen = imagenesProducto[imagenActualIndex];
        const imgElement = document.getElementById('imagen-principal');
        imgElement.src = imagen.url;
        imgElement.alt = imagen.alt;
        
        // Actualizar thumbnails activos
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === imagenActualIndex);
        });
    }
}

function generarThumbnails() {
    const container = document.getElementById('thumbnails-container');
    container.innerHTML = '';
    
    imagenesProducto.forEach((imagen, index) => {
        const thumb = document.createElement('img');
        thumb.src = imagen.url;
        thumb.alt = imagen.alt;
        thumb.className = 'thumbnail';
        if (index === 0) thumb.classList.add('active');
        
        thumb.addEventListener('click', () => {
            imagenActualIndex = index;
            mostrarImagenPrincipal();
        });
        
        container.appendChild(thumb);
    });
    
    // Mostrar navegación solo si hay múltiples imágenes
    const navegacion = document.querySelector('.imagen-navegacion');
    navegacion.style.display = imagenesProducto.length > 1 ? 'flex' : 'none';
}

function configurarNavegacionImagenes() {
    document.getElementById('prev-imagen').addEventListener('click', () => {
        if (imagenActualIndex > 0) {
            imagenActualIndex--;
        } else {
            imagenActualIndex = imagenesProducto.length - 1;
        }
        mostrarImagenPrincipal();
    });
    
    document.getElementById('next-imagen').addEventListener('click', () => {
        if (imagenActualIndex < imagenesProducto.length - 1) {
            imagenActualIndex++;
        } else {
            imagenActualIndex = 0;
        }
        mostrarImagenPrincipal();
    });
}

function mostrarFeatures(features) {
    const featuresSection = document.getElementById('caracteristicas-section');
    const featuresLista = document.getElementById('caracteristicas-lista');
    
    if (features && features.length > 0) {
        featuresLista.innerHTML = '';
        
        features
            .sort((a, b) => (a.orden || 0) - (b.orden || 0))
            .forEach(feature => {
                const li = document.createElement('li');
                li.className = 'caracteristica-item';
                li.textContent = feature.texto;
                featuresLista.appendChild(li);
            });
        
        featuresSection.style.display = 'block';
    } else {
        featuresSection.style.display = 'none';
    }
}

function contactarProducto() {
    if (productoActual) {
        // Redirigir al formulario de contacto con el producto preseleccionado
        window.location.href = `index.php#contacto&producto=${encodeURIComponent(productoActual.nombre)}`;
    }
}

function compartirProducto() {
    if (navigator.share && productoActual) {
        navigator.share({
            title: productoActual.nombre,
            text: productoActual.descripcion_corta || `Mira este producto de Estilo a Medida`,
            url: window.location.href
        });
    } else {
        // Fallback: copiar URL al clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('🔗 Enlace copiado al portapapeles'))
            .catch(() => alert('No se pudo copiar el enlace'));
    }
}

// Función auxiliar para esperar a que un servicio esté disponible
async function esperarServicio(nombreServicio, intentosMax = 50) {
    for (let i = 0; i < intentosMax; i++) {
        if (window[nombreServicio] && typeof window[nombreServicio].getProductoById === 'function') {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Servicio ${nombreServicio} no disponible`);
}
</script>

<?php include 'footer.html'; ?>