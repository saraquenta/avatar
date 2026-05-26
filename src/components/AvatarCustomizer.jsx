import React, { useState, useEffect } from 'react';

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
    customizable: true
  },
  {
    id: 'human-cyber',
    name: '👤 Humano Cyber (Cesium Man)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb',
    animations: [
      { id: 'anim_0', name: '🏃 Correr' }
    ],
    customizable: true
  }
];

const BACKGROUND_COLORS = [
  { id: 'transparent', name: 'Transparente', value: 'transparent' },
  { id: 'b6e3f4', name: 'Celeste Claro', value: 'b6e3f4' },
  { id: 'c0aede', name: 'Lavanda', value: 'c0aede' },
  { id: 'd1d4f9', name: 'Azul Pastel', value: 'd1d4f9' },
  { id: 'ffd5dc', name: 'Rosa Dulce', value: 'ffd5dc' },
  { id: 'ffdfbf', name: 'Naranja Suave', value: 'ffdfbf' }
];

const PBR_BODY_COLORS = [
  { id: 'default', name: 'Por Defecto', value: '#ffffff' },
  { id: 'neon-cyan', name: 'Cyan Neón', value: '#06b6d4' },
  { id: 'neon-indigo', name: 'Indigo Neón', value: '#6366f1' },
  { id: 'gold', name: 'Oro Cyber', value: '#ffd700' },
  { id: 'ruby', name: 'Rubí Brillante', value: '#ef4444' },
  { id: 'emerald', name: 'Esmeralda', value: '#10b981' }
];

const modalStyles = `
  .zoom-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: rgba(0,0,0,0.55);
    border: 1.5px solid rgba(255,255,255,0.25);
    color: #fff;
    border-radius: 10px;
    padding: 6px 13px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(6px);
    transition: background 0.2s, transform 0.15s;
    letter-spacing: 0.02em;
  }
  .zoom-btn:hover {
    background: rgba(99,102,241,0.85);
    transform: scale(1.07);
  }

  .zoom-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(8, 8, 20, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInOverlay 0.22s ease;
    backdrop-filter: blur(10px);
  }
  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .zoom-modal-content {
    position: relative;
    width: min(88vw, 700px);
    height: min(88vh, 700px);
    background: #13131f;
    border-radius: 22px;
    border: 1.5px solid rgba(99,102,241,0.35);
    box-shadow: 0 0 80px rgba(99,102,241,0.18), 0 30px 80px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes popIn {
    from { transform: scale(0.82); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }

  .zoom-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .zoom-modal-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.04em;
  }
  .zoom-modal-close {
    background: rgba(255,255,255,0.08);
    border: none;
    color: #fff;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.15s;
  }
  .zoom-modal-close:hover {
    background: rgba(239,68,68,0.7);
    transform: rotate(90deg);
  }

  .zoom-modal-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    position: relative;
    overflow: hidden;
  }

  /* Imagen 2D con soporte de zoom con rueda y arrastrar */
  .zoom-img-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    overflow: hidden;
    border-radius: 12px;
  }
  .zoom-img-wrapper:active { cursor: grabbing; }
  .zoom-img-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transform-origin: center center;
    transition: transform 0.05s linear;
    user-select: none;
    pointer-events: none;
    border-radius: 10px;
  }

  .zoom-controls-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 20px 14px;
    border-top: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .zoom-ctrl-btn {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    border-radius: 8px;
    padding: 6px 16px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s, transform 0.12s;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .zoom-ctrl-btn:hover {
    background: rgba(99,102,241,0.55);
    transform: scale(1.06);
  }
  .zoom-scale-label {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.45);
    min-width: 44px;
    text-align: center;
  }

  /* Hint texto */
  .zoom-hint {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.72rem;
    color: rgba(255,255,255,0.28);
    pointer-events: none;
    white-space: nowrap;
  }
`;

