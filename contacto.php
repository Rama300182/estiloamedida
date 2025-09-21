<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacto | Estilo a Medida</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/contacto.css">
  <link rel="icon" type="image/png" href="image/logo.png">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Supabase JS -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.min.js"></script>
  
  <!-- Scripts de la aplicación -->
  <script src="config/supabase.js" defer></script>
  <script src="js/leads.service.js" defer></script>
</head>
<body>
  <?php include 'header.html'; ?>

  <section class="contact-hero">
    <div class="container">
      <h1 class="contact-hero-title">¿Listo para crear el espacio de tus sueños?</h1>
      <p class="contact-hero-description">Cuéntanos sobre tu proyecto y haremos que tu visión se convierta en realidad. Nuestro equipo está aquí para ayudarte en cada paso del proceso.</p>
    </div>
  </section>

  <section class="contact-main">
    <div class="contact-container">
      <div class="contact-info">
        <h2 class="contact-info-title">Comencemos tu proyecto</h2>
        <p class="contact-info-text">Completa el formulario y nos pondremos en contacto contigo para discutir tus ideas y crear un presupuesto personalizado.</p>

      <div id="mensaje-resultado"></div>
      
      <div class="contact-form">
        <form onsubmit="enviarFormularioConsulta(event)" id="formulario-contacto">
          <div class="form-group">
            <input type="text" 
                   name="nombre" 
                   class="form-control" 
                   placeholder="Nombre completo" 
                   required
                   minlength="2">
          </div>
          
          <div class="form-group">
            <input type="email" 
                   name="email" 
                   class="form-control" 
                   placeholder="Correo electrónico" 
                   required>
          </div>
          
          <div class="form-group">
            <input type="tel" 
                   name="telefono" 
                   class="form-control" 
                   placeholder="Teléfono (opcional)"
                   pattern="[\+]?[0-9\s\-\(\)]+"
                   title="Ingresa un número de teléfono válido">
          </div>
          
          <div class="form-group">
            <select name="producto_interes" class="form-control">
              <option value="">¿Qué tipo de mueble te interesa?</option>
              <option value="cocinas">Cocinas a medida</option>
              <option value="comodas">Cómodas</option>
              <option value="placards">Placards y vestidores</option>
              <option value="otros">Otros muebles</option>
            </select>
          </div>
          
          <div class="form-group">
            <select name="presupuesto_estimado" class="form-control">
              <option value="">Presupuesto estimado (opcional)</option>
              <option value="hasta_50000">Hasta $50.000</option>
              <option value="50000_100000">$50.000 - $100.000</option>
              <option value="100000_200000">$100.000 - $200.000</option>
              <option value="mas_200000">Más de $200.000</option>
            </select>
          </div>
          
          <div class="form-group">
            <textarea name="mensaje" 
                      class="form-control" 
                      placeholder="Cuéntanos sobre tu proyecto: medidas, estilo preferido, fechas, etc."
                      required
                      minlength="10"
                      rows="5"></textarea>
          </div>
          
          <button type="submit" class="btn">Enviar consulta</button>
          
          <p class="form-disclaimer" style="font-size: 0.9em; color: #666; margin-top: 15px; text-align: center;">
            Al enviar este formulario, aceptas que contactemos contigo para brindarte información sobre nuestros servicios.
          </p>
        </form>
      </div>
    </div>
  </section>

  <?php include 'footer.html'; ?>

  <!-- Scripts -->
  <script src="js/contact.js"></script>
</body>
</html>