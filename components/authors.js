// components/authors.js - Componente para renderizar autoras dinámicamente

class AuthorsComponent {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderAuthors();
        });
    }

    // Renderizar autoras
    renderAuthors() {
        const container = document.getElementById('authors-container');
        if (!container) return;

        container.innerHTML = AUTHORS.map(author => this.createAuthorCard(author)).join('');
    }

    // Crear card de autora
    createAuthorCard(author) {
        return `
            <div class="text-center">
                <div class="relative inline-block mb-6">
                    <img 
                        src="${author.image}" 
                        alt="${author.name}" 
                        class="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"
                    />
                    <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                        <span class="icon-instagram text-gray-600"></span>
                    </div>
                </div>
                <h3 class="text-2xl font-bold mb-2">${author.name}</h3>
                <p class="text-gray-600 mb-4">${author.role}</p>
                <p class="text-gray-700 leading-relaxed">
                    ${author.bio}
                </p>
                <div class="flex justify-center gap-4 mt-4">
                    <a href="https://instagram.com/${author.social.instagram.replace('@', '')}" target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
                        <span class="icon-instagram text-xl"></span>
                    </a>
                    <a href="https://facebook.com/${author.social.facebook}" target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
                        <span class="icon-facebook text-xl"></span>
                    </a>
                </div>
            </div>
        `;
    }
}

// Inicializar componente
const authorsComponent = new AuthorsComponent();
window.authorsComponent = authorsComponent;
