// assets/js/cart.js - Gestión del carrito de compras

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.cartIcon = null;
        this.init();
    }

    init() {
        // Inicializar después de que el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            this.cartIcon = document.querySelector('#cart-icon');
            this.updateCartIcon();
            this.bindEvents();
        });
    }

    // Cargar carrito desde localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('cana-ceramica-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            return [];
        }
    }

    // Guardar carrito en localStorage
    saveCart() {
        try {
            localStorage.setItem('cana-ceramica-cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    }

    // Añadir producto al carrito
    addToCart(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartIcon();
        this.showNotification(`"${product.name}" añadido al carrito`);
        return true;
    }

    // Remover producto del carrito
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartIcon();
        this.updateCartModal(); // Actualizar modal si está abierto
    }

    // Actualizar cantidad
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartIcon();
                this.updateCartModal(); // Actualizar modal si está abierto
            }
        }
    }

    // Limpiar carrito
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartIcon();
        this.updateCartModal(); // Actualizar modal si está abierto
    }

    // Obtener total del carrito
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtener cantidad total de productos
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Actualizar icono del carrito
    updateCartIcon() {
        if (this.cartIcon) {
            const totalItems = this.getTotalItems();
            let badge = this.cartIcon.querySelector('.cart-badge');
            
            if (totalItems > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
                    this.cartIcon.appendChild(badge);
                }
                badge.textContent = totalItems;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    // Mostrar notificación
    showNotification(message) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Ocultar notificación
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Generar mensaje de WhatsApp
    generateWhatsAppMessage() {
        if (this.cart.length === 0) {
            return '¡Hola! Me gustaría obtener más información sobre sus productos.';
        }

        let message = `¡Hola! Me interesa hacer un pedido desde la web de ${SITE_CONFIG.title}:\n\n`;
        message += '🛒 PRODUCTOS:\n';
        
        this.cart.forEach(item => {
            message += `• ${item.name} - €${item.price}`;
            if (item.quantity > 1) {
                message += ` (x${item.quantity})`;
            }
            message += '\n';
        });
        
        message += `\n💰 TOTAL: €${this.getTotal()}\n\n`;
        message += '📍 Mi información:\n';
        message += 'Nombre: [Por completar]\n';
        message += 'Teléfono: [Por completar]\n';
        message += 'Dirección: [Por completar]\n\n';
        message += '¡Espero tu respuesta! 😊';
        
        return message;
    }

    // Abrir WhatsApp
    openWhatsApp() {
        const message = this.generateWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    // Mostrar modal del carrito
    showCartModal() {
        this.createCartModal();
    }

    // Crear modal del carrito
    createCartModal() {
        // Remover modal existente si existe
        const existingModal = document.getElementById('cart-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Crear modal
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        
        const modalContent = `
            <div class="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Tu Carrito</h2>
                        <button id="close-cart-modal" class="text-gray-500 hover:text-gray-700">
                            <span class="text-2xl">&times;</span>
                        </button>
                    </div>
                    
                    <div id="cart-items">
                        ${this.renderCartItems()}
                    </div>
                    
                    <div class="border-t pt-4 mt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-lg font-semibold">Total:</span>
                            <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                        </div>
                        
                        ${this.cart.length > 0 ? `
                            <div class="space-y-2">
                                <button id="whatsapp-order" class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                                    📱 Enviar pedido por WhatsApp
                                </button>
                                <button id="clear-cart" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg">
                                    Vaciar carrito
                                </button>
                            </div>
                        ` : `
                            <p class="text-gray-500 text-center py-4">Tu carrito está vacío</p>
                            <button id="close-cart-modal-btn" class="w-full btn-secondary py-3 rounded-lg font-semibold">
                                Seguir comprando
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Bind events del modal
        this.bindModalEvents();
    }

    // Renderizar items del carrito
    renderCartItems() {
        if (this.cart.length === 0) {
            return '<p class="text-gray-500 text-center py-8">Tu carrito está vacío</p>';
        }

        return this.cart.map(item => `
            <div class="flex items-center space-x-4 py-3 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">€${item.price}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">-</button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">+</button>
                </div>
                <button onclick="cart.removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    🗑️
                </button>
            </div>
        `).join('');
    }

    // Bind events del modal
    bindModalEvents() {
        const modal = document.getElementById('cart-modal');
        
        // Cerrar modal
        const closeButtons = modal.querySelectorAll('#close-cart-modal, #close-cart-modal-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        // Cerrar al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // WhatsApp
        const whatsappBtn = modal.querySelector('#whatsapp-order');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                this.openWhatsApp();
                modal.remove();
            });
        }
        
        // Limpiar carrito
        const clearBtn = modal.querySelector('#clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearCart();
                modal.remove();
            });
        }
    }

    // Actualizar modal del carrito si está abierto
    updateCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            // Actualizar items del carrito
            const cartItemsContainer = modal.querySelector('#cart-items');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = this.renderCartItems();
            }
            
            // Actualizar total
            const totalElement = modal.querySelector('.text-2xl.font-bold.text-primary');
            if (totalElement) {
                totalElement.textContent = `€${this.getTotal()}`;
            }
            
            // Actualizar botones según si hay items o no
            const buttonContainer = modal.querySelector('.border-t .space-y-2, .border-t p, .border-t button');
            const buttonContainerParent = modal.querySelector('.border-t');
            if (buttonContainerParent) {
                const buttonsHtml = this.cart.length > 0 ? `
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Total:</span>
                        <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                    </div>
                    <div class="space-y-2">
                        <button id="whatsapp-order" class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                            📱 Enviar pedido por WhatsApp
                        </button>
                        <button id="clear-cart" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg">
                            Vaciar carrito
                        </button>
                    </div>
                ` : `
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Total:</span>
                        <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                    </div>
                    <p class="text-gray-500 text-center py-4">Tu carrito está vacío</p>
                    <button id="close-cart-modal-btn" class="w-full btn-secondary py-3 rounded-lg font-semibold">
                        Seguir comprando
                    </button>
                `;
                buttonContainerParent.innerHTML = buttonsHtml;
                
                // Re-bind events para los nuevos botones
                this.bindModalEvents();
            }
        }
    }

    // Bind events principales
    bindEvents() {
        // Event delegation para botones de añadir al carrito
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart')) {
                e.preventDefault();
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            }
            
            if (e.target.matches('#cart-icon') || e.target.closest('#cart-icon')) {
                e.preventDefault();
                this.showCartModal();
            }
        });
    }
}

// Inicializar carrito globalmente
const cart = new CartManager();
window.cart = cart;