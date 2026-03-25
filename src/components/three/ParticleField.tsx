"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const color1 = new THREE.Color("#00ff87");
        const color2 = new THREE.Color("#60efff");

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 4;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const mixed = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixed.r;
            colors[i * 3 + 1] = mixed.g;
            colors[i * 3 + 2] = mixed.b;
        }

        return { positions, colors };
    }, []);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return geo;
    }, [positions, colors]);

    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.025,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            depthWrite: false,
        });
    }, []);

    useFrame(({ clock, mouse }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        pointsRef.current.rotation.y = t * 0.04 + mouse.x * 0.02;
        pointsRef.current.rotation.x = t * 0.02 + mouse.y * 0.02;
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export default function ParticleField() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            style={{
                background: "transparent",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
            }}    >
            <Particles />
        </Canvas>
    );
}