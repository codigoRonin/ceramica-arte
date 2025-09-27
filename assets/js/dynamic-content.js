/**
 * Dynamic Content Manager
 * Actualiza dinámicamente todo el contenido de la página usando los datos de SITE_CONFIG
 */

document.addEventListener('DOMContentLoaded', function() {
    updateDynamicContent();
});

function updateDynamicContent() {
    // Actualizar título de la página
    document.title = SITE_CONFIG.title + ' - Piezas Únicas de Cerámica y Arte';
    
    // Actualizar meta tags
    updateMetaTags();
    
    // Actualizar títulos en la página
    updatePageTitles();
    
    // Actualizar información de contacto
    updateContactInfo();
    
    // Actualizar copyright
    updateCopyright();
}

function updateMetaTags() {
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', SITE_CONFIG.description);
    }
    
    // Meta author
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
        metaAuthor.setAttribute('content', SITE_CONFIG.title);
    }
}

function updatePageTitles() {
    // Título del header (logo/marca)
    const headerTitle = document.querySelector('.text-2xl.font-bold.text-primary');
    if (headerTitle) {
        headerTitle.textContent = SITE_CONFIG.title;
    }
    
    // Títulos en el footer
    const footerTitles = document.querySelectorAll('.text-2xl.font-bold.mb-4.text-primary');
    footerTitles.forEach(title => {
        title.textContent = SITE_CONFIG.title;
    });
    
    // Buscar y actualizar otros títulos que contengan el nombre antiguo
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .font-bold');
    allTextElements.forEach(element => {
        if (element.textContent.includes('Cana Cerámica & Arte')) {
            element.textContent = element.textContent.replace('Cana Cerámica & Arte', SITE_CONFIG.title);
        }
    });
}

function updateContactInfo() {
    // Buscar y actualizar números de teléfono
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        // Solo procesar nodos de texto, no elementos que contengan otros elementos
        if (element.children.length === 0 && element.textContent) {
            let text = element.textContent;
            
            // Actualizar teléfonos
            if (text.includes('+34 626 74 26 80') || text.includes('626742680') || text.includes('626 74 26 80')) {
                element.textContent = text.replace(/\+34 626 74 26 80|626742680|626 74 26 80/g, SITE_CONFIG.phone);
            }
            
            // Actualizar emails
            if (text.includes('info@canaceramica.com')) {
                element.textContent = text.replace('info@canaceramica.com', SITE_CONFIG.email);
            }
            
            // Actualizar direcciones
            if (text.includes('Madrid, España')) {
                element.textContent = text.replace('Madrid, España', SITE_CONFIG.address);
            }
        }
    });
}

function updateCopyright() {
    // Actualizar copyright en el footer
    const copyrightElements = document.querySelectorAll('.text-center.text-gray-400 p, .text-gray-400 p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('© 2024') || element.textContent.includes('&copy; 2024')) {
            element.innerHTML = `&copy; 2024 ${SITE_CONFIG.title}. Todos los derechos reservados.`;
        }
    });
}

console.log('✅ Dynamic Content Manager loaded - All content synchronized with SITE_CONFIG');