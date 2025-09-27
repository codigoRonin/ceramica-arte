# 🚀 Guía de Despliegue en GitHub Pages

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en **"New repository"** (botón verde)
3. Nombre del repositorio: `ceramica-arte` (o el que prefieras)
4. Descripción: `Tienda online de cerámica y arte con e-commerce`
5. ✅ Marca **"Public"**
6. ❌ NO marques "Add a README file" (ya tienes uno)
7. Click **"Create repository"**

## Paso 2: Configurar Git local

Abre Terminal en tu carpeta del proyecto y ejecuta:

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🎨 Initial commit: Cerámica & Arte e-commerce web"

# Conectar con GitHub (reemplaza TU-USUARIO y TU-REPO)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Subir código
git push -u origin main
```

## Paso 3: Activar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings** (pestaña superior)
2. Scroll hacia abajo hasta **"Pages"** (menú lateral izquierdo)
3. En **"Source"** selecciona: **"Deploy from a branch"**
4. En **"Branch"** selecciona: **"main"**
5. En **"Folder"** deja: **"/ (root)"**
6. Click **"Save"**

## Paso 4: ¡Tu web estará online! 🌐

- **URL**: `https://TU-USUARIO.github.io/TU-REPO`
- **Tiempo**: 2-10 minutos después de activar Pages
- **Certificado HTTPS**: Automático ✅

## 🔄 Actualizaciones automáticas

Cada vez que hagas cambios:

```bash
# Guardar cambios
git add .
git commit -m "✨ Descripción de tu cambio"
git push

# ¡La web se actualiza automáticamente en 1-2 minutos! 🚀
```

## 📱 Comandos útiles para desarrollo

```bash
# Ver estado de archivos
git status

# Ver historial de commits
git log --oneline

# Crear nueva rama para experimentar
git checkout -b nueva-funcionalidad

# Volver a rama principal
git checkout main

# Fusionar cambios
git merge nueva-funcionalidad
```

## 🎯 Próximos pasos después del despliegue

1. **Personalizar URL**: Puedes añadir un dominio personalizado
2. **Analytics**: Añadir Google Analytics
3. **SEO**: Mejorar meta tags para buscadores
4. **Performance**: Optimizar imágenes
5. **PWA**: Convertir en Progressive Web App

## ⚡ Tips pro

- **Commits frecuentes**: Haz commits pequeños y descriptivos
- **Branches**: Usa ramas para nuevas funcionalidades
- **Issues**: Usa GitHub Issues para hacer seguimiento de mejoras
- **Releases**: Crea releases para versiones importantes

## 🆘 Solución de problemas

### La página no se ve:
- Espera 5-10 minutos después de activar Pages
- Verifica que el archivo se llame `index.html`
- Revisa la consola del navegador por errores

### Los estilos no cargan:
- Verifica que las rutas sean relativas (`./assets/css/styles.css`)
- No uses rutas absolutas que empiecen con `/`

### JavaScript no funciona:
- Abre DevTools (F12) y revisa la consola
- Verifica que todos los archivos `.js` estén subidos

---

🎉 **¡Listo! Tu web de cerámica estará online y se actualizará automáticamente con cada commit!**