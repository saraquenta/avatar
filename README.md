# 🎭 Avatar Creator 2D & 3D (DiceBear & Model Viewer)

Aplicación interactiva para la creación, personalización y descarga de avatares en tiempo real. Desarrollado como proyecto universitario grupal.

## 👥 Integrantes (Estudiantes)
- **Cristian Nájera** (Especialidad: Visualización 3D y Materiales PBR locales)
- **Katerin Quenta** (Especialidad: Consumo de APIs 2D, Galería Local y Descarga asíncrona)

## 🛠️ Tecnologías Utilizadas
- **Núcleo:** React 19, Vite (HMR ultra veloz)
- **Estilos:** Vanilla CSS (Diseño Glassmorphism Premium en tema oscuro)
- **API 2D:** DiceBear v9 (Gráficos vectoriales SVG parametrizados)
- **Librería 3D:** Google Model Viewer CDN (WebGL interactivo)

## 📦 Características Principales
1. **Visualizador 2D:** Mapeo completo de expresiones (ojos y bocas) para evitar errores HTTP 400 mediante un validador reactivo con fallback automático.
2. **Visualizador 3D PBR Local:** Personalizador interactivo de color, reflectividad metálica y rugosidad física sobre modelos esqueléticos binarios (.glb).
3. **Galería Local:** Guardado persistente a través de LocalStorage inyectando de forma asíncrona los materiales personalizados en las miniaturas interactivas.
4. **Descargas Asíncronas:** Descarga unificada de SVG vectoriales (2D) y GLB binarios (3D) en el cliente mediante Blobs en memoria.
