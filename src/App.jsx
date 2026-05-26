import React, { useState } from 'react';
import AvatarCustomizer from './components/AvatarCustomizer';
import AvatarGallery from './components/AvatarGallery';

/**
 * ============================================================================
 * PROYECTO UNIVERSITARIO: Generador de Avatares 2D y 3D Interactivos
 * INTEGRANTES DEL EQUIPO (TRABAJO EN GRUPO):
 * 1. Cristian Nájera (Estudiante)
 * 2. Katerin Quenta   (Estudiante)
 * 
 * --- DOCUMENTACIÓN INTERNA DE EXPOSICIÓN (AYUDA-MEMORIA) ---
 * 1. CONSUMO DE API 2D (DiceBear):
 *    Se consume un endpoint HTTP REST puro parametrizado:
 *    `https://api.dicebear.com/9.x/{style}/svg?seed={seed}`
 *    Se implementaron parámetros de expresión (eyes, mouth) según el estilo
 *    para dar estados de ánimo dinámicos (Feliz, Sorprendido, Enojado, Guiño).
 *    Para evitar condiciones de carrera al cambiar de estilo en React y
 *    prevenir errores HTTP 400 (Bad Request), se desarrolló un validador
 *    dinámico con fallback automático al primer parámetro válido de cada estilo.
 * 
 * 2. CONSUMO DE LIBRERÍA 3D (Google Model Viewer):
 *    Se integra la biblioteca interactiva `<model-viewer>` cargada via CDN en index.html.
 *    Esto evita dependencias npm pesadas (como Three.js completo) en el entorno de desarrollo,
 *    garantizando un rendimiento veloz del navegador del docente.
 *    Permite cargar archivos 3D binarios (.glb) con iluminación física, sombras, auto-rotación,
 *    controles de cámara al arrastrar, y reproducción de animaciones/poses dinámicas (Bailar, Saludar, Correr).
 *    Se utilizan recursos estables y de alta disponibilidad libres de CORS.
 * 
 * 3. PARTICIÓN DEL TRABAJO:
 *    - Cristian Nájera: Creó el componente customizer, control de estados de 2D/3D,
 *      filtros de estilos/modelos, lógica de semillas y mapeo de expresiones DiceBear.
 *    - Katerin Quenta: Diseñó la galería de favoritos persistente usando localStorage,
 *      copiado de URLs al portapapeles, alertas visuales Toast, y la función de descarga asíncrona
 *      binaria (.glb) y vectorial (.svg) mediante Blobs de memoria.
 * ============================================================================
 */

function App() {
  // Estado global para comunicar los avatares generados por Cristian con la galería de Katerin
  const [currentAvatar, setCurrentAvatar] = useState(null);

  return (
    <div className="app-container">
      {/* Cabecera del Proyecto (Estilo Universitario Limpio y Elegante) */}
      <header className="app-header">
        <h1 className="app-title">✨ Avatar Creator 2D / 3D</h1>
        <p className="app-subtitle">
          Aplicación interactiva para la creación, personalización y descarga de avatares utilizando APIs vectoriales y renderizado tridimensional interactivo.
        </p>
        
        {/* Identificación formal de los integrantes como estudiantes */}
        <div className="authors-badge">
          <div className="author">
            <span className="author-role">Estudiante:</span>
            <span className="author-name">Cristian Nájera</span>
          </div>
          <div className="author">
            <span className="author-role">Estudiante:</span>
            <span className="author-name">Katerin Quenta</span>
          </div>
        </div>
      </header>

      {/* Grid Principal con las dos particiones de desarrollo */}
      <main className="app-grid">
        {/* PARTE A: Customizer - Desarrollado por Cristian Nájera */}
        <AvatarCustomizer 
          onAvatarChange={setCurrentAvatar} 
          currentAvatar={currentAvatar} 
        />

        {/* PARTE B: Gallery & Utils - Desarrollado por Katerin Quenta */}
        <AvatarGallery 
          currentAvatar={currentAvatar} 
        />
      </main>
    </div>
  );
}

export default App;
