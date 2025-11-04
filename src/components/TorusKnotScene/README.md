# Torus Knot Scene - React Three Fiber Component

Este componente es una adaptación moderna del código Three.js original utilizando React Three Fiber.

## Características

- ✅ Geometría TorusKnot completamente configurable
- ✅ Sistema de partículas con texturas personalizadas
- ✅ Modo mesh alternativo con material normal
- ✅ Controles GUI interactivos (usando Leva)
- ✅ Rotación automática
- ✅ Controles de cámara (OrbitControls)
- ✅ Estadísticas de rendimiento (FPS counter)

## Uso

Para usar este componente en tu aplicación, reemplaza el contenido de `src/App.tsx`:

```tsx
import TorusKnotScene from "./components/TorusKnotScene";

export default function App() {
  return <TorusKnotScene />;
}
```

## Controles

El panel de controles GUI (Leva) incluye:

- **radius**: Radio del torus knot (0-40)
- **tube**: Grosor del tubo (0-40)
- **radialSegments**: Segmentos radiales (0-400)
- **tubularSegments**: Segmentos tubulares (1-20)
- **p**: Parámetro p del nudo (1-10)
- **q**: Parámetro q del nudo (1-15)
- **asParticles**: Alternar entre sistema de partículas y mesh
- **rotate**: Activar/desactivar rotación automática

## Controles de cámara

- **Click izquierdo + arrastrar**: Rotar la cámara
- **Click derecho + arrastrar**: Panorámica
- **Scroll**: Zoom in/out

## Diferencias con el código original

1. **Moderna arquitectura React**: Usa hooks y componentes funcionales
2. **Leva en lugar de dat.GUI**: Controles más modernos y mejor integrados con React
3. **React Three Fiber**: Declarativo y más mantenible que Three.js vanilla
4. **TypeScript**: Tipado completo para mejor DX
5. **Auto-optimizado**: React Three Fiber maneja muchas optimizaciones automáticamente

## Notas técnicas

- El parámetro `heightScale` fue removido ya que no existe en la versión moderna de `TorusKnotGeometry`
- El sistema de partículas usa `pointsMaterial` en lugar de `ParticleBasicMaterial` (deprecated)
- `AdditiveBlending` crea el efecto de brillo característico
- La textura de partículas se genera con un gradiente radial usando canvas
