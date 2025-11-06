// data/data.js - Base de datos centralizada del sitio
// Contiene: SITE_CONFIG, PRODUCTS, COURSES, EXPERIENCES, AUTHORS

const SITE_CONFIG = {
    title: 'As d\'o Studio',
    description: 'Piezas únicas de cerámica, arte contemporáneo, cursos y experiencias inolvidables',
    whatsappNumber: '34628742680', 
    email: 'info@asdostudio.com',
    phone: '+34 628 74 26 80',
    address: 'Zaragoza, España',
    colors: {
        primary: '#8B4513',
        secondary: '#D2B48C',
        accent: '#2F4F4F'
    }
};

const PRODUCTS = [
    {
        id: 1,
        name: 'Botijo "Toro"',
        price: 195,
        category: 'ceramica',
        image:'assets/images/products/1.png',
        description: 'Pieza única hecha a mano',
        featured: true,
        inStock: true
    },
    {
        id: 2,
        name: 'Cuadro Abstracto "Ecos"',
        price: 295,
        category: 'arte',
        image: 'assets/images/products/2.png',
        description: 'Acrílico sobre lienzo, 80x100cm',
        featured: true,
        inStock: true
    },
    {
        id: 3,
        name: 'Escultura "Raíces"',
        price: 195,
        category: 'arte',
        image: 'assets/images/products/3.png',
        description: 'Cerámica gres con óxidos naturales',
        featured: true,
        inStock: true
    }
];

const COURSES = [
    {
        id: 1,
        title: 'Introducción a la Cerámica',
        duration: '8 semanas',
        level: 'Principiante',
        price: 238,
        image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Curso+Cerámica',
        description: 'Aprende las bases del torno y modelado manual',
        featured: true
    },
    {
        id: 2,
        title: 'Expresión Artística',
        duration: '2 fines de semanas',
        level: 'Intermedio',
        price: 75,
       // image: 'https://placehold.co/600x400/D2B48C/000000?text=Expresión+Artística',          image: 'https://placehold.co/600x400/D2B48C/000000?text=Expresión+Artística',
        image: 'assets/images/courses/2.png', 
        description: 'Explora tu creatividad a través de la cerámica',
        featured: true
    }
];

const EXPERIENCES = [
    {
        id: 3,
        title: 'Retiro Creativo en Toscana',
        duration: '7 días',
        level: 'Todos los niveles',
        price: 1020,
        image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Retiro+Toscana',
        description: 'Inmersión total en cerámica y arte en Italia',
        featured: true,
        type: 'Viaje'
    },
    {
        id: 4,
        title: 'Taller de Cerámica Japonesa',
        duration: '5 días',
        level: 'Intermedio',
        price: 723,
        image: 'https://placehold.co/600x400/D2B48C/000000?text=Cerámica+Japonesa',
        description: 'Aprende técnicas tradicionales japonesas',
        featured: true,
        type: 'Viaje'
    }
];

const AUTHORS = [
    {
        id: 1,
        name: 'María del Carmen Pérez',
        role: 'Ceramista & Educadora',
        bio: 'Con más de 15 años de experiencia en cerámica artística, María del Carmen combina técnicas tradicionales con enfoques contemporáneos para crear piezas únicas que exploran la relación entre forma y función.',
        image: 'assets/images/authors/cana.png',
        social: {
            instagram: '@maria.ceramica',
            facebook: 'mariagonzalezceramica'
        }
    },
    {
        id: 2,
        name: 'Cora González',
        role: 'Artista Visual & Diseñadora',
        bio: 'Cora es una artista multidisciplinaria especializada en pintura contemporánea y expresión artística. Su trabajo explora temas de identidad, memoria y conexión humana a través de colores vibrantes y texturas expresivas.',
        image: 'assets/images/authors/cora.png',
        social: {
            instagram: '@cora.art',
            facebook: 'coragonzalezart'
        }
    }
];

// Exportar para uso global
window.SITE_CONFIG = SITE_CONFIG;
window.PRODUCTS = PRODUCTS;
window.COURSES = COURSES;
window.EXPERIENCES = EXPERIENCES;
window.AUTHORS = AUTHORS;