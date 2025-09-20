
<!-- Incluir header desde header.html -->
<?php include 'header.html'; ?>

  <section id="inicio" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Muebles de <span>diseño exclusivo</span> para tu hogar</h1>
          <p>Creamos piezas únicas que reflejan tu personalidad y se adaptan perfectamente a tu espacio. Diseño, funcionalidad y estética se combinan para crear el hogar de tus sueños.</p>
          <a href="#contacto" class="btn">Cotiza tu proyecto</a>
        </div>
        <div class="hero-image">
          <img src="image/cocina/cocinaBeige1.jpeg" alt="Mueble de diseño moderno">
        </div>
      </div>
    </div>
  </section>

  <section id="categorias" class="categories">
    <div class="container">
      <div class="section-title">
        <h2>Nuestras <span>Categorías</span></h2>
        <p>Descubre la variedad de soluciones que podemos ofrecerte</p>
      </div>
      <div class="category-grid">
        <div class="category-card">
          <img src="image/cocina/cocinaBeige1.jpeg" alt="Cocinas a medida">
          <div class="category-overlay">
            <h3>Cocinas</h3>
            <p>Funcionalidad y diseño para el corazón de tu hogar</p>
          </div>
        </div>
        <div class="category-card">
          <img src="image/vestidores/Vestidor Alpha.jpg" alt="Placards y vestidores">
          <div class="category-overlay">
            <h3>Placards</h3>
            <p>Organización y estilo para tus espacios personales</p>
          </div>
        </div>
        <div class="category-card">
            <a href="comodas.php">
              <img src="image/comodas/Cómoda Duo Blanco.jpg" alt="Cómodas y cajoneras">
              <div class="category-overlay">
                <h3>Cómodas</h3>
                <p>Elegancia y practicidad para tus espacios de relax</p>
              </div>
            </a>
          </div>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <div class="section-title">
        <h2>¿Por qué <span>elegirnos</span>?</h2>
        <p>Ventajas que nos distinguen</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-ruler"></i>
          </div>
          <h3>Diseño personalizado</h3>
          <p>Creamos muebles adaptados exactamente a tus necesidades y espacio disponible.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-medal"></i>
          </div>
          <h3>Calidad premium</h3>
          <p>Utilizamos los mejores materiales y acabados para garantizar durabilidad y belleza.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-magic"></i>
          </div>
          <h3>Atención al detalle</h3>
          <p>Cuidamos cada aspecto del diseño y la fabricación para un resultado perfecto.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="proyectos" class="gallery">
    <div class="container">
      <div class="section-title">
        <h2>Nuestros <span>Proyectos</span></h2>
        <p>Inspírate con algunos de nuestros trabajos recientes</p>
      </div>
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="image/cocina/cocinaBeige2.jpeg" alt="Proyecto 1">
        </div>
        <div class="gallery-item">
          <img src="image/cocina/desayunador1.jpeg" alt="Proyecto 2">
        </div>
        <div class="gallery-item">
          <img src="/api/placeholder/300/300" alt="Proyecto 3">
        </div>
        <div class="gallery-item">
          <img src="/api/placeholder/300/300" alt="Proyecto 4">
        </div>
        <div class="gallery-item">
          <img src="/api/placeholder/300/300" alt="Proyecto 5">
        </div>
        <div class="gallery-item">
          <img src="/api/placeholder/300/300" alt="Proyecto 6">
        </div>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <div class="container">
      <div class="section-title">
        <h2>Lo que dicen <span>nuestros clientes</span></h2>
        <p>Experiencias de quienes ya disfrutan de nuestros diseños</p>
      </div>
      <div class="testimonial-container">
        <div class="testimonial">
          <div class="testimonial-text">
            "El proceso de diseño fue increíblemente fácil. Entendieron exactamente lo que necesitábamos y el resultado superó nuestras expectativas. La calidad de los materiales y acabados es excepcional."
          </div>
          <div class="testimonial-author">
            María González, Santiago
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contacto" class="contact">
    <div class="container">
      <div class="section-title">
        <h2>Contacta con <span>nosotros</span></h2>
        <p>Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad</p>
      </div>
      <div class="contact-form">
        <form action="#" method="POST">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Nombre completo" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Correo electrónico" required>
          </div>
          <div class="form-group">
            <input type="tel" class="form-control" placeholder="Teléfono">
          </div>
          <div class="form-group">
            <textarea class="form-control" placeholder="Cuéntanos sobre tu proyecto" required></textarea>
          </div>
          <button type="submit" class="btn">Enviar mensaje</button>
        </form>
      </div>
    </div>
  </section>

<!-- Incluir footer desde footer.html -->
<?php include 'footer.html'; ?>