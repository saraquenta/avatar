import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * COMPONENTE: AvatarCustomizer
 * DESARROLLADO POR: Cristian Nájera (Estudiante A)
 * 
 * PROPÓSITO:
 * Módulo de personalización avanzada. 
 * 1. Resuelve definitivamente los errores 400 en 2D mapeando las enums reales
 *    de DiceBear v9 extraídas directamente del servidor de esquemas JSON.
 * 2. Incorpora un Creador de Humanos 3D Local que opera mediante la API de
 *    Materiales PBR nativa de Google Model Viewer. Permite cambiar el color
 *    de cuerpo, el brillo metálico y la rugosidad en tiempo real sobre el
 *    modelo animado "Cesium Man" y el "Astronauta", garantizando estabilidad
 *    de red absoluta (CORS OK) sin depender de dominios bloqueados.
 * ============================================================================
 */

// Diccionario de estilos y sus opciones reales de personalización en DiceBear v9
const AVATAR_SCHEMAS_2D = {
  lorelei: {
    name: 'Anime (Lorelei)',
    eyes: [
      { id: 'variant01', name: 'Normal 1' },
      { id: 'variant02', name: 'Normal 2' },
      { id: 'variant03', name: 'Serio 1' },
      { id: 'variant04', name: 'Serio 2' },
      { id: 'variant11', name: 'Sorprendido 😮' },
      { id: 'variant12', name: 'Enojado 😠' },
      { id: 'variant14', name: 'Guiño 😉' },
      { id: 'variant15', name: 'Feliz 😁' },
      { id: 'variant22', name: 'Soñador 🌟' }
    ],
    mouth: [
      { id: 'happy01', name: 'Sonrisa 1' },
      { id: 'happy02', name: 'Sonrisa 2' },
      { id: 'happy04', name: 'Feliz Abierto' },
      { id: 'happy10', name: 'Sorpresa Alegre' },
      { id: 'happy18', name: 'Guiño Pícaro' },
      { id: 'sad01', name: 'Neutral / Serio' },
      { id: 'sad03', name: 'Triste 1' },
      { id: 'sad08', name: 'Sorprendido' }
    ]
  },
  avataaars: {
    name: 'Humanos (Avataaars)',
    eyes: [
      { id: 'default', name: 'Normal' },
      { id: 'closed', name: 'Cerrados' },
      { id: 'cry', name: 'Llorando 😢' },
      { id: 'eyeRoll', name: 'Ojos Arriba 🙄' },
      { id: 'happy', name: 'Feliz 😁' },
      { id: 'hearts', name: 'Enamorado 😍' },
      { id: 'side', name: 'Lateral 👀' },
      { id: 'squint', name: 'Entrecerrado' },
      { id: 'surprised', name: 'Sorprendido 😮' },
      { id: 'wink', name: 'Guiño 😉' },
      { id: 'winkWacky', name: 'Guiño Loco 🤪' }
    ],
    mouth: [
      { id: 'default', name: 'Normal' },
      { id: 'concerned', name: 'Preocupado' },
      { id: 'disbelief', name: 'Incrédulo' },
      { id: 'eating', name: 'Comiendo 😋' },
      { id: 'grimace', name: 'Mueca' },
      { id: 'sad', name: 'Triste 😟' },
      { id: 'screamOpen', name: 'Grito 😱' },
      { id: 'serious', name: 'Serio' },
      { id: 'smile', name: 'Sonriente 🙂' },
      { id: 'tongue', name: 'Lengua Fuera 😜' },
      { id: 'twinkle', name: 'Estrella ✨' }
    ]
  },
  bottts: {
    name: 'Robots (Bottts)',
    eyes: [
      { id: 'round', name: 'Redondos' },
      { id: 'bulging', name: 'Saltones 👀' },
      { id: 'dizzy', name: 'Mareado 😵' },
      { id: 'eva', name: 'Visor Eva 🤖' },
      { id: 'frame1', name: 'Visor Fino 1' },
      { id: 'frame2', name: 'Visor Fino 2' },
      { id: 'glow', name: 'Brillo Láser' },
      { id: 'happy', name: 'Alegres' },
      { id: 'hearts', name: 'Corazones ♥️' },
      { id: 'robocop', name: 'Cíclope 🔴' },
      { id: 'sensor', name: 'Sensor Oval' },
      { id: 'shade01', name: 'Lentes Oscuros' }
    ],
    mouth: [
      { id: 'bite', name: 'Mordida' },
      { id: 'diagram', name: 'Frecuencia Digital' },
      { id: 'grill01', name: 'Rejilla 1' },
      { id: 'grill02', name: 'Rejilla 2' },
      { id: 'grill03', name: 'Rejilla 3' },
      { id: 'smile01', name: 'Sonrisa Digital 1' },
      { id: 'smile02', name: 'Sonrisa Digital 2' },
      { id: 'square01', name: 'Boca Cuadrada 1' },
      { id: 'square02', name: 'Boca Cuadrada 2' }
    ]
  },
  adventurer: {
    name: 'Aventureros',
    eyes: [
      { id: 'variant01', name: 'Normales' },
      { id: 'variant02', name: 'Sonrientes' },
      { id: 'variant04', name: 'Felices' },
      { id: 'variant05', name: 'Lentes Verdes 😎' },
      { id: 'variant06', name: 'Lentes Rosas 🌸' },
      { id: 'variant10', name: 'Dormilón 😴' },
      { id: 'variant12', name: 'Molesto 😠' },
      { id: 'variant14', name: 'Parche Pirata 🏴‍☠️' },
      { id: 'variant19', name: 'Sorprendido 😮' },
      { id: 'variant22', name: 'Guiño 😉' },
      { id: 'variant25', name: 'Enamorado 😍' }
    ],
    mouth: [
      { id: 'variant01', name: 'Neutral' },
      { id: 'variant02', name: 'Sonrisa Leve' },
      { id: 'variant03', name: 'Sonrisa Abierta' },
      { id: 'variant04', name: 'Carcajada' },
      { id: 'variant06', name: 'Preocupado' },
      { id: 'variant09', name: 'Enojado 😡' },
      { id: 'variant13', name: 'Sacando Lengua 😛' },
      { id: 'variant20', name: 'Comiendo 😋' },
      { id: 'variant24', name: 'Sorprendido 😮' },
      { id: 'variant30', name: 'Pícaro 😏' }
    ]
  },
  'pixel-art': {
    name: 'Retro Pixel',
    eyes: [
      { id: 'variant01', name: 'Normal 1' },
      { id: 'variant02', name: 'Normal 2' },
      { id: 'variant03', name: 'Molesto' },
      { id: 'variant04', name: 'Feliz' },
      { id: 'variant05', name: 'Guiño 😉' },
      { id: 'variant07', name: 'Cerrados' },
      { id: 'variant11', name: 'Gafas de Sol' },
      { id: 'variant12', name: 'Lentes 👓' }
    ],
    mouth: [
      { id: 'happy01', name: 'Sonrisa Normal' },
      { id: 'happy02', name: 'Feliz Abierta' },
      { id: 'happy06', name: 'Sacando Lengua 😛' },
      { id: 'happy10', name: 'Sonrisa Dientes' },
      { id: 'sad01', name: 'Serio' },
      { id: 'sad03', name: 'Triste 😢' },
      { id: 'sad04', name: 'Sorprendido' },
      { id: 'sad07', name: 'Molesto' }
    ]
  },
  shapes: {
    name: 'Figuras Abstractas',
    eyes: [],
    mouth: []
  }
};

