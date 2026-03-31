"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const GridMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor1: new THREE.Color("#00ff87"),
        uColor2: new THREE.Color("#60efff"),
        uFog: new THREE.Color("#080808"),
    },
    `
    varying vec2 vUv;
    varying float vFog;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vFog = smoothstep(-2.0, -20.0, mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uFog;
    varying vec2 vUv;
    varying float vFog;

    float grid(vec2 uv, float size) {
      vec2 g = abs(fract(uv * size - 0.5) - 0.5) / fwidth(uv * size);
      return 1.0 - min(min(g.x, g.y), 1.0);
    }

    void main() {
      vec2 uv = vUv;

      float g1 = grid(uv, 10.0);
      float g2 = grid(uv, 2.0) * 0.3;
      float g = max(g1, g2);

      float pulse = smoothstep(0.98, 1.0, sin(uv.x * 3.14159 + uTime * 0.5) * 0.5 + 0.5);

      vec3 color = mix(uColor1, uColor2, uv.x + sin(uTime * 0.3) * 0.2);
      vec3 finalColor = mix(vec3(0.0), color, g * 0.6 + pulse * 0.4);

      finalColor = mix(finalColor, uFog, vFog);

      float edge = smoothstep(0.0, 0.3, uv.y);
      float alpha = (g * 0.7 + pulse * 0.3) * edge * (1.0 - vFog);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ GridMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        gridMaterial: Partial<THREE.ShaderMaterial> & {
            uTime?: number;
            uColor1?: THREE.Color;
            uColor2?: THREE.Color;
            uFog?: THREE.Color;
            ref?: any;
        };
    }
}

function Grid() {
    const matRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null);

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(20, 20, 1, 1);
    }, []);

    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.uTime = clock.getElapsedTime();
        }
    });

    return (
        <mesh
            geometry={geometry}
            rotation={[-Math.PI / 2.2, 0, 0]}
            position={[0, -1.5, -2]}
        >
            <gridMaterial
                ref={matRef}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function GridFloor() {
    return (
        <Canvas
            camera={{ position: [0, 2, 5], fov: 60 }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
            dpr={[1, 1.5]}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "transparent",
            }}
        >
            <Grid />
        </Canvas>
    );
}