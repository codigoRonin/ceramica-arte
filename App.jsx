const { useState, useEffect } = React;
const { 
  Menu, X, Instagram, Facebook, Twitter, Mail, Phone, MapPin, 
  ShoppingCart, User, Heart, Star, Clock, Calendar, Users, 
  Palette, Camera, BookOpen, Plane 
} = lucideReact;

// Mock data for the website
const mockData = {
  siteInfo: {
    title: 'Cana Cerámica & Arte',
    description: 'Piezas únicas de cerámica y arte contemporáneo',
    keywords: 'cerámica, arte, piezas de autor, cursos, experiencias, galería',
    primaryColor: '#8B4513',
    secondaryColor: '#D2B48C',
    accentColor: '#2F4F4F'
  },
  authors: [
    {
      id: 1,
      name: 'María del Carmen Pérez',
      role: 'Ceramista & Artista',
      bio: 'Con más de 15 años de experiencia en cerámica artística, María combina técnicas tradicionales con enfoques contemporáneos para crear piezas únicas que exploran la relación entre forma y función.',
      image: 'https://placehold.co/400x500/8B4513/FFFFFF?text=María+González',
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
      image: 'https://placehold.co/400x500/D2B48C/000000?text=Laura+Martínez',
      social: {
        instagram: '@laura.art',
        facebook: 'lauramartinezarte'
      }
    }
  ],
  products: [
    {
      id: 1,
      name: 'Vaso Escultórico Terracota',
      price: 85,
      category: 'ceramica',
      image: 'https://placehold.co/600x600/8B4513/FFFFFF?text=Vaso+Escultórico',
      description: 'Pieza única hecha a mano con arcilla terracota',
      featured: true
    },
    {
      id: 2,
      name: 'Cuadro Abstracto "Ecos"',
      price: 320,
      category: 'arte',
      image: 'https://placehold.co/600x600/2F4F4F/FFFFFF?text=Cuadro+Abstracto',
      description: 'Acrílico sobre lienzo, 80x100cm',
      featured: true
    },
    {
      id: 3,
      name: 'Set de Tazas Artísticas',
      price: 120,
      category: 'ceramica',
      image: 'https://placehold.co/600x600/D2B48C/000000?text=Set+Tazas',
      description: 'Set de 4 tazas únicas con esmaltes reactivos',
      featured: false
    },
    {
      id: 4,
      name: 'Escultura "Raíces"',
      price: 280,
      category: 'arte',
      image: 'https://placehold.co/600x600/8B4513/FFFFFF?text=Escultura+Raíces',
      description: 'Cerámica gres con óxidos naturales',
      featured: true
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Introducción a la Cerámica',
      duration: '8 semanas',
      level: 'Principiante',
      price: 280,
      image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Curso+Cerámica',
      description: 'Aprende las bases del torno y modelado manual',
      featured: true
    },
    {
      id: 2,
      title: 'Expresión Artística con Arcilla',
      duration: '6 semanas',
      level: 'Intermedio',
      price: 240,
      image: 'https://placehold.co/600x400/D2B48C/000000?text=Expresión+Artística',
      description: 'Explora tu creatividad a través de la cerámica',
      featured: true
    },
    {
      id: 3,
      title: 'Técnicas Avanzadas de Esmaltado',
      duration: '4 semanas',
      level: 'Avanzado',
      price: 200,
      image: 'https://placehold.co/600x400/2F4F4F/FFFFFF?text=Esmaltado+Avanzado',
      description: 'Domina los secretos de los esmaltes reactivos',
      featured: false
    }
  ],
  experiences: [
    {
      id: 1,
      title: 'Retiro Creativo en Toscana',
      duration: '7 días',
      price: 1200,
      image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Toscana+Retiro',
      description: 'Inmersión total en cerámica y arte en Italia',
      featured: true
    },
    {
      id: 2,
      title: 'Taller de Cerámica Japonesa',
      duration: '5 días',
      price: 850,
      image: 'https://placehold.co/600x400/D2B48C/000000?text=Cerámica+Japonesa',
      description: 'Aprende técnicas tradicionales japonesas',
      featured: true
    }
  ]
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockData.siteInfo.primaryColor);

  // SEO Meta Tags
  useEffect(() => {
    document.title = mockData.siteInfo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', mockData.siteInfo.description);
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) keywords.setAttribute('content', mockData.siteInfo.keywords);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FeaturedProducts = () => (
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" },
      mockData.products.filter(p => p.featured).map(product => 
        React.createElement('div', { 
          key: product.id, 
          className: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" 
        },
          React.createElement('div', { className: "relative" },
            React.createElement('img', { 
              src: product.image, 
              alt: product.name, 
              className: "w-full h-64 object-cover" 
            }),
            React.createElement('button', { 
              className: "absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors" 
            },
              React.createElement(Heart, { className: "w-5 h-5 text-gray-600" })
            )
          ),
          React.createElement('div', { className: "p-6" },
            React.createElement('h3', { className: "text-xl font-semibold mb-2" }, product.name),
            React.createElement('p', { className: "text-gray-600 mb-4" }, product.description),
            React.createElement('div', { className: "flex justify-between items-center" },
              React.createElement('span', { 
                className: "text-2xl font-bold", 
                style: { color: selectedColor } 
              }, `$${product.price}`),
              React.createElement('button', { 
                className: "bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors",
                style: { backgroundColor: selectedColor }
              }, "Añadir al carrito")
            )
          )
        )
      )
    )
  );

  const FeaturedCourses = () => (
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      mockData.courses.filter(c => c.featured).map(course => 
        React.createElement('div', { 
          key: course.id, 
          className: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" 
        },
          React.createElement('img', { 
            src: course.image, 
            alt: course.title, 
            className: "w-full h-48 object-cover" 
          }),
          React.createElement('div', { className: "p-6" },
            React.createElement('div', { className: "flex items-center gap-4 mb-3" },
              React.createElement('span', { 
                className: "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium" 
              }, course.level),
              React.createElement('span', { className: "flex items-center gap-1 text-gray-600" },
                React.createElement(Clock, { className: "w-4 h-4" }),
                course.duration
              )
            ),
            React.createElement('h3', { className: "text-xl font-semibold mb-2" }, course.title),
            React.createElement('p', { className: "text-gray-600 mb-4" }, course.description),
            React.createElement('div', { className: "flex justify-between items-center" },
              React.createElement('span', { 
                className: "text-2xl font-bold", 
                style: { color: selectedColor } 
              }, `$${course.price}`),
              React.createElement('button', { 
                className: "bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors",
                style: { backgroundColor: selectedColor }
              }, "Reservar plaza")
            )
          )
        )
      )
    )
  );

  const FeaturedExperiences = () => (
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      mockData.experiences.map(experience => 
        React.createElement('div', { 
          key: experience.id, 
          className: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" 
        },
          React.createElement('img', { 
            src: experience.image, 
            alt: experience.title, 
            className: "w-full h-48 object-cover" 
          }),
          React.createElement('div', { className: "p-6" },
            React.createElement('div', { className: "flex items-center gap-4 mb-3" },
              React.createElement('span', { className: "flex items-center gap-1 text-gray-600" },
                React.createElement(Calendar, { className: "w-4 h-4" }),
                experience.duration
              ),
              React.createElement('span', { className: "flex items-center gap-1 text-gray-600" },
                React.createElement(Plane, { className: "w-4 h-4" }),
                "Viaje"
              )
            ),
            React.createElement('h3', { className: "text-xl font-semibold mb-2" }, experience.title),
            React.createElement('p', { className: "text-gray-600 mb-4" }, experience.description),
            React.createElement('div', { className: "flex justify-between items-center" },
              React.createElement('span', { 
                className: "text-2xl font-bold", 
                style: { color: selectedColor } 
              }, `$${experience.price}`),
              React.createElement('button', { 
                className: "bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors",
                style: { backgroundColor: selectedColor }
              }, "Más información")
            )
          )
        )
      )
    )
  );

  const AuthorsSection = () => (
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-12" },
      mockData.authors.map(author => 
        React.createElement('div', { key: author.id, className: "text-center" },
          React.createElement('div', { className: "relative inline-block mb-6" },
            React.createElement('img', { 
              src: author.image, 
              alt: author.name, 
              className: "w-48 h-48 rounded-full object-cover mx-auto shadow-lg" 
            }),
            React.createElement('div', { className: "absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md" },
              React.createElement(Instagram, { className: "w-6 h-6 text-gray-600" })
            )
          ),
          React.createElement('h3', { className: "text-2xl font-bold mb-2" }, author.name),
          React.createElement('p', { className: "text-gray-600 mb-4" }, author.role),
          React.createElement('p', { className: "text-gray-700 leading-relaxed" }, author.bio),
          React.createElement('div', { className: "flex justify-center gap-4 mt-4" },
            React.createElement('a', { 
              href: "#", 
              className: "text-gray-600 hover:text-gray-900 transition-colors" 
            },
              React.createElement(Instagram, { className: "w-5 h-5" })
            ),
            React.createElement('a', { 
              href: "#", 
              className: "text-gray-600 hover:text-gray-900 transition-colors" 
            },
              React.createElement(Facebook, { className: "w-5 h-5" })
            )
          )
        )
      )
    )
  );

  return React.createElement('div', { className: "min-h-screen bg-gray-50" },
    // Header
    React.createElement('header', { className: "fixed top-0 w-full bg-white shadow-sm z-50" },
      React.createElement('div', { className: "container mx-auto px-4 py-4" },
        React.createElement('div', { className: "flex justify-between items-center" },
          React.createElement('div', {
            className: "text-2xl font-bold cursor-pointer",
            onClick: () => scrollToSection('home'),
            style: { color: selectedColor }
          }, mockData.siteInfo.title),
          
          // Desktop Navigation
          React.createElement('nav', { className: "hidden md:flex items-center gap-8" },
            React.createElement('button', { 
              onClick: () => scrollToSection('productos'), 
              className: "text-gray-700 hover:text-gray-900 transition-colors" 
            }, "Productos"),
            React.createElement('button', { 
              onClick: () => scrollToSection('cursos'), 
              className: "text-gray-700 hover:text-gray-900 transition-colors" 
            }, "Cursos"),
            React.createElement('button', { 
              onClick: () => scrollToSection('experiencias'), 
              className: "text-gray-700 hover:text-gray-900 transition-colors" 
            }, "Experiencias"),
            React.createElement('button', { 
              onClick: () => scrollToSection('sobre-nosotras'), 
              className: "text-gray-700 hover:text-gray-900 transition-colors" 
            }, "Sobre Nosotras"),
            React.createElement('button', { 
              onClick: () => scrollToSection('galeria'), 
              className: "text-gray-700 hover:text-gray-900 transition-colors" 
            }, "Galería")
          ),

          React.createElement('div', { className: "flex items-center gap-4" },
            React.createElement('button', { className: "relative p-2 text-gray-700 hover:text-gray-900 transition-colors" },
              React.createElement(ShoppingCart, { className: "w-6 h-6" }),
              cartItems > 0 && React.createElement('span', { 
                className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" 
              }, cartItems)
            ),
            React.createElement('button', { 
              className: "md:hidden", 
              onClick: () => setIsMenuOpen(!isMenuOpen) 
            },
              isMenuOpen ? React.createElement(X, { className: "w-6 h-6" }) : React.createElement(Menu, { className: "w-6 h-6" })
            )
          )
        )
      ),

      // Mobile Navigation
      isMenuOpen && React.createElement('div', { className: "md:hidden bg-white border-t" },
        React.createElement('div', { className: "container mx-auto px-4 py-4 flex flex-col gap-4" },
          React.createElement('button', { 
            onClick: () => scrollToSection('productos'), 
            className: "text-left py-2 text-gray-700 hover:text-gray-900" 
          }, "Productos"),
          React.createElement('button', { 
            onClick: () => scrollToSection('cursos'), 
            className: "text-left py-2 text-gray-700 hover:text-gray-900" 
          }, "Cursos"),
          React.createElement('button', { 
            onClick: () => scrollToSection('experiencias'), 
            className: "text-left py-2 text-gray-700 hover:text-gray-900" 
          }, "Experiencias"),
          React.createElement('button', { 
            onClick: () => scrollToSection('sobre-nosotras'), 
            className: "text-left py-2 text-gray-700 hover:text-gray-900" 
          }, "Sobre Nosotras"),
          React.createElement('button', { 
            onClick: () => scrollToSection('galeria'), 
            className: "text-left py-2 text-gray-700 hover:text-gray-900" 
          }, "Galería")
        )
      )
    ),

    // Hero Section
    React.createElement('section', { 
      id: "home", 
      className: "pt-20 min-h-screen flex items-center bg-gradient-to-br from-gray-100 to-gray-200" 
    },
      React.createElement('div', { className: "container mx-auto px-4 py-20" },
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" },
          React.createElement('div', null,
            React.createElement('h1', { className: "text-5xl lg:text-6xl font-bold mb-6 leading-tight" },
              "Arte que ",
              React.createElement('span', { style: { color: selectedColor } }, "transforma")
            ),
            React.createElement('p', { className: "text-xl text-gray-600 mb-8 leading-relaxed" },
              "Descubre piezas únicas de cerámica y arte contemporáneo, cursos inmersivos y experiencias transformadoras creadas con pasión y dedicación."
            ),
            React.createElement('div', { className: "flex flex-col sm:flex-row gap-4" },
              React.createElement('button', {
                onClick: () => scrollToSection('productos'),
                className: "bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold",
                style: { backgroundColor: selectedColor }
              }, "Explorar Colección"),
              React.createElement('button', {
                onClick: () => scrollToSection('cursos'),
                className: "border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-lg font-semibold",
                style: { borderColor: selectedColor, color: selectedColor }
              }, "Cursos & Talleres")
            )
          ),
          React.createElement('div', { className: "relative" },
            React.createElement('img', {
              src: "https://placehold.co/600x700/8B4513/FFFFFF?text=Atelier+Cerámico",
              alt: "Atelier Cerámico",
              className: "rounded-2xl shadow-2xl"
            }),
            React.createElement('div', { className: "absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg" },
              React.createElement('div', { className: "flex items-center gap-2" },
                React.createElement(Star, { className: "w-5 h-5 text-yellow-400 fill-current" }),
                React.createElement(Star, { className: "w-5 h-5 text-yellow-400 fill-current" }),
                React.createElement(Star, { className: "w-5 h-5 text-yellow-400 fill-current" }),
                React.createElement(Star, { className: "w-5 h-5 text-yellow-400 fill-current" }),
                React.createElement(Star, { className: "w-5 h-5 text-yellow-400 fill-current" })
              ),
              React.createElement('p', { className: "mt-2 text-gray-600" }, '"Experiencia excepcional"')
            )
          )
        )
      )
    ),

    // Featured Products
    React.createElement('section', { id: "productos", className: "py-20 bg-white" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "text-center mb-16" },
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, "Piezas de Autor"),
          React.createElement('p', { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
            "Cada pieza es única, creada con técnicas ancestrales y una visión contemporánea"
          )
        ),
        React.createElement(FeaturedProducts),
        React.createElement('div', { className: "text-center mt-12" },
          React.createElement('button', {
            className: "border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold",
            style: { borderColor: selectedColor, color: selectedColor }
          }, "Ver toda la colección")
        )
      )
    ),

    // Courses
    React.createElement('section', { id: "cursos", className: "py-20 bg-gray-50" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "text-center mb-16" },
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, "Cursos & Talleres"),
          React.createElement('p', { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
            "Aprende cerámica y expresión artística con nuestras expertas"
          )
        ),
        React.createElement(FeaturedCourses),
        React.createElement('div', { className: "text-center mt-12" },
          React.createElement('button', {
            className: "border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold",
            style: { borderColor: selectedColor, color: selectedColor }
          }, "Ver todos los cursos")
        )
      )
    ),

    // Experiences
    React.createElement('section', { id: "experiencias", className: "py-20 bg-white" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "text-center mb-16" },
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, "Experiencias Únicas"),
          React.createElement('p', { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
            "Viajes y retiros creativos que transformarán tu relación con el arte"
          )
        ),
        React.createElement(FeaturedExperiences),
        React.createElement('div', { className: "text-center mt-12" },
          React.createElement('button', {
            className: "border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold",
            style: { borderColor: selectedColor, color: selectedColor }
          }, "Descubrir experiencias")
        )
      )
    ),

    // About Us
    React.createElement('section', { id: "sobre-nosotras", className: "py-20 bg-gray-50" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "text-center mb-16" },
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, "Sobre Nosotras"),
          React.createElement('p', { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
            "Dos artistas apasionadas por compartir su conocimiento y creatividad"
          )
        ),
        React.createElement(AuthorsSection)
      )
    ),

    // Gallery
    React.createElement('section', { id: "galeria", className: "py-20 bg-white" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "text-center mb-16" },
          React.createElement('h2', { className: "text-4xl font-bold mb-4" }, "Galería"),
          React.createElement('p', { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
            "Un vistazo a nuestras creaciones más recientes"
          )
        ),
        React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" },
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => 
            React.createElement('div', { 
              key: i, 
              className: "aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow" 
            },
              React.createElement('img', {
                src: `https://placehold.co/400x400/${i % 2 === 0 ? '8B4513' : 'D2B48C'}/FFFFFF?text=Obra+${i}`,
                alt: `Obra ${i}`,
                className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              })
            )
          )
        )
      )
    ),

    // Contact & Footer
    React.createElement('footer', { className: "bg-gray-900 text-white py-16" },
      React.createElement('div', { className: "container mx-auto px-4" },
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-8" },
          React.createElement('div', null,
            React.createElement('h3', {
              className: "text-2xl font-bold mb-4",
              style: { color: selectedColor }
            }, mockData.siteInfo.title),
            React.createElement('p', { className: "text-gray-300 mb-4" }, mockData.siteInfo.description),
            React.createElement('div', { className: "flex gap-4" },
              React.createElement('a', { 
                href: "#", 
                className: "text-gray-300 hover:text-white transition-colors" 
              }, React.createElement(Instagram, { className: "w-6 h-6" })),
              React.createElement('a', { 
                href: "#", 
                className: "text-gray-300 hover:text-white transition-colors" 
              }, React.createElement(Facebook, { className: "w-6 h-6" })),
              React.createElement('a', { 
                href: "#", 
                className: "text-gray-300 hover:text-white transition-colors" 
              }, React.createElement(Twitter, { className: "w-6 h-6" }))
            )
          ),
          
          React.createElement('div', null,
            React.createElement('h4', { className: "text-lg font-semibold mb-4" }, "Productos"),
            React.createElement('ul', { className: "space-y-2 text-gray-300" },
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Cerámica de Autor")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Arte Contemporáneo")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Piezas Únicas")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Colecciones"))
            )
          ),
          
          React.createElement('div', null,
            React.createElement('h4', { className: "text-lg font-semibold mb-4" }, "Experiencias"),
            React.createElement('ul', { className: "space-y-2 text-gray-300" },
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Cursos")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Talleres")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Retiros Creativos")),
              React.createElement('li', null, React.createElement('a', { 
                href: "#", 
                className: "hover:text-white transition-colors" 
              }, "Viajes Artísticos"))
            )
          ),
          
          React.createElement('div', null,
            React.createElement('h4', { className: "text-lg font-semibold mb-4" }, "Contacto"),
            React.createElement('div', { className: "space-y-3 text-gray-300" },
              React.createElement('div', { className: "flex items-center gap-3" },
                React.createElement(Mail, { className: "w-5 h-5" }),
                React.createElement('span', null, "info@atelierceramico.com")
              ),
              React.createElement('div', { className: "flex items-center gap-3" },
                React.createElement(Phone, { className: "w-5 h-5" }),
                React.createElement('span', null, "+34 600 000 000")
              ),
              React.createElement('div', { className: "flex items-center gap-3" },
                React.createElement(MapPin, { className: "w-5 h-5" }),
                React.createElement('span', null, "Madrid, España")
              )
            )
          )
        ),
        
        React.createElement('div', { className: "border-t border-gray-800 mt-12 pt-8 text-center text-gray-400" },
          React.createElement('p', null, `© 2024 ${mockData.siteInfo.title}. Todos los derechos reservados.`)
        )
      )
    )
  );
};