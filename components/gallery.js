class GalleryComponent {
    constructor() {
        this.currentImageIndex = 0;
        this.gallery = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.gallery = GALLERY;
            this.renderGallery();
            this.createLightbox();
        });
    }

    renderGallery() {
        const container = document.getElementById('gallery-container');
        if (!container || !this.gallery.length) return;

        container.innerHTML = this.gallery.map((item, index) => `
            <div class="group cursor-pointer overflow-hidden rounded-2xl aspect-square" 
                 onclick="galleryComponent.openLightbox(${index})">
                <img src="${item.image}" 
                     alt="${item.title}" 
                     class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
            </div>
        `).join('');
    }

    createLightbox() {
        const lightboxHTML = `
            <div id="lightbox-modal" 
                 class="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 backdrop-blur-sm">
                
                <!-- Close Button -->
                <button onclick="galleryComponent.closeLightbox()" 
                        class="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 group">
                    <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                <!-- Navigation Buttons -->
                <button onclick="galleryComponent.prevImage()" 
                        class="absolute left-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>

                <button onclick="galleryComponent.nextImage()" 
                        class="absolute right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

                <!-- Main Content -->
                <div class="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-12">
                    <!-- Image Container -->
                    <div class="relative max-w-6xl max-h-[70vh] flex items-center justify-center">
                        <img id="lightbox-image" 
                             src="" 
                             alt="" 
                             class="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl animate-fadeIn">
                    </div>

                    <!-- Info Panel -->
                    <div class="mt-8 max-w-2xl text-center animate-slideUp">
                        <h3 id="lightbox-title" 
                            class="text-3xl font-bold text-white mb-3"></h3>
                        <p id="lightbox-description" 
                           class="text-lg text-gray-300 mb-4"></p>
                        <span id="lightbox-category" 
                              class="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium"></span>
                    </div>

                    <!-- Counter -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                        <span id="lightbox-counter" class="text-white text-sm font-medium"></span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Cerrar al hacer clic en el fondo
        document.getElementById('lightbox-modal').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox-modal') {
                this.closeLightbox();
            }
        });

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('lightbox-modal');
            if (modal.classList.contains('flex')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });

        // Añadir animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .animate-slideUp {
                animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightboxContent();
        
        const modal = document.getElementById('lightbox-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const modal = document.getElementById('lightbox-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.gallery.length;
        this.updateLightboxContent();
    }

    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.gallery.length) % this.gallery.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const item = this.gallery[this.currentImageIndex];
        
        document.getElementById('lightbox-image').src = item.image;
        document.getElementById('lightbox-image').alt = item.title;
        document.getElementById('lightbox-title').textContent = item.title;
        document.getElementById('lightbox-description').textContent = item.description;
        document.getElementById('lightbox-category').textContent = item.category.toUpperCase();
        document.getElementById('lightbox-counter').textContent = 
            `${this.currentImageIndex + 1} / ${this.gallery.length}`;
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.galleryComponent = new GalleryComponent();
    });
} else {
    window.galleryComponent = new GalleryComponent();
}
