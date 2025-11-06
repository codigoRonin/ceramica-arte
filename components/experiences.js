// components/experiences.js - Componente para renderizar experiencias dinámicamente

class ExperiencesComponent {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderExperiences();
        });
    }

    // Renderizar experiencias
    renderExperiences() {
        const container = document.getElementById('experiences-container');
        if (!container) return;

        container.innerHTML = EXPERIENCES.map(exp => this.createExperienceCard(exp)).join('');
    }

    // Crear card de experiencia
    createExperienceCard(experience) {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img src="${experience.image}" alt="${experience.title}" class="w-full h-48 object-cover" />
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-3">
                        <span class="flex items-center gap-1 text-gray-600">
                            <span class="icon-calendar"></span>
                            ${experience.duration}
                        </span>
                        <span class="flex items-center gap-1 text-gray-600">
                            <span class="icon-plane"></span>
                            ${experience.type}
                        </span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${experience.title}</h3>
                    <p class="text-gray-600 mb-4">${experience.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-primary">€${experience.price}</span>
                        <button class="reserve-course btn-primary text-white px-6 py-2 rounded-lg" data-course-id="${experience.id}">
                            ✈️ Reservar plaza
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Inicializar componente
const experiencesComponent = new ExperiencesComponent();
window.experiencesComponent = experiencesComponent;
