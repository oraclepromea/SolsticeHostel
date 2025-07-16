// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 215, 0, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-yellow), var(--primary-orange))';
    }
});

// Image Gallery Modal Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modalCounter = document.getElementById('modalCounter');

let currentImageIndex = 0;
const images = [
    'images/First Photo.jpg',
    'images/_DSC7943.jpg',
    'images/_DSC7961.jpg',
    'images/20240523_122632.jpg',
    'images/Entrance Grand.jpg'
];

const imageAlts = [
    'Solstice Hostel Interior',
    'Hostel Common Area',
    'Hostel Room',
    'Hostel Facilities',
    'Hostel Entrance'
];

// Open modal when gallery item is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openModal();
    });
});

function openModal() {
    galleryModal.style.display = 'block';
    updateModalImage();
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModalFunc() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function updateModalImage() {
    modalImage.src = images[currentImageIndex];
    modalImage.alt = imageAlts[currentImageIndex];
    modalCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

// Event listeners for modal controls
closeModal.addEventListener('click', closeModalFunc);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModalFunc();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (galleryModal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeModalFunc();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.room-card, .amenity-item, .social-area, .attraction-card, .feature, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Book Now button handlers
document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const roomCard = this.closest('.room-card');
        const roomTitle = roomCard.querySelector('h3').textContent;
        const roomPrice = roomCard.querySelector('.price').textContent;
        
        // Simulate booking process
        const originalText = this.textContent;
        this.textContent = 'Booking...';
        this.disabled = true;
        
        setTimeout(() => {
            alert(`Great choice! You've selected the ${roomTitle} for ${roomPrice}. Please contact us to complete your reservation.`);
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Add loading animation to hero section
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.cta-button, .book-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Lazy loading for images (when actual images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-orange);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Auto-rotating Gallery Functionality
let currentSlide = 0;
let autoSlideInterval;

// Breakfast Gallery Functionality
let currentBreakfastSlide = 0;
let breakfastAutoSlideInterval;

// Amenities Gallery Functionality
let currentAmenitiesSlide = 0;
let amenitiesAutoSlideInterval;

function showSlide(index, slides, dots) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
}

function showBreakfastSlide(index, breakfastSlides, breakfastDots) {
    // Remove active class from all breakfast slides and dots
    breakfastSlides.forEach(slide => slide.classList.remove('active'));
    breakfastDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current breakfast slide and dot
    breakfastSlides[index].classList.add('active');
    breakfastDots[index].classList.add('active');
    
    currentBreakfastSlide = index;
}

function showAmenitiesSlide(index, amenitiesSlides, amenitiesDots) {
    // Remove active class from all amenities slides and dots
    amenitiesSlides.forEach(slide => slide.classList.remove('active'));
    amenitiesDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current amenities slide and dot
    amenitiesSlides[index].classList.add('active');
    amenitiesDots[index].classList.add('active');
    
    currentAmenitiesSlide = index;
}

// Initialize auto-rotating galleries
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure all elements are loaded
    setTimeout(() => {
        // Main gallery
        const slides = document.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length > 0) {
            const nextSlide = () => {
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex, slides, dots);
            };
            
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(nextSlide, 3000);
            };
            
            const stopAutoSlide = () => {
                clearInterval(autoSlideInterval);
            };
            
            startAutoSlide();
            
            // Add click handlers to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index, slides, dots);
                    stopAutoSlide();
                    setTimeout(startAutoSlide, 5000);
                });
            });
            
            // Pause auto-slide on hover
            const gallery = document.querySelector('.auto-gallery');
            if (gallery) {
                gallery.addEventListener('mouseenter', stopAutoSlide);
                gallery.addEventListener('mouseleave', startAutoSlide);
            }
        }
        
        // Breakfast gallery
        const breakfastSlides = document.querySelectorAll('.breakfast-slide');
        const breakfastDots = document.querySelectorAll('.breakfast-dot');
        
        console.log('Breakfast slides found:', breakfastSlides.length);
        console.log('Breakfast dots found:', breakfastDots.length);
        
        if (breakfastSlides.length > 0) {
            // Ensure first slide is active
            breakfastSlides[0].classList.add('active');
            if (breakfastDots.length > 0) {
                breakfastDots[0].classList.add('active');
            }
            
            const nextBreakfastSlide = () => {
                const nextIndex = (currentBreakfastSlide + 1) % breakfastSlides.length;
                showBreakfastSlide(nextIndex, breakfastSlides, breakfastDots);
            };
            
            const startBreakfastAutoSlide = () => {
                breakfastAutoSlideInterval = setInterval(nextBreakfastSlide, 3000);
            };
            
            const stopBreakfastAutoSlide = () => {
                clearInterval(breakfastAutoSlideInterval);
            };
            
            startBreakfastAutoSlide();
            
            // Add click handlers to breakfast dots
            breakfastDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showBreakfastSlide(index, breakfastSlides, breakfastDots);
                    stopBreakfastAutoSlide();
                    setTimeout(startBreakfastAutoSlide, 5000);
                });
            });
            
            // Pause auto-slide on hover
            const breakfastGallery = document.querySelector('.breakfast-gallery');
            if (breakfastGallery) {
                breakfastGallery.addEventListener('mouseenter', stopBreakfastAutoSlide);
                breakfastGallery.addEventListener('mouseleave', startBreakfastAutoSlide);
            }
        }
        
        // Amenities gallery
        const amenitiesSlides = document.querySelectorAll('.amenities-slide');
        const amenitiesDots = document.querySelectorAll('.amenities-dot');
        
        console.log('Amenities slides found:', amenitiesSlides.length);
        console.log('Amenities dots found:', amenitiesDots.length);
        
        if (amenitiesSlides.length > 0) {
            // Ensure first slide is active
            amenitiesSlides[0].classList.add('active');
            if (amenitiesDots.length > 0) {
                amenitiesDots[0].classList.add('active');
            }
            
            const nextAmenitiesSlide = () => {
                const nextIndex = (currentAmenitiesSlide + 1) % amenitiesSlides.length;
                showAmenitiesSlide(nextIndex, amenitiesSlides, amenitiesDots);
            };
            
            const startAmenitiesAutoSlide = () => {
                amenitiesAutoSlideInterval = setInterval(nextAmenitiesSlide, 3000);
            };
            
            const stopAmenitiesAutoSlide = () => {
                clearInterval(amenitiesAutoSlideInterval);
            };
            
            startAmenitiesAutoSlide();
            
            // Add click handlers to amenities dots
            amenitiesDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showAmenitiesSlide(index, amenitiesSlides, amenitiesDots);
                    stopAmenitiesAutoSlide();
                    setTimeout(startAmenitiesAutoSlide, 5000);
                });
            });
            
            // Pause auto-slide on hover
            const amenitiesGallery = document.querySelector('.amenities-gallery');
            if (amenitiesGallery) {
                amenitiesGallery.addEventListener('mouseenter', stopAmenitiesAutoSlide);
                amenitiesGallery.addEventListener('mouseleave', startAmenitiesAutoSlide);
            }
        }
    }, 100);
});

