// assets/js/utils.js - Funciones utilitarias

class Utils {
    // Formatear precio
    static formatPrice(price) {
        return `€${price.toFixed(2).replace('.', ',')}`;
    }

    // Scroll suave
    static smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Validar email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Generar ID único
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Formatear número de teléfono
    static formatPhoneNumber(phone) {
        // Eliminar espacios y caracteres especiales
        const cleaned = phone.replace(/\D/g, '');
        
        // Formatear como: +34 XXX XX XX XX
        if (cleaned.length === 9) {
            return `+34 ${cleaned.substr(0, 3)} ${cleaned.substr(3, 2)} ${cleaned.substr(5, 2)} ${cleaned.substr(7, 2)}`;
        }
        return phone;
    }

    // Crear elemento con clases y contenido
    static createElement(tag, classes = '', content = '') {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (content) element.innerHTML = content;
        return element;
    }

    // Mostrar/ocultar elemento
    static toggleElement(element, show) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    // Loader/spinner
    static showLoader(container) {
        const loader = this.createElement('div', 'flex justify-center items-center py-8', `
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        `);
        container.innerHTML = '';
        container.appendChild(loader);
    }

    // Ocultar loader
    static hideLoader(container) {
        const loader = container.querySelector('.animate-spin');
        if (loader) {
            loader.remove();
        }
    }

    // Copiar al portapapeles
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }

    // Toast notification
    static showToast(message, type = 'success', duration = 3000) {
        const toast = this.createElement('div', 
            `fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
                type === 'success' ? 'bg-green-500 text-white' : 
                type === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-500 text-white'
            }`,
            message
        );
        
        document.body.appendChild(toast);
        
        // Mostrar
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Ocultar
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // Obtener parámetros de URL
    static getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (let [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    // Actualizar URL sin recargar
    static updateUrl(params) {
        const url = new URL(window.location);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.pushState({}, '', url);
    }
}

// Hacer disponible globalmente
window.Utils = Utils;