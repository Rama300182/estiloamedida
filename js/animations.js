// Carrusel automático para proyectos
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let carouselInterval;

// Función para mostrar slide específico
function showSlide(index) {
  const track = document.getElementById('carouselTrack');
  
  // Remover clase active de todos los slides y dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Agregar clase active al slide y dot actual
  if (slides[index]) {
    slides[index].classList.add('active');
  }
  if (dots[index]) {
    dots[index].classList.add('active');
  }
  
  // Mover el track
  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  
  currentSlideIndex = index;
}

// Función para ir al siguiente slide
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(currentSlideIndex);
}

// Función para ir a slide específico (llamada desde los dots)
function currentSlide(index) {
  showSlide(index - 1);
  resetCarouselInterval();
}

// Función para reiniciar el intervalo automático
function resetCarouselInterval() {
  clearInterval(carouselInterval);
  startCarouselAutoplay();
}

// Función para iniciar reproducción automática
function startCarouselAutoplay() {
  carouselInterval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
}

// Función para pausar/reanudar carrusel en hover
function setupCarouselHoverEffects() {
  const carouselContainer = document.querySelector('.carousel-container');
  
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      startCarouselAutoplay();
    });
  }
}

// Observador de intersección para animaciones de cards
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todas las cards con animación
  const animatedCards = document.querySelectorAll('.animate-card');
  animatedCards.forEach(card => {
    observer.observe(card);
  });
}

// Función para inicializar todas las animaciones
function initializeAnimations() {
  // Configurar carrusel si existe
  if (slides.length > 0) {
    showSlide(0);
    startCarouselAutoplay();
    setupCarouselHoverEffects();
  }
  
  // Configurar animaciones de scroll
  setupIntersectionObserver();
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Pausar carrusel cuando la página no está visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(carouselInterval);
  } else {
    if (slides.length > 0) {
      startCarouselAutoplay();
    }
  }
});