// Modelos 3D estables y sus animaciones, garantizados libres de CORS
const MODELS_3D = [
  {
    id: 'fox',
    name: '🦊 Zorro Animado',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb',
    animations: [
      { id: 'Survey', name: '🧐 Explorar' },
      { id: 'Walk', name: '🚶 Caminar' },
      { id: 'Run', name: '🏃 Correr' }
    ]
  },
  {
    id: 'robo-buddy',
    name: '🤖 Robo-Buddy (Robot)',
    url: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    animations: [
      { id: 'Dance', name: '🕺 Bailar' },
      { id: 'Wave', name: '👋 Saludar' },
      { id: 'Jump', name: '🦘 Saltar' },
      { id: 'Running', name: '🏃 Correr' },
      { id: 'Idle', name: '🧘 Reposo' }
    ]
  },
  {
    id: 'astronaut',
    name: '👨‍🚀 Astronauta Cyber',
    url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    animations: [],
    customizable: true // Soporta la personalización local de materiales PBR
  },
  {
    id: 'human-cyber',
    name: '👤 Humano Cyber (Cesium Man)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb',
    animations: [
      { id: 'anim_0', name: '🏃 Correr' }
    ],
    customizable: true // Soporta la personalización local de materiales PBR
  }
];

// Colores de fondo de cortesía
const BACKGROUND_COLORS = [
  { id: 'transparent', name: 'Transparente', value: 'transparent' },
  { id: 'b6e3f4', name: 'Celeste Claro', value: 'b6e3f4' },
  { id: 'c0aede', name: 'Lavanda', value: 'c0aede' },
  { id: 'd1d4f9', name: 'Azul Pastel', value: 'd1d4f9' },
  { id: 'ffd5dc', name: 'Rosa Dulce', value: 'ffd5dc' },
  { id: 'ffdfbf', name: 'Naranja Suave', value: 'ffdfbf' }
];

