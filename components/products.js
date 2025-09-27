// components/products.js - Componente para renderizar productos

class ProductsComponent {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderFeaturedProducts();
        });
    }

    // Renderizar productos destacados
    renderFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const featuredProducts = PRODUCTS.filter(product => product.featured);
        container.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
    }

    // Crear card de producto
    createProductCard(product) {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover" />
                    <button class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                        <span class="icon-heart"></span>
                    </button>
                    ${!product.inStock ? '<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="text-white font-semibold">Agotado</span></div>' : ''}
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-primary">€${product.price}</span>
                        ${product.inStock ? 
                            `<button class="add-to-cart btn-primary text-white px-6 py-2 rounded-lg" data-product-id="${product.id}">
                                Añadir al carrito
                            </button>` :
                            `<button class="btn-secondary px-6 py-2 rounded-lg opacity-50 cursor-not-allowed" disabled>
                                No disponible
                            </button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar todos los productos (para página de catálogo)
    renderAllProducts(containerId = 'all-products') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = PRODUCTS.map(product => this.createProductCard(product)).join('');
    }

    // Filtrar productos por categoría
    filterByCategory(category, containerId = 'filtered-products') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const filteredProducts = category === 'all' ? 
            PRODUCTS : 
            PRODUCTS.filter(product => product.category === category);

        container.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    }
}

// Inicializar componente
const productsComponent = new ProductsComponent();
window.productsComponent = productsComponent;