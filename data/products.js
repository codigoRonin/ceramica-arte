// data/products.js - Base de datos de productos centralizada

const SITE_CONFIG = {
    title: 'Cerámica & Arte',
    description: 'Piezas únicas de cerámica y arte contemporáneo',
    whatsappNumber: '34628742680', // Tu número de WhatsApp
    email: 'info@canaceramica.com',
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
        description: 'Pieza única hecha a mano con cerámica',
        featured: true,
        inStock: true
    },
    {
        id: 2,
        name: 'Cuadro Abstracto "Ecos"',
        price: 295,
        category: 'arte',
        image: 'assets/images/products/2.jpg',
        description: 'Acrílico sobre lienzo, 80x100cm',
        featured: true,
        inStock: true
    },
    {
        id: 3,
        name: 'Escultura "Raíces"',
        price: 238,
        category: 'arte',
        image: 'assets/images/products/3.jpg',
        description: 'Cerámica gres con óxidos naturales',
        featured: true,
        inStock: true
    },
    {
        id: 4,
        name: 'Set de Tazas Artísticas',
        price: 102,
        category: 'ceramica',
        image: 'assets/images/products/2.jpg',
        description: 'Set de 4 tazas únicas con esmaltes reactivos',
        featured: false,
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
        title: 'Expresión Artística con Arcilla',
        duration: '6 semanas',
        level: 'Intermedio',
        price: 204,
        image: 'https://placehold.co/600x400/D2B48C/000000?text=Expresión+Artística',
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
        role: 'Ceramista & Artista',
        bio: 'Con más de 15 años de experiencia en cerámica artística, María combina técnicas tradicionales con enfoques contemporáneos para crear piezas únicas que exploran la relación entre forma y función.',
        image: 'https://placehold.co/400x500/8B4513/FFFFFF?text=María+del+Carmen+Pérez',
        social: {
            instagram: '@maria.ceramica',
            facebook: 'mariagonzalezceramica'
        }
    },
    {
        id: 2,
        name: 'Cora González',
        role: 'Artista Visual & Educadora',
        bio: 'Cora es una artista multidisciplinaria especializada en pintura contemporánea y expresión artística. Su trabajo explora temas de identidad, memoria y conexión humana a través de colores vibrantes y texturas expresivas.',
        image: 'https://placehold.co/400x500/D2B48C/000000?text=Cora+González',
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