// Language Switcher Functionality
let currentLanguage = 'en';

const translations = {
    en: {
        // Navigation
        'home': 'Home',
        'about': 'About',
        'accommodations': 'Accommodations',
        'amenities': 'Amenities',
        'breakfast': 'Breakfast',
        'attractions': 'Local Attractions',
        'contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Welcome to Solstice Hostel',
        'hero-subtitle': 'Your sunny home in beautiful Copacabana, Bolivia',
        'hero-cta': 'Book Your Stay',
        
        // About Section
        'about-title': 'About Solstice Hostel',
        'about-subtitle': 'Experience the warmth of Bolivian hospitality in the heart of Copacabana',
        'about-para1': 'Located in the vibrant town of Copacabana on the shores of Lake Titicaca, Solstice Hostel offers comfortable accommodations with a friendly atmosphere. Our hostel combines modern amenities with traditional Bolivian warmth, making it the perfect base for exploring this magical region.',
        'about-para2': 'Whether you\'re here to visit the famous Isla del Sol, explore local markets, or simply relax by the lake, we provide everything you need for an unforgettable stay.',
        'sunny-location': 'Sunny Location',
        'sunny-desc': 'Perfect spot to enjoy Bolivia\'s beautiful weather',
        'social-atmosphere': 'Social Atmosphere',
        'social-desc': 'Meet fellow travelers from around the world',
        'breakfast-included': 'Breakfast Included',
        'breakfast-desc': 'Start your day with our delicious breakfast',
        
        // Accommodations
        'accommodations-title': 'Accommodations',
        'accommodations-subtitle': 'Comfortable rooms for every type of traveler',
        'book-now': 'Book Now',
        'tax-included': '(tax included)',
        'sleeps': 'Sleeps',
        'private-ensuite': 'Private Ensuite',
        'shared-ensuite': 'Shared Ensuite',
        'mixed-dorm': 'Mixed Dorm',
        
        // Breakfast
        'breakfast-title': 'Breakfast Options',
        'breakfast-subtitle': 'Start your day right with our delicious breakfast selection',
        'included-stay': 'Included with Your Stay',
        'breakfast-para': 'Wake up to a hearty breakfast that will fuel your adventures around Lake Titicaca. Our breakfast menu features a variety of local and international options to satisfy every palate.',
        'breakfast-hours': 'Served daily from 7:00 AM to 10:00 AM in our sunny dining area',
        
        // Amenities
        'amenities-title': 'Amenities & Facilities',
        'amenities-subtitle': 'Everything you need for a comfortable and fun stay',
        'games-entertainment': 'Games & Entertainment',
        'social-areas': 'Social Areas',
        'facilities-action': 'See Our Facilities in Action',
        
        // Attractions
        'attractions-title': 'Local Attractions',
        'attractions-subtitle': 'Discover the wonders of Copacabana and Lake Titicaca',
        
        // Contact
        'contact-title': 'Contact Us',
        'contact-subtitle': 'Get in touch for reservations and inquiries',
        'address': 'Address',
        'phone': 'Phone',
        'email': 'Email',
        'reception-hours': 'Reception Hours',
        'available-24-7': '24/7 Available',
        'ready-book': 'Ready to Book?',
        'booking-desc': 'Reserve your stay at Solstice Hostel through our booking platform for the best rates and instant confirmation.',
        'book-hostelworld': 'Book on Hostelworld',
        'getting-here': 'Getting Here',
        'from-la-paz': 'From La Paz',
        'bus-service': 'Direct bus service available (3-4 hours)',
        'from-terminal': 'From Bus Terminal',
        'walk-hostel': '5-minute walk to hostel',
        'boat-tours': 'Boat Tours',
        'harbor-distance': 'Harbor is just 5 minutes away'
    },
    es: {
        // Navigation
        'home': 'Inicio',
        'about': 'Acerca de',
        'accommodations': 'Alojamiento',
        'amenities': 'Servicios',
        'breakfast': 'Desayuno',
        'attractions': 'Atracciones Locales',
        'contact': 'Contacto',
        
        // Hero Section
        'hero-title': 'Bienvenidos a Solstice Hostel',
        'hero-subtitle': 'Tu hogar soleado en la hermosa Copacabana, Bolivia',
        'hero-cta': 'Reserva tu Estadía',
        
        // About Section
        'about-title': 'Acerca de Solstice Hostel',
        'about-subtitle': 'Experimenta la calidez de la hospitalidad boliviana en el corazón de Copacabana',
        'about-para1': 'Ubicado en el vibrante pueblo de Copacabana a orillas del Lago Titicaca, Solstice Hostel ofrece alojamiento cómodo con un ambiente amigable. Nuestro hostal combina comodidades modernas con la calidez tradicional boliviana, siendo la base perfecta para explorar esta región mágica.',
        'about-para2': 'Ya sea que vengas a visitar la famosa Isla del Sol, explorar mercados locales, o simplemente relajarte junto al lago, proporcionamos todo lo que necesitas para una estadía inolvidable.',
        'sunny-location': 'Ubicación Soleada',
        'sunny-desc': 'Lugar perfecto para disfrutar del hermoso clima de Bolivia',
        'social-atmosphere': 'Ambiente Social',
        'social-desc': 'Conoce viajeros de todo el mundo',
        'breakfast-included': 'Desayuno Incluido',
        'breakfast-desc': 'Comienza tu día con nuestro delicioso desayuno',
        
        // Accommodations
        'accommodations-title': 'Alojamiento',
        'accommodations-subtitle': 'Habitaciones cómodas para todo tipo de viajero',
        'book-now': 'Reservar Ahora',
        'tax-included': '(impuestos incluidos)',
        'sleeps': 'Para',
        'private-ensuite': 'Baño Privado',
        'shared-ensuite': 'Baño Compartido',
        'mixed-dorm': 'Dormitorio Mixto',
        
        // Breakfast
        'breakfast-title': 'Opciones de Desayuno',
        'breakfast-subtitle': 'Comienza tu día con nuestra deliciosa selección de desayunos',
        'included-stay': 'Incluido con tu Estadía',
        'breakfast-para': 'Despierta con un desayuno abundante que alimentará tus aventuras alrededor del Lago Titicaca. Nuestro menú de desayuno incluye una variedad de opciones locales e internacionales para satisfacer todos los gustos.',
        'breakfast-hours': 'Servido diariamente de 7:00 AM a 10:00 AM en nuestro soleado comedor',
        
        // Amenities
        'amenities-title': 'Servicios e Instalaciones',
        'amenities-subtitle': 'Todo lo que necesitas para una estadía cómoda y divertida',
        'games-entertainment': 'Juegos y Entretenimiento',
        'social-areas': 'Áreas Sociales',
        'facilities-action': 'Ve Nuestras Instalaciones en Acción',
        
        // Attractions
        'attractions-title': 'Atracciones Locales',
        'attractions-subtitle': 'Descubre las maravillas de Copacabana y el Lago Titicaca',
        
        // Contact
        'contact-title': 'Contáctanos',
        'contact-subtitle': 'Ponte en contacto para reservas y consultas',
        'address': 'Dirección',
        'phone': 'Teléfono',
        'email': 'Correo',
        'reception-hours': 'Horario de Recepción',
        'available-24-7': 'Disponible 24/7',
        'ready-book': '¿Listo para Reservar?',
        'booking-desc': 'Reserva tu estadía en Solstice Hostel a través de nuestra plataforma de reservas para las mejores tarifas y confirmación instantánea.',
        'book-hostelworld': 'Reservar en Hostelworld',
        'getting-here': 'Cómo Llegar',
        'from-la-paz': 'Desde La Paz',
        'bus-service': 'Servicio directo de autobús disponible (3-4 horas)',
        'from-terminal': 'Desde la Terminal',
        'walk-hostel': 'Caminata de 5 minutos al hostal',
        'boat-tours': 'Tours en Bote',
        'harbor-distance': 'El puerto está a solo 5 minutos'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        const key = link.getAttribute('data-' + lang);
        if (key) link.textContent = key;
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    const heroCta = document.querySelector('.cta-button');
    
    if (heroTitle) heroTitle.textContent = translations[lang]['hero-title'];
    if (heroSubtitle) heroSubtitle.textContent = translations[lang]['hero-subtitle'];
    if (heroCta) heroCta.textContent = translations[lang]['hero-cta'];
    
    // Update section headers
    const sectionHeaders = {
        'about': ['about-title', 'about-subtitle'],
        'accommodations': ['accommodations-title', 'accommodations-subtitle'],
        'breakfast': ['breakfast-title', 'breakfast-subtitle'],
        'amenities': ['amenities-title', 'amenities-subtitle'],
        'attractions': ['attractions-title', 'attractions-subtitle'],
        'contact': ['contact-title', 'contact-subtitle']
    };
    
    Object.entries(sectionHeaders).forEach(([section, keys]) => {
        const sectionEl = document.getElementById(section);
        if (sectionEl) {
            const h2 = sectionEl.querySelector('.section-header h2');
            const p = sectionEl.querySelector('.section-header p');
            if (h2) h2.textContent = translations[lang][keys[0]];
            if (p) p.textContent = translations[lang][keys[1]];
        }
    });
    
    // Update about section content
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    if (aboutParagraphs[0]) aboutParagraphs[0].textContent = translations[lang]['about-para1'];
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = translations[lang]['about-para2'];
    
    // Update feature cards
    const features = document.querySelectorAll('.feature');
    const featureKeys = [
        ['sunny-location', 'sunny-desc'],
        ['social-atmosphere', 'social-desc'],
        ['breakfast-included', 'breakfast-desc']
    ];
    
    features.forEach((feature, index) => {
        if (featureKeys[index]) {
            const h3 = feature.querySelector('h3');
            const p = feature.querySelector('p');
            if (h3) h3.textContent = translations[lang][featureKeys[index][0]];
            if (p) p.textContent = translations[lang][featureKeys[index][1]];
        }
    });
    
    // Update book now buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.textContent = translations[lang]['book-now'];
    });
    
    // Update tax notes
    document.querySelectorAll('.tax-note').forEach(note => {
        note.textContent = translations[lang]['tax-included'];
    });
    
    // Update breakfast section
    const breakfastH3 = document.querySelector('.breakfast-text h3');
    const breakfastPara = document.querySelector('.breakfast-text p');
    const breakfastNote = document.querySelector('.breakfast-note em');
    
    if (breakfastH3) breakfastH3.textContent = translations[lang]['included-stay'];
    if (breakfastPara) breakfastPara.textContent = translations[lang]['breakfast-para'];
    if (breakfastNote) breakfastNote.textContent = translations[lang]['breakfast-hours'];
    
    // Update amenities categories
    const gamesH3 = document.querySelector('.amenities-category h3');
    if (gamesH3 && gamesH3.textContent.includes('Games')) {
        gamesH3.textContent = translations[lang]['games-entertainment'];
    }
    
    // Update contact section
    const contactItems = document.querySelectorAll('.contact-item h4');
    const contactKeys = ['address', 'phone', 'email', 'reception-hours'];
    contactItems.forEach((item, index) => {
        if (contactKeys[index]) {
            item.textContent = translations[lang][contactKeys[index]];
        }
    });
    
    // Update language button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    // Set English as default active
    document.querySelector('.lang-btn[data-lang="en"]').classList.add('active');
    
    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});