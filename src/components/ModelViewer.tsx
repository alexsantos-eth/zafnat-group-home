/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Transform,
  GLTFLoader,
  Vec3,
  DracoManager,
  Program,
} from "ogl";

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?:
    | "city"
    | "sunset"
    | "night"
    | "dawn"
    | "studio"
    | "apartment"
    | "forest"
    | "park"
    | "none";
  autoFrame?: boolean;
  placeholderSrc?: string;
  showScreenshotButton?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
}

const isTouch =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);
const deg2rad = (d: number) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED_H = 0.003;
const ROTATE_SPEED_V = 0.0002;
const INERTIA = 0.95;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(3);
const HOVER_EASE = 0.15;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const ModelViewer: FC<ViewerProps> = ({
  url,
  width = 400,
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -50,
  defaultRotationY = 20,
  defaultZoom = 0.5,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  fadeIn = false,
  placeholderSrc,
  onModelLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const modelRef = useRef<Transform | null>(null);
  const outerRef = useRef<Transform | null>(null);
  const positionerRef = useRef<Transform | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const loadingRef = useRef<boolean>(true);
  const modelReadyRef = useRef<boolean>(false);

  // Animation state
  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  // Static offset values (converted from pixels to world space)
  const worldOffsetRef = useRef({ x: 0, y: 0 });

  // Interaction state
  const dragState = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  const touchState = useRef({
    mode: "idle" as "idle" | "decide" | "rotate" | "pinch",
    pts: new Map<number, { x: number; y: number }>(),
    sx: 0,
    sy: 0,
    lx: 0,
    ly: 0,
    startDist: 0,
    startZ: 0,
  });

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);
  const camZ = clamp(defaultZoom, minZoomDistance, maxZoomDistance);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const viewWidth = typeof width === "number" ? width : 400;
    const viewHeight = typeof height === "number" ? height : 400;

    // Initialize renderer
    const renderer = new Renderer({
      canvas,
      width: viewWidth,
      height: viewHeight,
      dpr: window.devicePixelRatio,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(viewWidth, viewHeight);
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    console.log("Renderer initialized:", {
      viewWidth,
      viewHeight,
      dpr: window.devicePixelRatio,
    });

    // Initialize camera
    const fov = 50;
    // Set far plane to accommodate extreme zoom distances
    const farPlane = Math.max(100, maxZoomDistance * 2);
    const camera = new Camera(gl, {
      fov: fov,
      aspect: viewWidth / viewHeight,
      near: 0.01,
      far: farPlane,
    });
    camera.position.set(0, 0, camZ);
    cameraRef.current = camera;

    // Convert pixel offsets to world space units
    // At distance camZ, calculate how many world units per pixel
    const vFOV = (fov * Math.PI) / 180;
    const worldHeight = 2 * Math.tan(vFOV / 2) * camZ;
    const worldWidth = worldHeight * (viewWidth / viewHeight);
    const pixelToWorldX = worldWidth / viewWidth;
    const pixelToWorldY = worldHeight / viewHeight;

    // Store world offsets in ref so they're accessible in animation loop
    worldOffsetRef.current.x = modelXOffset * pixelToWorldX;
    worldOffsetRef.current.y = modelYOffset * pixelToWorldY;

    console.log("World space conversion:", {
      viewWidth,
      viewHeight,
      camZ,
      worldWidth,
      worldHeight,
      pixelToWorldX,
      pixelToWorldY,
      modelXOffset,
      modelYOffset,
      worldOffsetX: worldOffsetRef.current.x,
      worldOffsetY: worldOffsetRef.current.y,
    });

    // Initialize scene
    const scene = new Transform();
    sceneRef.current = scene;

    // Create outer transform for rotation (parent) - this rotates around center
    const outer = new Transform();
    outer.setParent(scene);
    outer.rotation.set(initPitch, initYaw, 0);
    outerRef.current = outer;

    // Create positioning transform for parallax only (child of outer)
    const positioner = new Transform();
    positioner.setParent(outer);
    positionerRef.current = positioner;

    // Model is child of positioner, with offset applied to its position
    const model = new Transform();
    model.setParent(positioner);
    model.position.set(worldOffsetRef.current.x, worldOffsetRef.current.y, 0);
    modelRef.current = model;

    // Load GLTF model using OGL's GLTFLoader
    const loadModel = async () => {
      try {
        // Configure Draco decoder for compressed models
        const dracoPath = `${import.meta.env.BASE_URL}draco/DracoWorker.js`;
        console.log("Draco path:", dracoPath);
        GLTFLoader.setDracoManager(new DracoManager(dracoPath));

        // Construct full model URL with base path
        const modelUrl =
          url.startsWith("http") || url.startsWith("data:")
            ? url
            : `${import.meta.env.BASE_URL}${url.replace(/^\//, "")}`;
        console.log("Loading model from:", modelUrl);

        const gltf = await GLTFLoader.load(gl, modelUrl);

        if (!modelRef.current) return;

        // Debug: Log GLTF materials and textures
        console.log("GLTF loaded:", gltf);
        if (gltf.meshes) {
          gltf.meshes.forEach((mesh: any, i: number) => {
            console.log(`Mesh ${i}:`, mesh);
            mesh.primitives?.forEach((prim: any, j: number) => {
              if (prim.program?.gltfMaterial) {
                console.log(
                  `  Primitive ${j} material:`,
                  prim.program.gltfMaterial
                );
              }
            });
          });
        }

        // Get the scene from GLTF
        const s = gltf.scene || gltf.scenes[0];

        // Add all root nodes to our model transform
        s.forEach((root: any) => {
          root.setParent(modelRef.current);

          // Replace GLTF programs with shader that supports textures
          root.traverse((node: any) => {
            if (node.program) {
              const gltfMaterial = node.program.gltfMaterial || {};
              const hasTexture = !!gltfMaterial.baseColorTexture;
              const hasUV = !!node.geometry.attributes.uv;

              // Create shader with texture support
              const program = new Program(gl, {
                vertex: `
                  attribute vec3 position;
                  attribute vec3 normal;
                  ${hasUV ? "attribute vec2 uv;" : ""}
                  uniform mat4 modelViewMatrix;
                  uniform mat4 projectionMatrix;
                  uniform mat3 normalMatrix;
                  varying vec3 vNormal;
                  ${hasUV ? "varying vec2 vUv;" : ""}
                  void main() {
                    vNormal = normalize(normalMatrix * normal);
                    ${hasUV ? "vUv = uv;" : ""}
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragment: `
                  precision highp float;
                  varying vec3 vNormal;
                  ${hasUV ? "varying vec2 vUv;" : ""}
                  uniform float uAlpha;
                  uniform vec3 uColor;
                  ${hasTexture ? "uniform sampler2D tBaseColor;" : ""}
                  void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                    float lighting = dot(normal, lightDir) * 0.5 + 0.5;
                    
                    ${
                      hasTexture && hasUV
                        ? "vec4 baseColor = texture2D(tBaseColor, vUv);"
                        : "vec4 baseColor = vec4(uColor, 1.0);"
                    }
                    
                    gl_FragColor = vec4(baseColor.rgb * lighting, baseColor.a * uAlpha);
                  }
                `,
                uniforms: {
                  uAlpha: { value: fadeIn ? 0 : 1 },
                  uColor: {
                    value: gltfMaterial.baseColorFactor
                      ? [
                          gltfMaterial.baseColorFactor[0],
                          gltfMaterial.baseColorFactor[1],
                          gltfMaterial.baseColorFactor[2],
                        ]
                      : [1, 1, 1],
                  },
                  ...(hasTexture && {
                    tBaseColor: {
                      value: gltfMaterial.baseColorTexture.texture,
                    },
                  }),
                },
              });

              node.program = program;
            }
          });
        });

        // Calculate world matrices without adding to scene
        // This works because the hierarchy is already set up
        modelRef.current.updateMatrixWorld(true);

        // Calculate bounds using world matrices
        const min = new Vec3(Infinity, Infinity, Infinity);
        const max = new Vec3(-Infinity, -Infinity, -Infinity);
        const vertex = new Vec3();

        // Traverse all geometries and use their worldMatrix
        modelRef.current.traverse((node: any) => {
          if (node.geometry && node.geometry.attributes.position) {
            const positions = node.geometry.attributes.position.data;

            for (let i = 0; i < positions.length; i += 3) {
              vertex.set(positions[i], positions[i + 1], positions[i + 2]);

              // Use worldMatrix which is already calculated correctly
              vertex.applyMatrix4(node.worldMatrix);

              min.x = Math.min(min.x, vertex.x);
              min.y = Math.min(min.y, vertex.y);
              min.z = Math.min(min.z, vertex.z);
              max.x = Math.max(max.x, vertex.x);
              max.y = Math.max(max.y, vertex.y);
              max.z = Math.max(max.z, vertex.z);
            }
          }
        });

        const size = new Vec3().sub(max, min);
        const maxDimension = Math.max(Math.max(size.x, size.y), size.z);
        const center = new Vec3().add(min, max).divide(2);

        // Apply centering and scaling
        if (maxDimension > 0) {
          const scaleFactor = 1 / maxDimension;

          // Apply scale to model
          modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

          // Center by offsetting position and add the world offsets
          modelRef.current.position.set(
            -center.x * scaleFactor + worldOffsetRef.current.x,
            -center.y * scaleFactor + worldOffsetRef.current.y,
            -center.z * scaleFactor
          );

          // Update matrices after applying transforms
          modelRef.current.updateMatrixWorld(true);
        }

        // Collect all meshes for fade-in
        const meshes: any[] = [];
        modelRef.current.traverse((node: any) => {
          if (node.program) {
            meshes.push(node);
          }
        });

        // Wait for next frame, then mark as ready and update scene
        requestAnimationFrame(() => {
          // Mark as ready FIRST
          modelReadyRef.current = true;

          // Force update of all matrices to ensure proper rendering
          if (sceneRef.current) {
            sceneRef.current.updateMatrixWorld(true);
          }

          // Force an immediate render to ensure model is visible
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            console.log("Forcing initial render");
            rendererRef.current.render({
              scene: sceneRef.current,
              camera: cameraRef.current,
            });
          }

          // Start fade in animation
          if (meshes.length > 0) {
            const startTime = performance.now();
            const fadeInDuration = fadeIn ? 300 : 50;

            const fadeInAnimation = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / fadeInDuration, 1);

              meshes.forEach((mesh: any) => {
                if (mesh.program && mesh.program.uniforms.uAlpha) {
                  mesh.program.uniforms.uAlpha.value = progress;
                }
              });

              if (progress < 1) {
                requestAnimationFrame(fadeInAnimation);
              } else {
                loadingRef.current = false;
                onModelLoaded?.();
              }
            };

            requestAnimationFrame(fadeInAnimation);
          } else {
            loadingRef.current = false;
            onModelLoaded?.();
          }
        });
      } catch (error: any) {
        console.error("Error loading GLTF model:", error);
        console.error("Model URL:", url);
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
        loadingRef.current = false;
      }
    };

    loadModel();

    // Animation loop
    let lastTime = 0;
    let wasReady = false;
    const animate = (time: number) => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Reset lastTime when model first becomes ready to prevent rotation jump
      if (modelReadyRef.current && !wasReady) {
        lastTime = time;
        wasReady = true;
      }

      const dt = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;

      if (!outerRef.current || !cameraRef.current || !positionerRef.current)
        return;

      // Apply parallax (positioner now only handles parallax, offsets are on model)
      if (enableMouseParallax) {
        cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
        cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;

        // Only update position when parallax is enabled
        positionerRef.current.position.set(cPar.current.x, cPar.current.y, 0);
      }

      // Apply hover rotation
      const phx = cHov.current.x;
      const phy = cHov.current.y;
      cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
      cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

      // Apply hover rotation delta
      outerRef.current.rotation.x += cHov.current.x - phx;
      outerRef.current.rotation.y += cHov.current.y - phy;

      // Auto rotation - only when model is ready
      if (autoRotate && modelReadyRef.current) {
        outerRef.current.rotation.y += autoRotateSpeed * dt;
      }

      // Apply velocity with inertia - only when model is ready
      if (modelReadyRef.current) {
        outerRef.current.rotation.y += vel.current.x;
        outerRef.current.rotation.x += vel.current.y;
      }

      // Clamp vertical rotation to prevent flipping
      outerRef.current.rotation.x = clamp(
        outerRef.current.rotation.x,
        -Math.PI / 4,
        Math.PI / 4
      );

      vel.current.x *= INERTIA;
      vel.current.y *= INERTIA;

      // Always render to keep canvas updating
      renderer.render({ scene, camera });
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Mouse interaction handlers
    const handlePointerDown = (e: PointerEvent) => {
      if (isTouch) return;
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (!enableManualRotation) return;

      dragState.current.isDragging = true;
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isTouch && e.pointerType === "mouse") {
        // Mouse parallax and hover
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        if (enableMouseParallax) {
          tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
        }
        if (enableHoverRotation) {
          tHov.current = { x: ny * HOVER_MAG * 0.3, y: nx * HOVER_MAG };
        }

        // Manual rotation
        if (dragState.current.isDragging && outerRef.current) {
          const dx = e.clientX - dragState.current.lastX;
          const dy = e.clientY - dragState.current.lastY;
          dragState.current.lastX = e.clientX;
          dragState.current.lastY = e.clientY;

          outerRef.current.rotation.y += dx * ROTATE_SPEED_H;
          outerRef.current.rotation.x += dy * ROTATE_SPEED_V;
          vel.current = { x: dx * ROTATE_SPEED_H, y: dy * ROTATE_SPEED_V };
        }
      }
    };

    const handlePointerUp = () => {
      dragState.current.isDragging = false;
    };

    // Touch interaction handlers
    const handleTouchStart = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const ts = touchState.current;
      ts.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (ts.pts.size === 1) {
        ts.mode = "decide";
        ts.sx = ts.lx = e.clientX;
        ts.sy = ts.ly = e.clientY;
      } else if (ts.pts.size === 2 && enableManualZoom && cameraRef.current) {
        ts.mode = "pinch";
        const [p1, p2] = [...ts.pts.values()];
        ts.startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        ts.startZ = cameraRef.current.position.z;
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: PointerEvent) => {
      const ts = touchState.current;
      const p = ts.pts.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (ts.mode === "decide") {
        const dx = e.clientX - ts.sx;
        const dy = e.clientY - ts.sy;
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
            ts.mode = "rotate";
            canvas.setPointerCapture(e.pointerId);
          } else {
            ts.mode = "idle";
            ts.pts.clear();
          }
        }
      }

      if (ts.mode === "rotate" && outerRef.current) {
        e.preventDefault();
        const dx = e.clientX - ts.lx;
        const dy = e.clientY - ts.ly;
        ts.lx = e.clientX;
        ts.ly = e.clientY;
        outerRef.current.rotation.y += dx * ROTATE_SPEED_H;
        outerRef.current.rotation.x += dy * ROTATE_SPEED_V;
        vel.current = { x: dx * ROTATE_SPEED_H, y: dy * ROTATE_SPEED_V };
      } else if (
        ts.mode === "pinch" &&
        ts.pts.size === 2 &&
        cameraRef.current
      ) {
        e.preventDefault();
        const [p1, p2] = [...ts.pts.values()];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const ratio = ts.startDist / d;
        cameraRef.current.position.z = clamp(
          ts.startZ * ratio,
          minZoomDistance,
          maxZoomDistance
        );
      }
    };

    const handleTouchEnd = (e: PointerEvent) => {
      const ts = touchState.current;
      ts.pts.delete(e.pointerId);
      if (ts.mode === "rotate" && ts.pts.size === 0) ts.mode = "idle";
      if (ts.mode === "pinch" && ts.pts.size < 2) ts.mode = "idle";
    };

    // Wheel zoom for desktop
    const handleWheel = (e: WheelEvent) => {
      if (!enableManualZoom || !cameraRef.current || isTouch) return;
      e.preventDefault();
      const delta = e.deltaY * 0.001;
      cameraRef.current.position.z = clamp(
        cameraRef.current.position.z + delta,
        minZoomDistance,
        maxZoomDistance
      );
    };

    // Add event listeners
    canvas.addEventListener(
      "pointerdown",
      isTouch ? handleTouchStart : handlePointerDown
    );
    window.addEventListener(
      "pointermove",
      isTouch ? handleTouchMove : handlePointerMove
    );
    window.addEventListener(
      "pointerup",
      isTouch ? handleTouchEnd : handlePointerUp
    );
    window.addEventListener(
      "pointercancel",
      isTouch ? handleTouchEnd : handlePointerUp
    );
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      canvas.removeEventListener(
        "pointerdown",
        isTouch ? handleTouchStart : handlePointerDown
      );
      window.removeEventListener(
        "pointermove",
        isTouch ? handleTouchMove : handlePointerMove
      );
      window.removeEventListener(
        "pointerup",
        isTouch ? handleTouchEnd : handlePointerUp
      );
      window.removeEventListener(
        "pointercancel",
        isTouch ? handleTouchEnd : handlePointerUp
      );
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [
    url,
    width,
    height,
    modelXOffset,
    modelYOffset,
    defaultZoom,
    minZoomDistance,
    maxZoomDistance,
    enableMouseParallax,
    enableManualRotation,
    enableHoverRotation,
    enableManualZoom,
    autoRotate,
    autoRotateSpeed,
    fadeIn,
    initYaw,
    initPitch,
    camZ,
  ]);

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        touchAction: "pan-y pinch-zoom",
      }}
    >
      {loadingRef.current && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt="Loading..."
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 128,
            height: 128,
            filter: "blur(8px)",
            borderRadius: 8,
            pointerEvents: "none",
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          touchAction: "pan-y pinch-zoom",
        }}
      />
    </div>
  );
};

export default ModelViewer;
