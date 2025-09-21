
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            name: "Cómoda Duo",
            category: "modernos",
            slogan: "Elegancia y orden para tus momentos de descanso",
            description: "Una pieza contemporánea que fusiona estética minimalista con máxima funcionalidad. Sus líneas limpias y estructura geométrica aportan equilibrio visual, mientras que su sistema de almacenamiento inteligente optimiza cada centímetro del espacio interior. El diseño elevado sobre patas estilizadas crea una sensación de ligereza, permitiendo que la habitación respire y luzca más amplia.",
            features: [
              "Combinación de cajones y puerta lateral funcional",
              "Manijas metálicas tipo barra en acabado mate",
              "Composición simétrica con detalles de diseño lateral",
              "Cajones con cierre suave para una apertura controlada",
              "Ideal para dormitorios, oficinas o espacios de guardado mixto"
            ],
            dimensions: {
              width: "120 cm",
              height: "85 cm",
              depth: "45 cm"
            },
            colorsAvailable: ["Blanco", "gris", "Blanco-natural", "Negro"],
            images: [
              "image/comodas/Cómoda Duo Blanco.jpg",
              "image/comodas/Cómoda Duo Gris.jpg",
              "image/comodas/Cómoda Duo Blanco Natural.jpg",
              "image/comodas/Cómoda Duo Negro.png"
            ],
            targetRoom: "Dormitorio",
            style: "Minimalista moderno"
          },
          {
            id: 2,
            name: "Cómoda Modena",
            category: "modernos",
            slogan: "Calidez y funcionalidad para ambientes serenos y modernos",
            description: "Modena es una cómoda de líneas horizontales marcadas y diseño refinado. Su estructura permite una distribución equilibrada del espacio, ideal para ambientes donde la organización y el diseño van de la mano. Aporta presencia y sobriedad en contextos modernos.",
            features: [
              "Frente compuesto por múltiples cajones horizontales",
              "Apertura sin tiradores, con rebaje discreto",
              "Diseño modular para máxima capacidad y orden visual",
              "Cajones con cierre suave que evitan golpes o ruidos",
              "Ideal para espacios amplios o muebles principales"
            ],
            materials: ["Pino nórdico", "Fresno natural", "Abedul", "Melamina blanca"],
            dimensions: {
              width: "110 cm",
              height: "80 cm",
              depth: "42 cm"
            },
            colorsAvailable: ["Natural claro", "Blanco escandinavo"],
            images: [
              "image/comodas/Cómoda Modena Blanco.png",
              "image/comodas/Cómoda Modena Gris.png",
              "image/comodas/Cómoda Modena Blanco Natural.png",
              "image/comodas/Cómoda Modena Negro.png"
            ],
            targetRoom: "Dormitorio",
            style: "Escandinavo moderno"
          },          
      {
        id: 3,
        name: "Cómoda Siena",
        category: "modernos",
        description: "Siena fusiona detalles clásicos con un lenguaje moderno. Su composición con módulos diferenciados y herrajes metálicos le otorgan elegancia y funcionalidad. Es una pieza que transmite solidez visual, ideal para quienes buscan un mueble con carácter y sofisticación.",
        features: [
          "Molduras decorativas en frontales y patas",
          "Tiradores metálicos con acabado envejecido",
          "Sistema de guías ocultas para preservar la estética clásica",
          "Acabados patinados que aportan profundidad y carácter",
          "Interiores en madera natural aromática"
        ],
        materials: ["Cerezo", "Caoba", "Nogal oscuro", "Arce"],
        images: [
          "image/comodas/Cómoda Siena Blanco.png",
          "image/comodas/Cómoda Siena Negro.png",
          "image/comodas/Cómoda Siena Blanco Natural.png",
          "image/comodas/Cómoda Siena Negro.png"
        ]
      },
      {
        id: 4,
        name: "Cómoda Luma",
        category: "modernos",
        description: "Luma se destaca por su estética minimalista y su estructura sólida de líneas rectas. Su diseño geométrico, de inspiración contemporánea, la convierte en una pieza ideal para quienes prefieren una propuesta sobria, funcional y con carácter.",
        features: [
          "Diseño geométrico de líneas rectas y simétricas",
          "Frente sin tiradores, con apertura por rebaje superior",
          "Volumen sobrio y moderno para ambientes depurados",
          "Cajones con cierre suave para una experiencia silenciosa",
          "Apta para dormitorios, vestidores o espacios tipo loft"
        ],
        materials: ["Acero negro", "Roble ahumado", "Concreto pulido", "Chapa de zinc"],
        images: [
          "image/comodas/Cómoda Luma Blanco.png",
          "image/comodas/Cómoda Luma Gris.png",
          "image/comodas/Cómoda Luma Blanco Natural.png",
          "image/comodas/Cómoda Luma Negro.png"
        ]
      },
      {
        id: 5,
        name: "Cómoda Alba",
        category: "nordicos",
        description: "Inspirada en la estética escandinava, la cómoda Alba ofrece una solución de guardado práctica y moderna. Su diseño sobrio y proporciones equilibradas brindan un aire de calidez y simplicidad a cualquier ambiente. Ideal para quienes valoran la funcionalidad sin renunciar al diseño.",
        features: [
          "Diseño nórdico con terminaciones limpias",
          "Tiradores integrados tipo “uñero”",
          "Estructura liviana visualmente, con patas ocultas",
          "Cajones con cierre suave para uso diario",
          "Ideal para dormitorios de estilo escandinavo o minimalista"
        ],
        materials: ["Haya natural", "Abedul blanco", "Roble claro", "Bambú"],
        images: [
          "image/comodas/Cómoda Alba Blanco.png",
          "image/comodas/Cómoda Alba Gris.png",
          "image/comodas/Cómoda Alba Blanco Natural.png",
          "image/comodas/Cómoda Alba Negro.png"
        ]
      },
      {
        id: 6,
        name: "Cómoda Nova",
        category: "clasicos",
        description: "Con un diseño limpio y contemporáneo, la cómoda Nova combina elegancia y funcionalidad. Fabricada en melamina y equipada con manijas metálicas lisas, destaca por su estética minimalista y versatilidad para cualquier ambiente moderno. Ideal para quienes buscan simplicidad con estilo.",
        features: [
          "Estructura sólida con estante abierto funcional",
          "Manijas metálicas lisas de diseño moderno",
          "Frentes rectos sin molduras para una estética minimalista",
          "Cajones con cierre suave para mayor confort",
          "Ideal para living, recibidores o espacios amplios"
        ],
        materials: ["Blanco", "Gris", "Blanco/natural", "Negro"],
        images: [
          "image/comodas/Cómoda Nova Blanco.png",
          "image/comodas/Cómoda Nova Gris.png",
          "image/comodas/Cómoda Nova Blanco Natural.png",
          "image/comodas/Cómoda Nova Negro.png"
        ]
      }
    ];
  
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    // Product Detail Modal
    const productDetail = document.querySelector('.product-detail');
    const modalClose = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    // Product info elements
    const mainImage = document.getElementById('main-image');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productFeatures = document.getElementById('product-features');
    const productMaterials = document.getElementById('product-materials');
    const galleryThumbs = document.querySelector('.gallery-thumbs');
    
    // Open modal with product details
    viewButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const product = products[index];
        
        // Set product info
        productTitle.textContent = product.name;
        productDescription.textContent = product.description;
        
        // Clear previous features
        productFeatures.innerHTML = '';
        
        // Add features
        product.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          productFeatures.appendChild(li);
        });
        
        // Clear previous materials
        productMaterials.innerHTML = '';
        
        // Add materials
        product.materials.forEach(material => {
          const span = document.createElement('span');
          span.className = 'material-item';
          span.textContent = material;
          productMaterials.appendChild(span);
        });
        
        // Clear previous thumbnails
        galleryThumbs.innerHTML = '';
        
        // Set main image
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        // Add thumbnails
        product.images.forEach((image, i) => {
          const thumbDiv = document.createElement('div');
          thumbDiv.className = i === 0 ? 'thumb-item active' : 'thumb-item';
          
          const thumbImg = document.createElement('img');
          thumbImg.src = image;
          thumbImg.alt = `${product.name} - Vista ${i+1}`;
          
          thumbDiv.appendChild(thumbImg);
          galleryThumbs.appendChild(thumbDiv);
          
          // Thumbnail click event
          thumbDiv.addEventListener('click', function() {
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumb-item').forEach(thumb => {
              thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            mainImage.src = image;
          });
        });
        
        // Show modal
        productDetail.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
          productDetail.classList.remove('active');
          document.body.style.overflow = 'auto'; // Enable scrolling
        });
    }
    
    // Close modal when clicking outside
    if (productDetail) {
        productDetail.addEventListener('click', function(event) {
          if (event.target === productDetail) {
            productDetail.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
          }
        });
    }
    
    // Responsive menu toggle (for mobile)
    const createMobileMenu = () => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      
      const menuToggle = document.createElement('div');
      menuToggle.className = 'menu-toggle';
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      
      nav.appendChild(menuToggle);
      
      const navLinks = document.querySelector('.nav-links');
      
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    };
    
    // Check if window width is less than 768px
    if (window.innerWidth < 768) {
      createMobileMenu();
    }
    
    // Window resize event
    window.addEventListener('resize', function() {
      if (window.innerWidth < 768 && !document.querySelector('.menu-toggle')) {
        createMobileMenu();
      }
    });
  });