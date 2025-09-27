// assets/js/navigation.js - Manejo de la navegación

class NavigationManager {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
            this.updateActiveSection();
        });
    }

    bindEvents() {
        // Toggle menú móvil
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Cerrar menú móvil al hacer clic en enlaces
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Scroll suave para todos los enlaces de navegación
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Actualizar sección activa en scroll
        window.addEventListener('scroll', Utils.debounce(() => {
            this.updateActiveSection();
        }, 100));
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const toggleIcon = document.querySelector('.mobile-menu-toggle span');
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            mobileMenu.classList.add('active');
            toggleIcon.className = 'icon-close text-xl';
        } else {
            mobileMenu.classList.remove('active');
            toggleIcon.className = 'icon-menu text-xl';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const toggleIcon = document.querySelector('.mobile-menu-toggle span');
        
        this.mobileMenuOpen = false;
        mobileMenu.classList.remove('active');
        toggleIcon.className = 'icon-menu text-xl';
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            // Ajustar por la altura del header fijo
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset para header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Actualizar clases activas
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('text-primary', 'font-semibold');
                link.classList.remove('text-gray-700');
            } else {
                link.classList.remove('text-primary', 'font-semibold');
                link.classList.add('text-gray-700');
            }
        });
    }

    // Scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Mostrar/ocultar header en scroll
    initHeaderHide() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Inicializar navegación
const navigationManager = new NavigationManager();
window.navigationManager = navigationManager;