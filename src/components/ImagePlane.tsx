import { useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Program,
  Mesh,
  Texture,
} from "ogl";

interface ImagePlaneProps {
  imageSrc: string;
  width?: number;
  height?: number;
  intensity?: number;
  maxRotation?: number;
  verticalStretch?: number; // 1 = sin estirar, >1 estira hacia vertical
  horizontalStretch?: number; // 1 = sin estirar, >1 estira hacia horizontal
  viewportHeightPercent?: number; // Alto en % del alto de la pantalla (vh)
  viewportWidthPercent?: number; // Ancho en % del ancho de la pantalla (vw)
  fullViewport?: boolean; // Fuerza a ocupar todo el viewport (100vw x 100vh)
}

const ImagePlane = ({
  imageSrc,
  width = 1,
  height = 5,
  intensity = 0.1,
  maxRotation = 0.3,
  verticalStretch = 1,
  horizontalStretch = 1,
  viewportHeightPercent = 100,
  viewportWidthPercent = 100,
  fullViewport = false,
}: ImagePlaneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const imageAspectRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Setup renderer
    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    gl.canvas.style.position = "absolute";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";
    container.appendChild(gl.canvas);
    rendererRef.current = renderer;

    // Use container size (not full window) for proper layout
    const setRendererToContainer = () => {
      if (fullViewport) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      } else {
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
      }
    };
    setRendererToContainer();
    gl.clearColor(0, 0, 0, 0);

    // Setup camera
    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 8);

    // Setup scene
    const scene = new Transform();

    // Create texture
    const texture = new Texture(gl);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      texture.image = img;
      imageAspectRef.current = img.naturalWidth / img.naturalHeight;
      updatePlaneScale();
    };
    img.src = imageSrc;

    // Create plane geometry
    const geometry = new Plane(gl, {
      width,
      height,
    });

    // Create program (shader)
    const uScale = { value: [1, 1] as [number, number] };
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;

        uniform sampler2D tMap;
        uniform vec2 uScale; // aspect-correct cover scale
        varying vec2 vUv;

        void main() {
          vec2 uv = (vUv - 0.5) * uScale + 0.5;
          gl_FragColor = texture2D(tMap, uv);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uScale,
      },
      transparent: true,
    });

    // Create mesh
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    meshRef.current = mesh;

    // Helper: compute plane scale to cover viewport while preserving aspect
    const updatePlaneScale = () => {
      if (!meshRef.current) return;
      const viewportAspect = gl.canvas.width / gl.canvas.height;
      const distance = Math.abs(camera.position.z - meshRef.current.position.z);
      const fovRad = (camera.fov * Math.PI) / 180.0;
      const viewportHeight = 2.0 * Math.tan(fovRad / 2.0) * distance;
      const viewportWidth = viewportHeight * viewportAspect;

      // Fill the viewport with the plane (world units)
      meshRef.current.scale.x = (viewportWidth / width) * horizontalStretch;
      meshRef.current.scale.y = (viewportHeight / height) * verticalStretch;

      // Compute shader UV scale for aspect-correct cover
      const imgAspect = imageAspectRef.current;
      if (!imgAspect) return;
      let sx = 1.0;
      let sy = 1.0;
      if (viewportAspect > imgAspect) {
        // Wider viewport: crop vertically (reduce Y range)
        sy = imgAspect / viewportAspect;
      } else {
        // Taller viewport: crop horizontally (reduce X range)
        sx = viewportAspect / imgAspect;
      }
      uScale.value = [sx, sy];
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationRef.current.y = mouseRef.current.x * maxRotation;
      targetRotationRef.current.x = mouseRef.current.y * maxRotation;
    };

    // Resize handler
    const handleResize = () => {
      setRendererToContainer();
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });
      updatePlaneScale();
    };

    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (meshRef.current) {
        // Smooth rotation interpolation
        currentRotationRef.current.x +=
          (targetRotationRef.current.x - currentRotationRef.current.x) *
          intensity;
        currentRotationRef.current.y +=
          (targetRotationRef.current.y - currentRotationRef.current.y) *
          intensity;

        meshRef.current.rotation.x = currentRotationRef.current.x;
        meshRef.current.rotation.y = currentRotationRef.current.y;
      }

      renderer.render({ scene, camera });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);

      if (container && gl.canvas) {
        container.removeChild(gl.canvas);
      }

      if (meshRef.current) {
        geometry.remove();
        program.remove();
      }
    };
  }, [
    imageSrc,
    width,
    height,
    intensity,
    maxRotation,
    verticalStretch,
    horizontalStretch,
    viewportWidthPercent,
    viewportHeightPercent,
    fullViewport,
  ]);

  return (
    <div
      ref={containerRef}
      className={
        fullViewport
          ? "fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
          : "absolute top-0 left-0 w-full pointer-events-none z-0"
      }
      style={
        fullViewport
          ? undefined
          : {
              height: `${viewportHeightPercent}vh`,
              width: `${viewportWidthPercent}vw`,
            }
      }
    />
  );
};

export default ImagePlane;
