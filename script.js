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

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Find all elements with language attributes and update them
    const elementsWithLang = document.querySelectorAll('[data-en][data-es]');
    
    elementsWithLang.forEach(element => {
        const translation = element.getAttribute('data-' + lang);
        if (translation) {
            // Handle HTML content (like <br> tags)
            if (translation.includes('<br>')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
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
    
    // Update page title based on language
    const titleTranslations = {
        'en': 'Solstice Hostel - Copacabana, Bolivia',
        'es': 'Solstice Hostel - Copacabana, Bolivia'
    };
    document.title = titleTranslations[lang];
    
    // Store language preference in localStorage
    localStorage.setItem('preferred-language', lang);
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference or default to English
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    
    // Set the appropriate button as active
    document.querySelector(`.lang-btn[data-lang="${savedLanguage}"]`).classList.add('active');
    
    // Apply the saved language if it's not English
    if (savedLanguage !== 'en') {
        switchLanguage(savedLanguage);
    }
    
    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});