// Colores del cuerpo 3D PBR
const PBR_BODY_COLORS = [
  { id: 'default', name: 'Por Defecto', value: '#ffffff' },
  { id: 'neon-cyan', name: 'Cyan Neón', value: '#06b6d4' },
  { id: 'neon-indigo', name: 'Indigo Neón', value: '#6366f1' },
  { id: 'gold', name: 'Oro Cyber', value: '#ffd700' },
  { id: 'ruby', name: 'Rubí Brillante', value: '#ef4444' },
  { id: 'emerald', name: 'Esmeralda', value: '#10b981' }
];

export default function AvatarCustomizer({ onAvatarChange, currentAvatar }) {
  // --- Estados de Control General ---
  const [mode, setMode] = useState('2d'); // '2d' o '3d'
  const [bgColor, setBgColor] = useState('c0aede');
  const [isLoading, setIsLoading] = useState(false);

  // --- Estados del Modo 2D ---
  const [style2d, setStyle2d] = useState('lorelei');
  const [seed2d, setSeed2d] = useState('Cristian');
  const [selectedEyes, setSelectedEyes] = useState('variant01');
  const [selectedMouth, setSelectedMouth] = useState('happy01');
  const [flip2d, setFlip2d] = useState(false);

  // --- Estados del Modo 3D ---
  const [selected3dIdx, setSelected3dIdx] = useState(0);
  const [animation3d, setAnimation3d] = useState('Survey');
  
  // --- Estados de Personalización Local PBR 3D ---
  const [bodyColor3d, setBodyColor3d] = useState('#ffffff');
  const [metallic3d, setMetallic3d] = useState(0.5);
  const [roughness3d, setRoughness3d] = useState(0.5);

  // Obtener esquema 2D y modelo 3D actuales
  const activeSchema2D = AVATAR_SCHEMAS_2D[style2d] || AVATAR_SCHEMAS_2D.lorelei;
  const active3dModel = MODELS_3D[selected3dIdx];

  // Sincronizar selectores por defecto cuando el usuario cambia de estilo 2D
  useEffect(() => {
    if (activeSchema2D.eyes.length > 0) {
      setSelectedEyes(activeSchema2D.eyes[0].id);
    } else {
      setSelectedEyes('');
    }

    if (activeSchema2D.mouth.length > 0) {
      setSelectedMouth(activeSchema2D.mouth[0].id);
    } else {
      setSelectedMouth('');
    }
  }, [style2d]);

  // Helper para convertir Hex (#ffffff) a valores normalizados RGBA [0.0 - 1.0] requeridos por model-viewer
  const hexToRgba = (hex) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    return [r, g, b, 1.0];
  };

  // Función para aplicar de manera dinámica los materiales PBR locales al cargarse el visualizador
  const apply3dCustomizations = (mv) => {
    if (!mv || !mv.model) return;
    
    // Solo aplicamos si el modelo activo es personalizable (Mannequin o Astronauta)
    if (!active3dModel.customizable) return;

    const materials = mv.model.materials;
    if (materials && materials.length > 0) {
      // Iteramos sobre todos los materiales del modelo para cambiar su traje/piel simultáneamente
      materials.forEach((mat) => {
        if (!mat.pbrMetallicRoughness) return;
        
        // 1. Color Base (Base Color Factor)
        const rgba = hexToRgba(bodyColor3d);
        mat.pbrMetallicRoughness.setBaseColorFactor(rgba);
        
        // 2. Brillo Metálico (Metallic Factor)
        mat.pbrMetallicRoughness.setMetallicFactor(parseFloat(metallic3d));
        
        // 3. Rugosidad del material (Roughness Factor)
        mat.pbrMetallicRoughness.setRoughnessFactor(parseFloat(roughness3d));
      });
    }
  };

  // Sincronizar las modificaciones de materiales locales en tiempo real con el visor (Cristian Nájera)
  useEffect(() => {
    if (mode === '3d') {
      const mv = document.querySelector('#customizer-viewer');
      if (mv) {
        apply3dCustomizations(mv);
      }
    }
  }, [bodyColor3d, metallic3d, roughness3d, selected3dIdx, mode]);

  // Construir la URL de la API de forma 100% segura para DiceBear v9
  const build2dUrl = (style, seed, bg, eyes, mouth, flip) => {
    const baseUrl = `https://api.dicebear.com/9.x/${style}/svg`;
    const params = new URLSearchParams();

    params.append('seed', seed);
    
    if (bg === 'transparent') {
      params.append('backgroundType', 'transparent');
    } else {
      params.append('backgroundType', 'solid');
      params.append('backgroundColor', bg);
    }

    if (flip) {
      params.append('flip', 'true');
    }

    const schema = AVATAR_SCHEMAS_2D[style];
    if (schema && style !== 'shapes') {
      const isValidEye = schema.eyes.some(e => e.id === eyes);
      if (isValidEye) {
        params.append('eyes', eyes);
      } else if (schema.eyes.length > 0) {
        params.append('eyes', schema.eyes[0].id);
      }

      const isValidMouth = schema.mouth.some(m => m.id === mouth);
      if (isValidMouth) {
        params.append('mouth', mouth);
      } else if (schema.mouth.length > 0) {
        params.append('mouth', schema.mouth[0].id);
      }
    }

    return `${baseUrl}?${params.toString()}`;
  };

  // Sincronizar estados locales con el componente principal (Cristian Nájera)
  useEffect(() => {
    if (mode === '2d') {
      setIsLoading(true);
      const url = build2dUrl(style2d, seed2d, bgColor, selectedEyes, selectedMouth, flip2d);
      onAvatarChange({
        is3D: false,
        url,
        style: activeSchema2D.name,
        seed: seed2d,
        eyes: selectedEyes,
        mouth: selectedMouth,
        flip: flip2d,
        bgColor
      });
    } else {
      setIsLoading(false);
      onAvatarChange({
        is3D: true,
        url: active3dModel.url,
        style: active3dModel.name,
        seed: active3dModel.id,
        animation: animation3d,
        bgColor,
        // Variables de personalización local 3D PBR
        customizable: active3dModel.customizable,
        bodyColor: bodyColor3d,
        metallic: metallic3d,
        roughness: roughness3d
      });
    }
  }, [mode, bgColor, style2d, seed2d, selectedEyes, selectedMouth, flip2d, selected3dIdx, animation3d, bodyColor3d, metallic3d, roughness3d]);

  // Sincronizar animaciones al cambiar de modelo 3D
  const handle3dModelChange = (idx) => {
    setSelected3dIdx(idx);
    const model = MODELS_3D[idx];
    if (model.animations && model.animations.length > 0) {
      setAnimation3d(model.animations[0].id);
    } else {
      setAnimation3d('');
    }
  };

  // Mezclar / Aleatorizar características
  const handleRandomize = () => {
    if (mode === '2d') {
      const words = ['magia', 'aventura', 'zorro', 'robot', 'codigo', 'react', 'universo', 'futuro', 'luna', 'pixel'];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const randomNumber = Math.floor(Math.random() * 999);
      setSeed2d(`${randomWord}-${randomNumber}`);
      
      if (activeSchema2D.eyes.length > 0) {
        const randomEyes = activeSchema2D.eyes[Math.floor(Math.random() * activeSchema2D.eyes.length)].id;
        setSelectedEyes(randomEyes);
      }

      if (activeSchema2D.mouth.length > 0) {
        const randomMouth = activeSchema2D.mouth[Math.floor(Math.random() * activeSchema2D.mouth.length)].id;
        setSelectedMouth(randomMouth);
      }

      setFlip2d(Math.random() > 0.5);
    } else {
      // Si el modelo 3D es personalizable, aleatorizamos sus propiedades PBR locales
      if (active3dModel.customizable) {
        const randomColor = PBR_BODY_COLORS[Math.floor(Math.random() * PBR_BODY_COLORS.length)].value;
        setBodyColor3d(randomColor);
        setMetallic3d(parseFloat(Math.random().toFixed(2)));
        setRoughness3d(parseFloat(Math.random().toFixed(2)));
      } else {
        // Si no, simplemente mezclamos de la lista estándar
        const randomIdx = Math.floor(Math.random() * MODELS_3D.length);
        setSelected3dIdx(randomIdx);
        const model = MODELS_3D[randomIdx];
        if (model.animations && model.animations.length > 0) {
          const randomAnim = model.animations[Math.floor(Math.random() * model.animations.length)].id;
          setAnimation3d(randomAnim);
        } else {
          setAnimation3d('');
        }
      }
    }
  };

  return (
    <div className="customizer-card">
      {/* Selector de Modo: 2D vs 3D */}
      <div className="dimension-toggle-container">
        <button
          type="button"
          className={`dimension-btn ${mode === '2d' ? 'active' : ''}`}
          onClick={() => setMode('2d')}
        >
          📷 Visualizador 2D (DiceBear)
        </button>
        <button
          type="button"
          className={`dimension-btn ${mode === '3d' ? 'active' : ''}`}
          onClick={() => setMode('3d')}
        >
          🔮 Visualizador 3D (Google/Khronos)
        </button>
      </div>

      {/* Área del visualizador de Avatar (Cristian Nájera) */}
      <div 
        className="avatar-preview-container"
        style={{ 
          backgroundColor: bgColor === 'transparent' ? '#1b202c' : `#${bgColor}`,
        }}
      >
        {mode === '2d' ? (
          <>
            {isLoading && <div className="avatar-loader">Cargando...</div>}
            <img
              src={currentAvatar?.url || ''}
              alt="Avatar 2D"
              className={`avatar-preview-img ${isLoading ? 'loading' : ''}`}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </>
        ) : (
          /* Visualizador de Model Viewer 3D (CORS OK) */
          <model-viewer
            id="customizer-viewer"
            src={active3dModel.url}
            animation-name={animation3d || undefined}
            autoplay
            camera-controls
            shadow-intensity="1.5"
            auto-rotate
            onLoad={(e) => apply3dCustomizations(e.target)}
            style={{ width: '100%', height: '100%', outline: 'none' }}
          ></model-viewer>
        )}
      </div>

      {/* CONTROLES MODO 2D */}
      {mode === '2d' && (
        <div className="customizer-form">
          <div className="control-group">
            <label className="control-label" htmlFor="style-select-2d">
              Estilo / Colección 2D:
            </label>
            <select
              id="style-select-2d"
              className="select-input"
              value={style2d}
              onChange={(e) => setStyle2d(e.target.value)}
            >
              {Object.keys(AVATAR_SCHEMAS_2D).map((key) => (
                <option key={key} value={key}>
                  {AVATAR_SCHEMAS_2D[key].name}
                </option>
              ))}
            </select>
          </div>

          {style2d !== 'shapes' && (
            <div className="selectors-row">
              <div className="control-group flex-1">
                <label className="control-label" htmlFor="eyes-select-2d">
                  👁️ Ojos (Personalizar):
                </label>
                <select
                  id="eyes-select-2d"
                  className="select-input"
                  value={selectedEyes}
                  onChange={(e) => setSelectedEyes(e.target.value)}
                >
                  {activeSchema2D.eyes.map((eye) => (
                    <option key={eye.id} value={eye.id}>
                      {eye.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="control-group flex-1">
                <label className="control-label" htmlFor="mouth-select-2d">
                  👄 Boca (Personalizar):
                </label>
                <select
                  id="mouth-select-2d"
                  className="select-input"
                  value={selectedMouth}
                  onChange={(e) => setSelectedMouth(e.target.value)}
                >
                  {activeSchema2D.mouth.map((mouth) => (
                    <option key={mouth.id} value={mouth.id}>
                      {mouth.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="control-group">
            <label className="control-label" htmlFor="seed-input-2d">
              Semilla de Generación:
            </label>
            <div className="seed-input-container">
              <input
                id="seed-input-2d"
                type="text"
                className="text-input"
                value={seed2d}
                onChange={(e) => setSeed2d(e.target.value)}
                placeholder="Semilla única..."
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRandomize}
              >
                🎲 Mezclar
              </button>
            </div>
          </div>

          {/* Opción de Mirroring Horizontal */}
          <div className="control-group checkbox-group">
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={flip2d}
                onChange={(e) => setFlip2d(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-secondary)' }}
              />
              <span>Reflejar avatar horizontalmente (Efecto Espejo)</span>
            </label>
          </div>
        </div>
      )}

      {/* CONTROLES MODO 3D */}
      {mode === '3d' && (
        <div className="customizer-form">
          <div className="control-group">
            <label className="control-label" htmlFor="model-select-3d">
              Modelo 3D Activo:
            </label>
            <select
              id="model-select-3d"
              className="select-input"
              value={selected3dIdx}
              onChange={(e) => handle3dModelChange(parseInt(e.target.value))}
            >
              {MODELS_3D.map((model, idx) => (
                <option key={model.id} value={idx}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* PANEL DE PERSONALIZACIÓN PBR 3D (Cesium Man o Astronauta) */}
          {active3dModel.customizable && (
            <div className="pbr-customizer-panel animate-fade-in" style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                👤 Diseñador Humano 3D (Local PBR)
              </h4>
              
              {/* Color del cuerpo / traje */}
              <div className="control-group">
                <label className="control-label" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Color del Cuerpo / Traje:
                </label>
                <div className="color-selector-grid" style={{ gap: '8px' }}>
                  {PBR_BODY_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`color-btn ${bodyColor3d === c.value ? 'active' : ''}`}
                      style={{ backgroundColor: c.value, width: '28px', height: '28px' }}
                      onClick={() => setBodyColor3d(c.value)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders de Material PBR */}
              <div className="control-group" style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>✨ Brillo Metálico:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{metallic3d}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={metallic3d}
                  onChange={(e) => setMetallic3d(parseFloat(e.target.value))}
                  style={{ width: '100%', height: '6px', borderRadius: '4px', background: 'var(--border-color)', outline: 'none', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                />
              </div>

              <div className="control-group" style={{ marginBottom: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>🌊 Rugosidad del Traje:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{roughness3d}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={roughness3d}
                  onChange={(e) => setRoughness3d(parseFloat(e.target.value))}
                  style={{ width: '100%', height: '6px', borderRadius: '4px', background: 'var(--border-color)', outline: 'none', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                />
              </div>
            </div>
          )}

          {/* Modelos 3D Estándar */}
          <>
            {active3dModel.animations.length > 0 ? (
              <div className="control-group">
                <label className="control-label" htmlFor="animation-select-3d">
                  🕺 Acciones y Animaciones 3D:
                </label>
                <select
                  id="animation-select-3d"
                  className="select-input"
                  value={animation3d}
                  onChange={(e) => setAnimation3d(e.target.value)}
                >
                  {active3dModel.animations.map((anim) => (
                    <option key={anim.id} value={anim.id}>
                      {anim.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              !active3dModel.customizable && (
                <div className="control-group">
                  <label className="control-label">🕺 Acciones y Animaciones 3D:</label>
                  <select className="select-input" disabled>
                    <option>Estático (Sin animaciones)</option>
                  </select>
                </div>
              )
            )}

            <div className="control-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRandomize}
                style={{ width: '100%' }}
              >
                🎲 Mezclar Avatar 3D
              </button>
            </div>
          </>
        </div>
      )}

      {/* CONTROL DE COLOR DE FONDO */}
      <div className="control-group">
        <label className="control-label">Fondo de Visualización:</label>
        <div className="color-selector-grid">
          {BACKGROUND_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`color-btn ${bgColor === c.value ? 'active' : ''}`}
              style={{ backgroundColor: c.value === 'transparent' ? '#333' : `#${c.value}` }}
              onClick={() => setBgColor(c.value)}
              title={c.name}
            >
              {c.value === 'transparent' && '❌'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
