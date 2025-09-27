# Cerámica & Arte �

Una elegante tienda online de cerámica y arte contemporáneo con sistema completo de e-commerce y reservas.

🌐 **[Ver Demo en Vivo](https://tu-usuario.github.io/ceramica-arte)** *(URL se actualizará después del despliegue)*

## ✨ Características principales

- 🛒 **Carrito de compras** con actualización en tiempo real
- 📅 **Sistema de reservas** para cursos y experiencias  
- 📱 **Integración WhatsApp** automática para pedidos
- 🎨 **Diseño responsive** profesional con Tailwind CSS
- 💰 **Precios en euros** con formateo automático
- � **LocalStorage** para persistencia de datos
- ⚡ **Actualizaciones dinámicas** sin recargar página
- 🌍 Experiencias y retiros creativos
- 👥 Información sobre las artistas
- � Navegación móvil completamente responsiva
- � Sistema de notificaciones
- ⚡ Carga rápida y optimizada
- ♿ Accesible y semántico

## 🏗️ Arquitectura del Proyecto

```
/
├── new-index.html              # Página principal optimizada
├── assets/                     # Recursos estáticos
│   ├── css/
│   │   └── styles.css         # Estilos organizados y optimizados
│   ├── js/
│   │   ├── cart.js           # Gestor del carrito de compras
│   │   ├── navigation.js     # Sistema de navegación
│   │   └── utils.js          # Utilidades generales
│   └── images/               # Imágenes del sitio
├── components/                # Componentes reutilizables
│   └── products.js           # Componente de productos
├── data/                     # Datos centralizados
│   └── products.js          # Base de datos de productos
├── index.html               # Versión anterior (respaldo)
├── App.jsx                  # Versión React (desarrollo futuro)
├── package.json             # Configuración del proyecto
└── README.md               # Este archivo
```

## 🚀 Cómo usar

### Opción 1: Servidor Python (Recomendado)

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta:
   ```bash
   python3 -m http.server 3000
   ```
3. Abre tu navegador en: `http://localhost:3000/new-index.html`

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `new-index.html`
3. Selecciona "Open with Live Server"

## 🛒 Funcionalidades del Carrito

### Para el Usuario:
1. **Añadir productos** - Click en "Añadir al carrito"
2. **Ver carrito** - Click en el icono del carrito (🛒)
3. **Modificar cantidades** - Usar +/- en el modal
4. **Enviar pedido** - Click en "Enviar pedido por WhatsApp"

### Flujo Completo:
```
Usuario añade productos → Ve el carrito → Envía por WhatsApp → Tú recibes el mensaje
```

## ⚙️ Configuración

### Cambiar número de WhatsApp:
Edita el archivo `data/products.js`:
```javascript
const SITE_CONFIG = {
    whatsappNumber: '34626742680', // Cambia aquí tu número
    // ...
};
```

### Modificar productos:
En `data/products.js`, edita el array `PRODUCTS`:
```javascript
const PRODUCTS = [
    {
        id: 1,
        name: 'Tu Producto',
        price: 100,
        description: 'Descripción...',
        image: 'url-de-tu-imagen',
        featured: true,
        inStock: true
    },
    // ...
];
```

## 🎨 Personalización

### Colores:
En `data/products.js`:
```javascript
colors: {
    primary: '#8B4513',    // Color principal
    secondary: '#D2B48C',  // Color secundario  
    accent: '#2F4F4F'      // Color de acento
}
```

### Información de contacto:
```javascript
const SITE_CONFIG = {
    title: 'Tu Nombre',
    email: 'tu@email.com',
    phone: '+34 xxx xxx xxx',
    address: 'Tu dirección',
    // ...
};
```

## 📱 WhatsApp Integration

El sistema genera automáticamente mensajes como:
```
¡Hola! Me interesa hacer un pedido desde la web de Cana Cerámica & Arte:

🛒 PRODUCTOS:
• Vaso Escultórico Terracota - €85
• Cuadro Abstracto "Ecos" - €320

💰 TOTAL: €405

📍 Mi información:
Nombre: [Por completar]
Teléfono: [Por completar] 
Dirección: [Por completar]

¡Espero tu respuesta! 😊
```

## 🔧 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Vanilla JavaScript** - Funcionalidad sin frameworks
- **Tailwind CSS** - Framework de CSS utilitario
- **CSS Custom Properties** - Variables CSS organizadas
- **LocalStorage API** - Persistencia del carrito
- **WhatsApp Business API** - Integración de mensajería

## 🌟 Mejores Prácticas Implementadas

- ✅ **Arquitectura modular** - Código organizado por responsabilidades
- ✅ **Separación de datos** - Configuración centralizada
- ✅ **Event delegation** - Manejo eficiente de eventos
- ✅ **Responsive design** - Funciona en todos los dispositivos
- ✅ **Performance optimizado** - Carga rápida
- ✅ **Accesibilidad** - Cumple estándares WCAG
- ✅ **SEO friendly** - Estructura semántica
- ✅ **Progressive enhancement** - Funciona sin JavaScript

## 🔮 Próximas Mejoras

- [ ] Sistema de favoritos
- [ ] Filtros de productos por categoría
- [ ] Galería con lightbox
- [ ] Formulario de contacto
- [ ] Blog/noticias
- [ ] Múltiples idiomas
- [ ] PWA (Progressive Web App)
- [ ] Base de datos real
- [ ] Panel de administración

## 📞 Soporte

Para cualquier duda sobre el código:
- Revisa la documentación en cada archivo
- Los comentarios explican cada función
- Estructura modular fácil de mantener

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## Funcionalidades

### Navegación
- Navegación fija en la parte superior
- Scroll suave entre secciones
- Menú móvil responsive

### Secciones
1. **Hero** - Presentación principal con llamadas a la acción
2. **Productos** - Galería de piezas destacadas de cerámica y arte
3. **Cursos** - Talleres y cursos disponibles
4. **Experiencias** - Retiros creativos y viajes artísticos
5. **Sobre Nosotras** - Información sobre las artistas
6. **Galería** - Colección visual de obras
7. **Footer** - Información de contacto y enlaces

### Características Técnicas
- Componentes React funcionales con hooks
- Estados locales para interactividad
- Responsive design con Tailwind CSS
- Optimización SEO básica
- Imágenes placeholder de alta calidad

## Personalización

### Colores
Los colores principales se pueden modificar en el objeto `mockData.siteInfo`:

```javascript
siteInfo: {
  primaryColor: '#8B4513',    // Color principal (marrón)
  secondaryColor: '#D2B48C',  // Color secundario (beige)
  accentColor: '#2F4F4F'      // Color de acento (gris oscuro)
}
```

### Contenido
Todo el contenido se encuentra en el objeto `mockData` en `App.jsx`:
- Información del sitio
- Datos de las artistas
- Productos
- Cursos
- Experiencias

## Próximas Mejoras

- [ ] Backend para gestión de productos
- [ ] Sistema de pagos
- [ ] Formulario de contacto funcional
- [ ] Administración de contenido
- [ ] Base de datos para productos y usuarios
- [ ] Sistema de reservas para cursos
- [ ] Blog/noticias
- [ ] Galería con lightbox
- [ ] Optimización de imágenes
- [ ] PWA (Progressive Web App)

## Soporte

Para soporte o preguntas sobre el código, consulta la documentación de:
- [React](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React](https://lucide.dev/)