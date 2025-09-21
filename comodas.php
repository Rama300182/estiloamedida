
<!-- Incluir header desde header.html -->
<?php include 'header.html'; ?>

  <section class="category-header">
    <div class="container">
      <h1>Cómodas <span>a Medida</span></h1>
      <p>Piezas funcionales que combinan elegancia y practicidad para organizar tus espacios con estilo</p>
    </div>
  </section>

  <section class="filter-section">
    <div class="container">
      <div class="filters">
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="modernos">Modernos</button>
        <button class="filter-btn" data-filter="clasicos">Clásicos</button>
        <button class="filter-btn" data-filter="nordicos">Nórdicos</button>
      </div>
    </div>
  </section>

  <section class="products">
    <div class="container">
      <!-- Loading spinner -->
      <div id="products-loading" class="loading-spinner" style="text-align: center; padding: 40px;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 15px; color: #666;">Cargando productos...</p>
      </div>
      
      <!-- Error message -->
      <div id="products-error" class="error-message" style="display: none; text-align: center; padding: 40px;">
        <p style="color: #dc3545;">Error al cargar los productos. Por favor, recarga la página.</p>
        <button onclick="cargarProductosComodas()" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Reintentar</button>
      </div>

      <!-- Products grid - Se llenará dinámicamente -->
      <div class="products-grid" id="products-grid" style="display: none;">
        <!-- Los productos se cargarán aquí desde Supabase -->
      </div>
    </div>
  </section>

  <section class="product-detail">
    <div class="container">
      <div class="product-modal">
        <div class="modal-close">×</div>
        <div class="modal-content">
          <div class="modal-gallery">
            <div class="gallery-main">
              <img id="main-image" src="" alt="Producto">
            </div>
            <div class="gallery-thumbs">
              <!-- Thumbnails will be loaded dynamically -->
            </div>
          </div>
          <div class="modal-info">
            <h2 id="product-title"></h2>
            <div class="product-description">
              <p id="product-description"></p>
            </div>
            <div class="product-features">
              <h3>Características</h3>
              <ul id="product-features">
                <!-- Features will be loaded dynamically -->
              </ul>
            </div>
            <div class="product-materials">
              <h3>Colores disponibles</h3>
              <div class="materials-list" id="product-materials">
                <!-- Materials will be loaded dynamically -->
              </div>
            </div>
            <div class="product-actions">
              <a href="#" class="btn btn-primary">Solicitar cotización</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>¿Buscas una <span>cómoda personalizada</span>?</h2>
        <p>Diseñamos muebles que se adaptan perfectamente a tus necesidades y espacio</p>
        <a href="index.html#contacto" class="btn">Contáctanos</a>
      </div>
    </div>
  </section>

 <!-- Incluir footer desde footer.html -->
<?php include 'footer.html'; ?>

<!-- Script para cargar productos de cómodas dinámicamente -->
<script>
// Animación de loading
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Función para cargar productos de cómodas
async function cargarProductosComodas() {
  const loadingEl = document.getElementById('products-loading');
  const errorEl = document.getElementById('products-error');
  const gridEl = document.getElementById('products-grid');

  // Mostrar loading, ocultar error y grid
  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  gridEl.style.display = 'none';

  try {
    // Obtener productos de la categoría cómodas
    const resultado = await productsService.getProductosByCategoria('comodas');
    
    if (resultado.success && resultado.data.length > 0) {
      // Generar HTML para todos los productos
      const productosHTML = resultado.data.map(producto => 
        productsService.generarTarjetaProducto(producto)
      ).join('');
      
      gridEl.innerHTML = productosHTML;
      
      // Ocultar loading, mostrar grid
      loadingEl.style.display = 'none';
      gridEl.style.display = 'grid';
      
      console.log(`✅ Cargados ${resultado.data.length} productos de cómodas`);
      
      // Reinicializar filtros si existe la función
      if (typeof initializeFilters === 'function') {
        initializeFilters();
      }
      
    } else {
      throw new Error('No se encontraron productos de cómodas');
    }
    
  } catch (error) {
    console.error('Error al cargar productos:', error);
    
    // Mostrar error, ocultar loading
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
  }
}

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  // Esperar a que los servicios estén listos
  setTimeout(() => {
    if (typeof productsService !== 'undefined' && productsService) {
      cargarProductosComodas();
    } else {
      console.error('ProductsService no está disponible');
      document.getElementById('products-loading').style.display = 'none';
      document.getElementById('products-error').style.display = 'block';
    }
  }, 1000); // Aumentar tiempo de espera
});
</script>

</body>
</html>