function ZoomModal({ open, onClose, is3D, avatarUrl, bgColor, animation3d, modelCustomizable, bodyColor3d, metallic3d, roughness3d }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset al abrir
  useEffect(() => {
    if (open) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Aplicar materiales PBR al modal 3D
  const hexToRgba = (hex) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    return [r, g, b, 1.0];
  };

  const applyModalCustomizations = (mv) => {
    if (!mv || !mv.model || !modelCustomizable) return;
    const materials = mv.model.materials;
    if (materials && materials.length > 0) {
      materials.forEach((mat) => {
        if (!mat.pbrMetallicRoughness) return;
        mat.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(bodyColor3d || '#ffffff'));
        mat.pbrMetallicRoughness.setMetallicFactor(parseFloat(metallic3d || 0.5));
        mat.pbrMetallicRoughness.setRoughnessFactor(parseFloat(roughness3d || 0.5));
      });
    }
  };

  // Rueda del mouse: zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setScale(prev => Math.min(5, Math.max(0.4, prev + delta)));
  };

  // Arrastrar imagen
  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setTranslate({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setDragging(false);

  const handleZoomIn  = () => setScale(prev => Math.min(5, parseFloat((prev + 0.25).toFixed(2))));
  const handleZoomOut = () => setScale(prev => Math.max(0.4, parseFloat((prev - 0.25).toFixed(2))));
  const handleReset   = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  if (!open) return null;

  const bgValue = bgColor === 'transparent' ? '#1b202c' : `#${bgColor}`;

  return (
    <div className="zoom-modal-overlay" onClick={onClose}>
      <div className="zoom-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="zoom-modal-header">
          <span className="zoom-modal-title">
            {is3D ? ' Vista Expandida 3D — Arrastra y rota el modelo' : ' Vista Expandida 2D — Scroll para hacer zoom'}
          </span>
          <button className="zoom-modal-close" onClick={onClose} title="Cerrar (ESC)">✕</button>
        </div>

        {/* Cuerpo */}
        <div className="zoom-modal-body" style={{ background: bgValue }}>
          {is3D ? (
            // MODEL-VIEWER expandido: controles de cámara ya integrados en la lib
            <model-viewer
              src={avatarUrl}
              animation-name={animation3d || undefined}
              autoplay
              camera-controls
              shadow-intensity="2"
              auto-rotate
              onLoad={(e) => applyModalCustomizations(e.target)}
              style={{ width: '100%', height: '100%', outline: 'none', borderRadius: '12px' }}
            ></model-viewer>
          ) : (
            // Imagen 2D con zoom manual
            <div
              className="zoom-img-wrapper"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={avatarUrl}
                alt="Avatar ampliado"
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  width: '420px',
                  height: '420px',
                }}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Barra de controles de zoom — solo para 2D */}
        {!is3D && (
          <div className="zoom-controls-bar">
            <button className="zoom-ctrl-btn" onClick={handleZoomOut}>➖ Alejar</button>
            <span className="zoom-scale-label">{Math.round(scale * 100)}%</span>
            <button className="zoom-ctrl-btn" onClick={handleZoomIn}>➕ Acercar</button>
            <button className="zoom-ctrl-btn" onClick={handleReset} style={{ marginLeft: 8 }}> Reset</button>
          </div>
        )}

        {/* Hint */}
        {!is3D && (
          <span className="zoom-hint"> Scroll para zoom · Clic y arrastra para mover</span>
        )}
        {is3D && (
          <div className="zoom-controls-bar">
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
               Arrastra para rotar · Scroll para zoom · Clic derecho para desplazar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AvatarCustomizer({ onAvatarChange, currentAvatar }) {
  const [mode, setMode] = useState('2d');
  const [bgColor, setBgColor] = useState('c0aede');
  const [isLoading, setIsLoading] = useState(false);

  // 2D
  const [style2d, setStyle2d] = useState('lorelei');
  const [seed2d, setSeed2d] = useState('Cristian');
  const [selectedEyes, setSelectedEyes] = useState('variant01');
  const [selectedMouth, setSelectedMouth] = useState('happy01');
  const [flip2d, setFlip2d] = useState(false);

  // 3D
  const [selected3dIdx, setSelected3dIdx] = useState(0);
  const [animation3d, setAnimation3d] = useState('Survey');
  const [bodyColor3d, setBodyColor3d] = useState('#ffffff');
  const [metallic3d, setMetallic3d] = useState(0.5);
  const [roughness3d, setRoughness3d] = useState(0.5);

  // ZOOM MODAL
  const [zoomOpen, setZoomOpen] = useState(false);

  const activeSchema2D = AVATAR_SCHEMAS_2D[style2d] || AVATAR_SCHEMAS_2D.lorelei;
  const active3dModel = MODELS_3D[selected3dIdx];

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

  const hexToRgba = (hex) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    return [r, g, b, 1.0];
  };

  const apply3dCustomizations = (mv) => {
    if (!mv || !mv.model || !active3dModel.customizable) return;
    const materials = mv.model.materials;
    if (materials && materials.length > 0) {
      materials.forEach((mat) => {
        if (!mat.pbrMetallicRoughness) return;
        mat.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(bodyColor3d));
        mat.pbrMetallicRoughness.setMetallicFactor(parseFloat(metallic3d));
        mat.pbrMetallicRoughness.setRoughnessFactor(parseFloat(roughness3d));
      });
    }
  };

  useEffect(() => {
    if (mode === '3d') {
      const mv = document.querySelector('#customizer-viewer');
      if (mv) apply3dCustomizations(mv);
    }
  }, [bodyColor3d, metallic3d, roughness3d, selected3dIdx, mode]);

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
    if (flip) params.append('flip', 'true');
    const schema = AVATAR_SCHEMAS_2D[style];
    if (schema && style !== 'shapes') {
      const isValidEye = schema.eyes.some(e => e.id === eyes);
      if (isValidEye) params.append('eyes', eyes);
      else if (schema.eyes.length > 0) params.append('eyes', schema.eyes[0].id);
      const isValidMouth = schema.mouth.some(m => m.id === mouth);
      if (isValidMouth) params.append('mouth', mouth);
      else if (schema.mouth.length > 0) params.append('mouth', schema.mouth[0].id);
    }
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    if (mode === '2d') {
      setIsLoading(true);
      const url = build2dUrl(style2d, seed2d, bgColor, selectedEyes, selectedMouth, flip2d);
      onAvatarChange({
        is3D: false, url, style: activeSchema2D.name, seed: seed2d,
        eyes: selectedEyes, mouth: selectedMouth, flip: flip2d, bgColor
      });
    } else {
      setIsLoading(false);
      onAvatarChange({
        is3D: true, url: active3dModel.url, style: active3dModel.name,
        seed: active3dModel.id, animation: animation3d, bgColor,
        customizable: active3dModel.customizable,
        bodyColor: bodyColor3d, metallic: metallic3d, roughness: roughness3d
      });
    }
  }, [mode, bgColor, style2d, seed2d, selectedEyes, selectedMouth, flip2d, selected3dIdx, animation3d, bodyColor3d, metallic3d, roughness3d]);

  const handle3dModelChange = (idx) => {
    setSelected3dIdx(idx);
    const model = MODELS_3D[idx];
    if (model.animations && model.animations.length > 0) {
      setAnimation3d(model.animations[0].id);
    } else {
      setAnimation3d('');
    }
  };

  const handleRandomize = () => {
    if (mode === '2d') {
      const words = ['magia', 'aventura', 'zorro', 'robot', 'codigo', 'react', 'universo', 'futuro', 'luna', 'pixel'];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSeed2d(`${randomWord}-${Math.floor(Math.random() * 999)}`);
      if (activeSchema2D.eyes.length > 0) setSelectedEyes(activeSchema2D.eyes[Math.floor(Math.random() * activeSchema2D.eyes.length)].id);
      if (activeSchema2D.mouth.length > 0) setSelectedMouth(activeSchema2D.mouth[Math.floor(Math.random() * activeSchema2D.mouth.length)].id);
      setFlip2d(Math.random() > 0.5);
    } else {
      if (active3dModel.customizable) {
        const randomColor = PBR_BODY_COLORS[Math.floor(Math.random() * PBR_BODY_COLORS.length)].value;
        setBodyColor3d(randomColor);
        setMetallic3d(parseFloat(Math.random().toFixed(2)));
        setRoughness3d(parseFloat(Math.random().toFixed(2)));
      } else {
        const randomIdx = Math.floor(Math.random() * MODELS_3D.length);
        setSelected3dIdx(randomIdx);
        const model = MODELS_3D[randomIdx];
        if (model.animations && model.animations.length > 0) {
          setAnimation3d(model.animations[Math.floor(Math.random() * model.animations.length)].id);
        } else {
          setAnimation3d('');
        }
      }
    }
  };

  const bgValue = bgColor === 'transparent' ? '#1b202c' : `#${bgColor}`;

  return (
    <>
      {/* Inyectar estilos del modal una sola vez */}
      <style>{modalStyles}</style>

      <div className="customizer-card">
        {/* Toggle 2D / 3D */}
        <div className="dimension-toggle-container">
          <button type="button" className={`dimension-btn ${mode === '2d' ? 'active' : ''}`} onClick={() => setMode('2d')}>
            📷 Visualizador 2D (DiceBear)
          </button>
          <button type="button" className={`dimension-btn ${mode === '3d' ? 'active' : ''}`} onClick={() => setMode('3d')}>
            🔮 Visualizador 3D (Google/Khronos)
          </button>
        </div>

        {/* Contenedor del avatar con botón de zoom */}
        <div
          className="avatar-preview-container"
          style={{ backgroundColor: bgValue, position: 'relative' }}
        >
          {/* ★ BOTÓN DE ZOOM ★ */}
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomOpen(true)}
            title="Ampliar avatar en pantalla completa"
          >
            🔍 Ampliar
          </button>

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

        {/* CONTROLES 2D */}
        {mode === '2d' && (
          <div className="customizer-form">
            <div className="control-group">
              <label className="control-label" htmlFor="style-select-2d">Estilo / Colección 2D:</label>
              <select id="style-select-2d" className="select-input" value={style2d} onChange={(e) => setStyle2d(e.target.value)}>
                {Object.keys(AVATAR_SCHEMAS_2D).map((key) => (
                  <option key={key} value={key}>{AVATAR_SCHEMAS_2D[key].name}</option>
                ))}
              </select>
            </div>

            {style2d !== 'shapes' && (
              <div className="selectors-row">
                <div className="control-group flex-1">
                  <label className="control-label" htmlFor="eyes-select-2d">👁️ Ojos (Personalizar):</label>
                  <select id="eyes-select-2d" className="select-input" value={selectedEyes} onChange={(e) => setSelectedEyes(e.target.value)}>
                    {activeSchema2D.eyes.map((eye) => (
                      <option key={eye.id} value={eye.id}>{eye.name}</option>
                    ))}
                  </select>
                </div>
                <div className="control-group flex-1">
                  <label className="control-label" htmlFor="mouth-select-2d">👄 Boca (Personalizar):</label>
                  <select id="mouth-select-2d" className="select-input" value={selectedMouth} onChange={(e) => setSelectedMouth(e.target.value)}>
                    {activeSchema2D.mouth.map((mouth) => (
                      <option key={mouth.id} value={mouth.id}>{mouth.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="control-group">
              <label className="control-label" htmlFor="seed-input-2d">Semilla de Generación:</label>
              <div className="seed-input-container">
                <input id="seed-input-2d" type="text" className="text-input" value={seed2d} onChange={(e) => setSeed2d(e.target.value)} placeholder="Semilla única..." />
                <button type="button" className="btn btn-secondary" onClick={handleRandomize}>🎲 Mezclar</button>
              </div>
            </div>

            <div className="control-group checkbox-group">
              <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={flip2d} onChange={(e) => setFlip2d(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-secondary)' }} />
                <span>Reflejar avatar horizontalmente (Efecto Espejo)</span>
              </label>
            </div>
          </div>
        )}

        {/* CONTROLES 3D */}
        {mode === '3d' && (
          <div className="customizer-form">
            <div className="control-group">
              <label className="control-label" htmlFor="model-select-3d">Modelo 3D Activo:</label>
              <select id="model-select-3d" className="select-input" value={selected3dIdx} onChange={(e) => handle3dModelChange(parseInt(e.target.value))}>
                {MODELS_3D.map((model, idx) => (
                  <option key={model.id} value={idx}>{model.name}</option>
                ))}
              </select>
            </div>

            {active3dModel.customizable && (
              <div className="pbr-customizer-panel animate-fade-in" style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                  👤 Diseñador Humano 3D (Local PBR)
                </h4>
                <div className="control-group">
                  <label className="control-label" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Color del Cuerpo / Traje:</label>
                  <div className="color-selector-grid" style={{ gap: '8px' }}>
                    {PBR_BODY_COLORS.map((c) => (
                      <button key={c.id} type="button" className={`color-btn ${bodyColor3d === c.value ? 'active' : ''}`}
                        style={{ backgroundColor: c.value, width: '28px', height: '28px' }}
                        onClick={() => setBodyColor3d(c.value)} title={c.name} />
                    ))}
                  </div>
                </div>

                <div className="control-group" style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>✨ Brillo Metálico:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{metallic3d}</span>
                  </div>
                  <input type="range" min="0.0" max="1.0" step="0.05" value={metallic3d} onChange={(e) => setMetallic3d(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '6px', borderRadius: '4px', background: 'var(--border-color)', outline: 'none', cursor: 'pointer', accentColor: 'var(--accent-primary)' }} />
                </div>

                <div className="control-group" style={{ marginBottom: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>🌊 Rugosidad del Traje:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{roughness3d}</span>
                  </div>
                  <input type="range" min="0.0" max="1.0" step="0.05" value={roughness3d} onChange={(e) => setRoughness3d(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '6px', borderRadius: '4px', background: 'var(--border-color)', outline: 'none', cursor: 'pointer', accentColor: 'var(--accent-primary)' }} />
                </div>
              </div>
            )}

            <>
              {active3dModel.animations.length > 0 ? (
                <div className="control-group">
                  <label className="control-label" htmlFor="animation-select-3d">🕺 Acciones y Animaciones 3D:</label>
                  <select id="animation-select-3d" className="select-input" value={animation3d} onChange={(e) => setAnimation3d(e.target.value)}>
                    {active3dModel.animations.map((anim) => (
                      <option key={anim.id} value={anim.id}>{anim.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                !active3dModel.customizable && (
                  <div className="control-group">
                    <label className="control-label">🕺 Acciones y Animaciones 3D:</label>
                    <select className="select-input" disabled><option>Estático (Sin animaciones)</option></select>
                  </div>
                )
              )}
              <div className="control-group">
                <button type="button" className="btn btn-secondary" onClick={handleRandomize} style={{ width: '100%' }}>
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
              <button key={c.id} type="button" className={`color-btn ${bgColor === c.value ? 'active' : ''}`}
                style={{ backgroundColor: c.value === 'transparent' ? '#333' : `#${c.value}` }}
                onClick={() => setBgColor(c.value)} title={c.name}>
                {c.value === 'transparent' && ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE ZOOM */}
      <ZoomModal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        is3D={mode === '3d'}
        avatarUrl={mode === '2d' ? currentAvatar?.url : active3dModel?.url}
        bgColor={bgColor}
        animation3d={animation3d}
        modelCustomizable={active3dModel?.customizable}
        bodyColor3d={bodyColor3d}
        metallic3d={metallic3d}
        roughness3d={roughness3d}
      />
    </>
  );
}