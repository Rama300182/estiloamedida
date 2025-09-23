document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidad de racks
    initRacks();
});

function initRacks() {
    // Configurar filtros
    setupFilters();
    
    // Configurar modal
    setupModal();
    
    // Event listeners para filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupFilters() {
    // Los filtros ya están configurados en el HTML
    console.log('Filtros de racks configurados');
}

function filterProducts(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productStyle = card.getAttribute('data-style');
        
        if (filter === 'all' || productStyle === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Función global para mostrar detalles del producto (llamada desde HTML)
window.mostrarDetalleRack = function(producto) {
    console.log('Mostrando detalles del rack:', producto);
    
    const modal = document.querySelector('.product-detail');
    const mainImage = document.getElementById('modal-main-image');
    const productName = document.getElementById('modal-product-name');
    const productDescription = document.getElementById('modal-product-description');
    const productSpecs = document.getElementById('modal-product-specs');
    const productPrice = document.getElementById('modal-product-price');
    const thumbnailContainer = document.querySelector('.gallery-thumbnails');
    
    // Limpiar contenido anterior
    productSpecs.innerHTML = '';
    thumbnailContainer.innerHTML = '';
    
    // Configurar información básica
    productName.textContent = producto.nombre;
    productDescription.textContent = producto.descripcion;
    mainImage.src = producto.imagen_principal || 'image/racks/default.jpg';
    mainImage.alt = producto.nombre;
    
    // Configurar precio
    if (producto.precio) {
        productPrice.textContent = `$${producto.precio.toLocaleString()}`;
    } else {
        productPrice.textContent = 'Consultar precio';
    }
    
    // Agregar especificaciones
    const specs = [
        { label: 'Categoría', value: 'Racks de TV' },
        { label: 'Material', value: producto.material || 'Melamina de alta calidad' },
        { label: 'Estilo', value: producto.estilo || 'Moderno' },
        { label: 'Dimensiones', value: producto.dimensiones || 'A medida' },
        { label: 'Capacidad TV', value: producto.capacidad_tv || 'Hasta 65 pulgadas' }
    ];
    
    if (producto.color) {
        specs.push({ label: 'Color', value: producto.color });
    }
    
    specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${spec.label}:</strong> <span>${spec.value}</span>`;
        productSpecs.appendChild(li);
    });
    
    // Configurar imágenes (si hay múltiples)
    const imagenes = producto.imagenes ? JSON.parse(producto.imagenes) : [producto.imagen_principal];
    
    if (imagenes && imagenes.length > 1) {
        imagenes.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${img}" alt="${producto.nombre} ${index + 1}">`;
            
            thumbnail.addEventListener('click', function() {
                mainImage.src = img;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

function setupModal() {
    const modal = document.querySelector('.product-detail');
    const closeBtn = document.querySelector('.modal-close');
    const contactBtn = document.querySelector('.contact-btn');
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Botón de contacto
    contactBtn.addEventListener('click', function() {
        // Redirigir a WhatsApp o página de contacto
        const productName = document.getElementById('modal-product-name').textContent;
        const message = `Hola! Me interesa el rack de TV: ${productName}. ¿Podrían darme más información?`;
        const whatsappUrl = `https://wa.me/5491122334455?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

function closeModal() {
    const modal = document.querySelector('.product-detail');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: fadeInUp 0.5s ease forwards;
    }
    
    /* Efecto de hover mejorado para racks */
    .product-card:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    /* Transiciones suaves para filtros */
    .product-card {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

document.head.appendChild(style);

// Función de utilidad para debugging
window.debugRacks = function() {
    console.log('=== DEBUG RACKS ===');
    console.log('Productos cargados:', document.querySelectorAll('.product-card').length);
    console.log('Filtros disponibles:', document.querySelectorAll('.filter-btn').length);
    console.log('Modal configurado:', document.querySelector('.product-detail') ? 'Sí' : 'No');
};

console.log('Racks.js cargado correctamente ✅');