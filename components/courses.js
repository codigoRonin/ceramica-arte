// components/courses.js - Componente para renderizar cursos dinámicamente

class CoursesComponent {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderCourses();
        });
    }

    // Renderizar cursos
    renderCourses() {
        const container = document.getElementById('courses-container');
        if (!container) return;

        container.innerHTML = COURSES.map(course => this.createCourseCard(course)).join('');
    }

    // Crear card de curso
    createCourseCard(course) {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover" />
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-3">
                        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            ${course.level}
                        </span>
                        <span class="flex items-center gap-1 text-gray-600">
                            <span class="icon-clock"></span>
                            ${course.duration}
                        </span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
                    <p class="text-gray-600 mb-4">${course.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-primary">€${course.price}</span>
                        <button class="reserve-course btn-primary text-white px-6 py-2 rounded-lg" data-course-id="${course.id}">
                            📅 Reservar plaza
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Inicializar componente
const coursesComponent = new CoursesComponent();
window.coursesComponent = coursesComponent;
