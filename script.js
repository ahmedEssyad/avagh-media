// NAVIGATION FUNCTIONALITY
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

// CHANGE BACKGROUND HEADER
const scrollHeader = () => {
    const nav = document.getElementById('header');
    if (window.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
};

window.addEventListener('scroll', scrollHeader);

// SCROLL REVEAL ANIMATION
const sr = {
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false
};

// Simple scroll reveal implementation
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

// Apply animation to elements
const animateElements = document.querySelectorAll(`
    .hero__content,
    .services__card,
    .production__item,
    .language__badge,
    .about__content,
    .contact__container,
    .stat__item
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(60px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// SERVICES CARDS STAGGERED ANIMATION
const serviceCards = document.querySelectorAll('.services__card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// LANGUAGE BADGES ANIMATION
const languageBadges = document.querySelectorAll('.language__badge');
languageBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.3}s`;
});

// CONTACT FORM FUNCTIONALITY
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formInputs = contactForm.querySelectorAll('.form__input');
        
        // Simple validation
        let isValid = true;
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = 'transparent';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Message envoyé avec succès!', 'success');
            contactForm.reset();
        } else {
            showNotification('Veuillez remplir tous les champs requis.', 'error');
        }
    });
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// TYPING EFFECT FOR HERO TITLE
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// COUNTER ANIMATION FOR STATS
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat__number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 20);
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about__stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// PARALLAX EFFECT FOR HERO BACKGROUND
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroIcons = document.querySelectorAll('.hero__icon');
    
    heroIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// LOADING ANIMATION
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    .loaded .hero__content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .scroll-header {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1) !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// FORM INPUT ANIMATIONS
const formInputs = document.querySelectorAll('.form__input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focus');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focus');
        }
    });
});

// INTERSECTION OBSERVER FOR SECTION ANIMATIONS
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// MOBILE MENU CLOSE ON OUTSIDE CLICK
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
const body = document.body;
const toggleMenuScroll = () => {
    if (navMenu.classList.contains('show-menu')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
};

navToggle?.addEventListener('click', toggleMenuScroll);
navClose?.addEventListener('click', toggleMenuScroll);

// SERVICES CARD TILT EFFECT
const serviceCards2 = document.querySelectorAll('.services__card');
serviceCards2.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// LANGUAGE SYSTEM
let currentLanguage = 'fr';

// Language switcher functionality
const languageButtons = document.querySelectorAll('.lang-btn');
const elementsToTranslate = document.querySelectorAll('[data-translate]');

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    languageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update text content
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.innerHTML.includes('<')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update document direction for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;
    }
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Initialize language system
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language') || 'fr';
    changeLanguage(savedLang);
}

// Add event listeners to language buttons
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        changeLanguage(lang);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLanguage);

console.log('AVAGH Media website loaded successfully! 🚀');