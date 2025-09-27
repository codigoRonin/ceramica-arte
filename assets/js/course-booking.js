// assets/js/course-booking.js - Gestión de reservas de cursos

class CourseBookingManager {
    constructor() {
        this.bookings = this.loadBookings();
        this.bookingIcon = null;
        this.init();
    }

    init() {
        // Inicializar después de que el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            this.bookingIcon = document.querySelector('#booking-icon');
            this.updateBookingIcon();
            this.bindEvents();
        });
    }

    // Cargar reservas desde localStorage
    loadBookings() {
        try {
            const savedBookings = localStorage.getItem('ceramica-arte-bookings');
            return savedBookings ? JSON.parse(savedBookings) : [];
        } catch (error) {
            console.error('Error al cargar las reservas:', error);
            return [];
        }
    }

    // Guardar reservas en localStorage
    saveBookings() {
        try {
            localStorage.setItem('ceramica-arte-bookings', JSON.stringify(this.bookings));
        } catch (error) {
            console.error('Error al guardar las reservas:', error);
        }
    }

    // Añadir curso o experiencia a reservas
    addBooking(courseId) {
        const course = COURSES.find(c => c.id === courseId) || EXPERIENCES.find(e => e.id === courseId);
        if (!course) return false;

        const existingBooking = this.bookings.find(booking => booking.id === courseId);
        
        if (existingBooking) {
            existingBooking.quantity += 1;
        } else {
            this.bookings.push({
                id: course.id,
                title: course.title,
                duration: course.duration,
                level: course.level,
                price: course.price,
                image: course.image,
                quantity: 1
            });
        }

        this.saveBookings();
        this.updateBookingIcon();
        this.showNotification(`Reserva añadida: "${course.title}"`);
        return true;
    }

    // Remover curso de reservas
    removeBooking(courseId) {
        this.bookings = this.bookings.filter(booking => booking.id !== courseId);
        this.saveBookings();
        this.updateBookingIcon();
        this.updateBookingModal(); // Actualizar modal si está abierto
    }

    // Actualizar cantidad de reserva
    updateBookingQuantity(courseId, quantity) {
        const booking = this.bookings.find(booking => booking.id === courseId);
        if (booking) {
            if (quantity <= 0) {
                this.removeBooking(courseId);
            } else {
                booking.quantity = quantity;
                this.saveBookings();
                this.updateBookingIcon();
                this.updateBookingModal(); // Actualizar modal si está abierto
            }
        }
    }

    // Limpiar todas las reservas
    clearBookings() {
        this.bookings = [];
        this.saveBookings();
        this.updateBookingIcon();
        this.updateBookingModal(); // Actualizar modal si está abierto
    }

    // Obtener total de las reservas
    getTotal() {
        return this.bookings.reduce((total, booking) => total + (booking.price * booking.quantity), 0);
    }

    // Obtener cantidad total de reservas
    getTotalBookings() {
        return this.bookings.reduce((total, booking) => total + booking.quantity, 0);
    }

    // Actualizar icono de reservas
    updateBookingIcon() {
        if (this.bookingIcon) {
            const totalBookings = this.getTotalBookings();
            let badge = this.bookingIcon.querySelector('.booking-badge');
            
            if (totalBookings > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'booking-badge absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
                    this.bookingIcon.appendChild(badge);
                }
                badge.textContent = totalBookings;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    // Mostrar notificación
    showNotification(message) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
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

    // Generar mensaje de WhatsApp para reservas
    generateWhatsAppMessage() {
        if (this.bookings.length === 0) {
            return '¡Hola! Me gustaría obtener más información sobre sus cursos.';
        }

        let message = `¡Hola! Me interesa hacer una reserva desde la web de ${SITE_CONFIG.title}:\n\n`;
        message += '📚 *RESERVAS DE CURSOS Y EXPERIENCIAS:*\n';
        
        this.bookings.forEach(booking => {
            message += `• ${booking.title} (${booking.level}) - €${booking.price}`;
            if (booking.quantity > 1) {
                message += ` (x${booking.quantity} plazas)`;
            }
            message += `\n  ⏱️ Duración: ${booking.duration}\n`;
        });
        
        message += `\n💰 TOTAL: €${this.getTotal()}\n\n`;
        message += '¿Podrían confirmarme la disponibilidad de plazas y los próximos horarios disponibles? ¡Muchas gracias! 😊';
        
        return message;
    }

    // Abrir WhatsApp con el mensaje de reserva
    openWhatsApp() {
        const message = this.generateWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    // Mostrar modal de reservas
    showBookingModal() {
        // Remover modal existente si existe
        const existingModal = document.getElementById('booking-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        
        const modalContent = `
            <div class="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Cursos y Experiencias</h2>
                        <button id="close-booking-modal" class="text-gray-500 hover:text-gray-700">
                            <span class="text-2xl">&times;</span>
                        </button>
                    </div>
                    
                    <div id="booking-items">
                        ${this.renderBookingItems()}
                    </div>
                    
                    <div class="border-t pt-4 mt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-lg font-semibold">Total:</span>
                            <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                        </div>
                        
                        ${this.bookings.length > 0 ? `
                            <div class="space-y-2">
                                <button id="whatsapp-booking" class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                                    📱 Enviar reserva por WhatsApp
                                </button>
                                <button id="clear-bookings" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg">
                                    Limpiar reservas
                                </button>
                            </div>
                        ` : `
                            <p class="text-gray-500 text-center py-4">No tienes reservas pendientes</p>
                            <button id="close-booking-modal-btn" class="w-full btn-secondary py-3 rounded-lg font-semibold">
                                Explorar cursos
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

    // Renderizar items de reservas
    renderBookingItems() {
        if (this.bookings.length === 0) {
            return '<p class="text-gray-500 text-center py-8">No tienes reservas pendientes</p>';
        }

        return this.bookings.map(booking => `
            <div class="flex items-center space-x-4 py-3 border-b">
                <img src="${booking.image}" alt="${booking.title}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-semibold">${booking.title}</h3>
                    <p class="text-sm text-gray-600">${booking.level} • ${booking.duration}</p>
                    <p class="text-gray-600">€${booking.price}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="courseBooking.updateBookingQuantity(${booking.id}, ${booking.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">-</button>
                    <span class="w-8 text-center">${booking.quantity}</span>
                    <button onclick="courseBooking.updateBookingQuantity(${booking.id}, ${booking.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">+</button>
                </div>
                <button onclick="courseBooking.removeBooking(${booking.id})" class="text-red-500 hover:text-red-700">
                    🗑️
                </button>
            </div>
        `).join('');
    }

    // Actualizar modal de reservas si está abierto
    updateBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            // Actualizar items de reservas
            const bookingItemsContainer = modal.querySelector('#booking-items');
            if (bookingItemsContainer) {
                bookingItemsContainer.innerHTML = this.renderBookingItems();
            }
            
            // Actualizar total
            const totalElement = modal.querySelector('.text-2xl.font-bold.text-primary');
            if (totalElement) {
                totalElement.textContent = `€${this.getTotal()}`;
            }
            
            // Actualizar botones según si hay reservas o no
            const buttonContainerParent = modal.querySelector('.border-t');
            if (buttonContainerParent) {
                const buttonsHtml = this.bookings.length > 0 ? `
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Total:</span>
                        <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                    </div>
                    <div class="space-y-2">
                        <button id="whatsapp-booking" class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                            📱 Enviar reserva por WhatsApp
                        </button>
                        <button id="clear-bookings" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg">
                            Limpiar reservas
                        </button>
                    </div>
                ` : `
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Total:</span>
                        <span class="text-2xl font-bold text-primary">€${this.getTotal()}</span>
                    </div>
                    <p class="text-gray-500 text-center py-4">No tienes reservas pendientes</p>
                    <button id="close-booking-modal-btn" class="w-full btn-secondary py-3 rounded-lg font-semibold">
                        Explorar cursos
                    </button>
                `;
                buttonContainerParent.innerHTML = buttonsHtml;
                
                // Re-bind events para los nuevos botones
                this.bindModalEvents();
            }
        }
    }

    // Bind events del modal
    bindModalEvents() {
        const modal = document.getElementById('booking-modal');
        
        // Cerrar modal
        const closeButtons = modal.querySelectorAll('#close-booking-modal, #close-booking-modal-btn');
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
        const whatsappBtn = modal.querySelector('#whatsapp-booking');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                this.openWhatsApp();
                modal.remove();
            });
        }
        
        // Limpiar reservas
        const clearBtn = modal.querySelector('#clear-bookings');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearBookings();
                modal.remove();
            });
        }
    }

    // Bind events principales
    bindEvents() {
        // Event delegation para botones de reservar curso
        document.addEventListener('click', (e) => {
            if (e.target.matches('.reserve-course')) {
                e.preventDefault();
                const courseId = parseInt(e.target.dataset.courseId);
                this.addBooking(courseId);
            }
            
            if (e.target.matches('#booking-icon') || e.target.closest('#booking-icon')) {
                e.preventDefault();
                this.showBookingModal();
            }
        });
    }
}

// Inicializar gestor de reservas globalmente
const courseBooking = new CourseBookingManager();
window.courseBooking = courseBooking;