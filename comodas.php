
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
      <div class="products-grid">
        <div class="product-card" data-category="modernos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Duo Blanco.jpg" alt="Cómoda Minimalista">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Dúo</h3>
            <p>Una pieza contemporánea que destaca por su diseño simétrico y detalles metálicos.</p>
          </div>
        </div>

        <div class="product-card" data-category="nordicos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Modena Blanco.png" alt="Cómoda Nórdica">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Modena</h3>
            <p>Su estructura limpia y proporciones equilibradas la convierten en un clásico actual.</p>
          </div>
        </div>

        <div class="product-card" data-category="clasicos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Siena Blanco.png" alt="Cómoda Siena">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Siena</h3>
            <p>Combinación de diseño tradicional y líneas modernas para un ambiente distinguido</p>
          </div>
        </div>

        <div class="product-card" data-category="modernos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Luma Blanco.png" alt="Cómoda Luma">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Luma</h3>
            <p>Una propuesta versátil que resalta por su diseño sobrio y moderno.</p>
          </div>
        </div>

        <div class="product-card" data-category="nordicos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Alba Blanco.png" alt="Cómoda Escandinava">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Alba</h3>
            <p>Diseño limpio y equilibrado que aporta calidez a cualquier ambiente.</p>
          </div>
        </div>

        <div class="product-card" data-category="clasicos">
          <div class="product-image">
            <img src="image/comodas/Cómoda Nova Blanco.png" alt="Cómoda Elegante">
            <div class="product-overlay">
              <button class="btn-view">Ver detalles</button>
            </div>
          </div>
          <div class="product-info">
            <h3>Cómoda Nova</h3>
            <p>Una pieza versátil con líneas limpias, ideal para ambientes contemporáneos.</p>
          </div>
        </div>
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