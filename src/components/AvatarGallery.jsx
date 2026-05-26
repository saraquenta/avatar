import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * COMPONENTE: AvatarGallery
 * DESARROLLADO POR: Katerin Quenta (Estudiante B)
 * 
 * PROPÓSITO:
 * Módulo para gestionar favoritos y la persistencia local de avatares 2D y 3D.
 * Integra alertas Toast personalizadas, copia de URLs de recursos (APIs 2D y GLB 3D),
 * y descarga dinámica de archivos binarios (.glb) y vectoriales (.svg).
 * ============================================================================
 */

export default function AvatarGallery({ currentAvatar }) {
  // --- Estados de la Galería (Katerin Quenta) ---
  const [savedAvatars, setSavedAvatars] = useState([]);
  const [notification, setNotification] = useState('');

  // Cargar avatares guardados en localStorage al montar el componente (Katerin Quenta)
  useEffect(() => {
    const stored = localStorage.getItem('dicebear_saved_avatars');
    if (stored) {
      try {
        setSavedAvatars(JSON.parse(stored));
      } catch (e) {
        console.error("Error al cargar favoritos", e);
      }
    }
  }, []);

  // Mostrar Toast temporal
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // Helpers para convertir hexadecimal a RGBA e inyectar configuraciones PBR en model-viewer (Cristian Nájera/Katerin Quenta)
  const hexToRgba = (hex) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    return [r, g, b, 1.0];
  };

  const applyMiniatureCustomizations = (mv, avatar) => {
    if (!mv || !mv.model || !avatar.customizable) return;

    const materials = mv.model.materials;
    if (materials && materials.length > 0) {
      materials.forEach((mat) => {
        if (!mat.pbrMetallicRoughness) return;
        const rgba = hexToRgba(avatar.bodyColor || '#ffffff');
        mat.pbrMetallicRoughness.setBaseColorFactor(rgba);
        mat.pbrMetallicRoughness.setMetallicFactor(parseFloat(avatar.metallic !== undefined ? avatar.metallic : 0.5));
        mat.pbrMetallicRoughness.setRoughnessFactor(parseFloat(avatar.roughness !== undefined ? avatar.roughness : 0.5));
      });
    }
  };

  // Guardar avatar actual (2D o 3D) en favoritos (Katerin Quenta)
  const handleSaveAvatar = () => {
    if (!currentAvatar || !currentAvatar.url) return;

    // Crear clave de comparación para evitar duplicados basados en URL, animación, expresión y configuraciones PBR
    const isDuplicate = savedAvatars.some(av => 
      av.url === currentAvatar.url && 
      av.animation === currentAvatar.animation && 
      av.expression === currentAvatar.expression &&
      av.bodyColor === currentAvatar.bodyColor &&
      av.metallic === currentAvatar.metallic &&
      av.roughness === currentAvatar.roughness
    );

    if (isDuplicate) {
      showToast('⚠️ Este avatar ya está en tu galería.');
      return;
    }

    // Estructuramos el nuevo objeto avatar con sus respectivos metadatos.
    // Incluye soporte para atributos PBR customizados para la persistencia local de visualizaciones 3D (Katerin Quenta).
    const newAvatar = {
      id: Date.now(),
      is3D: currentAvatar.is3D,
      url: currentAvatar.url,
      style: currentAvatar.style,
      seed: currentAvatar.seed,
      bgColor: currentAvatar.bgColor,
      expression: currentAvatar.expression || '',
      animation: currentAvatar.animation || '',
      // Campos de personalización local 3D PBR
      customizable: currentAvatar.customizable || false,
      bodyColor: currentAvatar.bodyColor || '#ffffff',
      metallic: currentAvatar.metallic !== undefined ? currentAvatar.metallic : 0.5,
      roughness: currentAvatar.roughness !== undefined ? currentAvatar.roughness : 0.5,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newAvatar, ...savedAvatars];
    setSavedAvatars(updated);
    localStorage.setItem('dicebear_saved_avatars', JSON.stringify(updated));
    showToast('💾 ¡Avatar guardado con éxito!');
  };

  // Copiar el enlace de la API/Recurso al portapapeles (Katerin Quenta)
  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('🔗 ¡Enlace copiado al portapapeles!');
    } catch (err) {
      showToast('❌ Error al copiar enlace.');
    }
  };

  // Descarga dinámica unificada para 2D (vectorial SVG) y 3D (binario GLB) (Katerin Quenta)
  const handleDownload = async (avatar) => {
    try {
      showToast('📥 Descargando archivo...');
      const response = await fetch(avatar.url);
      if (!response.ok) throw new Error('Error al descargar el archivo');
      
      let blob;
      let filename;
      
      if (avatar.is3D) {
        // Para avatares 3D descargamos el archivo GLB completo
        blob = await response.blob();
        filename = `${avatar.seed || 'avatar-3d'}.glb`;
      } else {
        // Para avatares 2D descargamos el archivo vectorial SVG
        const svgText = await response.text();
        blob = new Blob([svgText], { type: 'image/svg+xml' });
        filename = `avatar-${avatar.seed || 'dicebear'}.svg`;
      }
      
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      
      showToast('✅ ¡Descarga completada!');
    } catch (err) {
      console.error(err);
      showToast('❌ Error al descargar el archivo.');
    }
  };

  // Eliminar un avatar de favoritos (Katerin Quenta)
  const handleDeleteAvatar = (id) => {
    const updated = savedAvatars.filter(av => av.id !== id);
    setSavedAvatars(updated);
    localStorage.setItem('dicebear_saved_avatars', JSON.stringify(updated));
    showToast('🗑️ Avatar eliminado.');
  };

  return (
    <div className="gallery-card">
      <div className="gallery-header">
        <h2 className="section-title">📂 Mi Galería de Favoritos</h2>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleSaveAvatar}
          disabled={!currentAvatar}
        >
          💖 Guardar Avatar Actual
        </button>
      </div>

      <p className="section-desc">
        Guarda tus combinaciones favoritas. Se almacenan en tu navegador usando la API de LocalStorage.
      </p>

      {/* Alerta Toast temporal (Katerin Quenta) */}
      {notification && (
        <div className="toast-notification animate-fade-in">
          {notification}
        </div>
      )}

      {/* Grid de Favoritos */}
      {savedAvatars.length === 0 ? (
        <div className="empty-gallery">
          <p>Aún no has guardado ningún avatar. ¡Personaliza uno e incorpóralo aquí!</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {savedAvatars.map((av) => (
            <div key={av.id} className="gallery-item animate-scale-up">
              {/* Contenedor de Previsualización: distingue 2D de 3D */}
              <div 
                className="gallery-item-preview"
                style={{ backgroundColor: av.bgColor === 'transparent' ? 'rgba(255,255,255,0.03)' : `#${av.bgColor}` }}
              >
                {av.is3D ? (
                  /* Renderizador 3D Miniatura Interactivo */
                  <model-viewer
                    src={av.url}
                    animation-name={av.animation || undefined}
                    autoplay
                    auto-rotate
                    interaction-prompt="none"
                    onLoad={(e) => applyMiniatureCustomizations(e.target, av)}
                    style={{ width: '100%', height: '100%', outline: 'none' }}
                  ></model-viewer>
                ) : (
                  /* Renderizador 2D Estático */
                  <img src={av.url} alt={`Avatar ${av.seed}`} />
                )}
              </div>
              
              <div className="gallery-item-info">
                <span className="style-tag">{av.is3D ? '🛸 3D Avatar' : '📷 2D DiceBear'}</span>
                
                {/* Mostrar información detallada de la emoción (2D) o animación (3D) */}
                <span className="seed-text" title={av.seed}>
                  {av.is3D ? (av.animation || 'Estático') : `"${av.seed}"`}
                </span>
              </div>

              {/* Acciones del item (Katerin Quenta) */}
              <div className="gallery-item-actions">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleCopyUrl(av.url)}
                  title="Copiar URL del archivo"
                >
                  🔗 Copiar
                </button>
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleDownload(av)}
                  title="Descargar archivo"
                >
                  📥 Bajar
                </button>
                <button
                  type="button"
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteAvatar(av.id)}
                  title="Eliminar de favoritos"
                >
                  🗑️ Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
