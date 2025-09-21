<!-- Incluir header desde header.html -->
<?php include 'header.html'; ?>

  <section class="category-header">
    <div class="container">
      <h1>Placards <span>a Medida</span></h1>
      <p>Soluciones de almacenamiento inteligente que maximizan el espacio y se adaptan perfectamente a tus necesidades</p>
    </div>
  </section>

  <section class="filter-section">
    <div class="container">
      <div class="filters">
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="modernos">Modernos</button>
        <button class="filter-btn" data-filter="clasicos">Clásicos</button>
        <button class="filter-btn" data-filter="minimalista">Minimalista</button>
      </div>
    </div>
  </section>

  <section class="products">
    <div class="container">
      <!-- Loading bar -->
      <div id="products-loading" class="loading-spinner">
        <div class="loading-bar"></div>
        <div class="loading-text">Cargando productos...</div>
      </div>
      
      <!-- Error message -->
      <div id="products-error" class="error-message" style="display: none;">
        <p>Error al cargar los productos. Por favor, recarga la página.</p>
        <button onclick="cargarProductosPlacards()" class="retry-btn">Reintentar</button>
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
              <img id="modal-main-image" src="" alt="">
            </div>
            <div class="gallery-thumbnails">
              <!-- Las miniaturas se generarán dinámicamente -->
            </div>
          </div>
          <div class="modal-info">
            <h2 id="modal-product-name"></h2>
            <p id="modal-product-description"></p>
            <div class="product-specs">
              <h3>Especificaciones:</h3>
              <ul id="modal-product-specs">
                <!-- Las especificaciones se generarán dinámicamente -->
              </ul>
            </div>
            <div class="product-price">
              <span id="modal-product-price"></span>
            </div>
            <button class="contact-btn">Consultar</button>
          </div>
        </div>
      </div>
    </div>
  </section>

<!-- Incluir footer desde footer.html -->
<?php include 'footer.html'; ?>

<script>
// Función para cargar productos de placards desde Supabase
async function cargarProductosPlacards() {
  const loadingEl = document.getElementById('products-loading');
  const errorEl = document.getElementById('products-error');
  const gridEl = document.getElementById('products-grid');
  
  try {
    console.log('Iniciando carga de productos de placards...');
    
    // Mostrar loading, ocultar error y grid
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    gridEl.style.display = 'none';
    
    // Intentar obtener por categoría primero
    let resultado = await productsService.getProductosByCategoria('placares');
    console.log('Resultado de productos de placards:', resultado);
    
    // Si no funciona por categoría, filtrar por nombre (temporal)
    if (!resultado.success || resultado.data.length === 0) {
      console.log('Fallback: filtrando todos los productos por nombre que contenga "placard"');
      const todosProductos = await productsService.getAllProductos();
      
      if (todosProductos.success) {
        resultado = {
          success: true,
          data: todosProductos.data.filter(producto => 
            producto.nombre.toLowerCase().includes('placard') ||
            producto.nombre.toLowerCase().includes('vestidor') ||
            producto.nombre.toLowerCase().includes('ropero')
          )
        };
      }
    }
    
    if (resultado.success && resultado.data && resultado.data.length > 0) {
      // Ocultar loading y mostrar grid
      loadingEl.style.display = 'none';
      gridEl.style.display = 'grid';
      
      // Limpiar grid
      gridEl.innerHTML = '';
      
      // Generar HTML para cada producto usando el método del servicio
      const productosHTML = resultado.data.map(producto => 
        productsService.generarTarjetaProducto(producto)
      ).join('');
      
      gridEl.innerHTML = productosHTML;
      
    } else if (resultado.success && (!resultado.data || resultado.data.length === 0)) {
      // No hay productos en esta categoría
      loadingEl.style.display = 'none';
      gridEl.style.display = 'grid';
      gridEl.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; grid-column: 1 / -1;"><h3>Próximamente</h3><p>Estamos preparando increíbles diseños de placards para ti.</p></div>';
    } else {
      throw new Error(resultado.error || 'No se encontraron productos de placards');
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
      cargarProductosPlacards();
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