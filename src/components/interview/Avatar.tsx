"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, Sphere, MeshDistortMaterial, Text } from "@react-three/drei";

interface AvatarProps {
    isSpeaking: boolean;
    isListening: boolean;
    volume: number;
}

// Reliable sources including a local-ish or ultra-stable CDN fallback
const MODEL_SOURCES = [
    "https://models.readyplayer.me/65840d2f09307779f49309f4.glb", // Male Pro (Checked)
    "https://models.readyplayer.me/648590696f5b72183f987258.glb", // Backup
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/male-professional/model.glb", // Supabase
    "https://threejs.org/examples/models/gltf/Soldier.glb"        // Ultimate stable fallback
];

const AvatarContent = ({ isSpeaking, isListening, volume, modelUrl }: AvatarProps & { modelUrl: string }) => {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(modelUrl);
    const { actions } = useAnimations(animations, group);

    const headBone = useRef<THREE.Object3D | null>(null);
    const jawBone = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        if (scene) {
            scene.traverse((obj) => {
                if (obj.name.toLowerCase().includes("head")) headBone.current = obj;
                if (obj.name.toLowerCase().includes("jaw")) jawBone.current = obj;
            });

            // Adjust for Ready Player Me models vs Three.js models
            if (modelUrl.includes("Soldier")) {
                scene.scale.set(1.5, 1.5, 1.5);
                scene.position.y = -2;
            } else {
                scene.position.y = -3;
                scene.scale.set(3, 3, 3);
            }

            if (actions && Object.keys(actions).length > 0) {
                const firstAction = Object.keys(actions)[0];
                actions[firstAction]?.play();
            }
        }
    }, [scene, actions, modelUrl]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (headBone.current) {
            headBone.current.rotation.y = Math.sin(t * 0.5) * 0.1;
            headBone.current.rotation.x = Math.cos(t * 0.3) * 0.05;
        }

        if (isSpeaking && jawBone.current) {
            jawBone.current.rotation.x = 0.5 + Math.sin(t * 20) * 0.4;
        } else if (jawBone.current) {
            jawBone.current.rotation.x = 0.3;
        }

        if (isListening && group.current) {
            const pulse = 1 + volume * 0.1;
            group.current.scale.set(
                (modelUrl.includes("Soldier") ? 1.5 : 3) * pulse,
                (modelUrl.includes("Soldier") ? 1.5 : 3) * pulse,
                (modelUrl.includes("Soldier") ? 1.5 : 3) * pulse
            );
        }
    });

    return (
        <group ref={group}>
            <primitive object={scene} />
            <pointLight position={[0, 1, 2]} intensity={2} color="#ffffff" />
            <pointLight position={[-1, 1, 1]} intensity={1} color="#4f46e5" />
        </group>
    );
};

// Error boundary class for internal model failures
import React from 'react';

class ModelErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export const Avatar = (props: AvatarProps) => {
    const [modelIndex, setModelIndex] = useState(0);

    const tryNextModel = () => {
        if (modelIndex < MODEL_SOURCES.length - 1) {
            console.warn(`Model ${modelIndex} failed, trying index ${modelIndex + 1}`);
            setModelIndex(modelIndex + 1);
        }
    };

    return (
        <ModelErrorBoundary fallback={<FallbackAvatar {...props} onRetry={tryNextModel} />}>
            <Suspense fallback={<FallbackAvatar {...props} isLoading />}>
                <AvatarContent {...props} modelUrl={MODEL_SOURCES[modelIndex]} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

const FallbackAvatar = ({ isListening, volume, isLoading, onRetry }: AvatarProps & { isLoading?: boolean, onRetry?: () => void }) => {
    const group = useRef<THREE.Group>(null);
    useFrame(() => {
        if (isListening && group.current) {
            const pulse = 1 + volume * 0.2;
            group.current.scale.set(pulse, pulse, pulse);
        }
    });

    useEffect(() => {
        if (!isLoading && onRetry) {
            // If it reached here because of an error, wait a bit and retry next
            const timer = setTimeout(onRetry, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, onRetry]);

    return (
        <group ref={group}>
            <Sphere args={[1, 64, 64]}>
                <MeshDistortMaterial color="#4f46e5" speed={3} distort={0.4} roughness={0} metalness={1} />
            </Sphere>
            <Text
                position={[0, 1.5, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {isLoading ? "CALIBRATING AI..." : "CONNECTION ERROR - RETRYING..."}
            </Text>
            <pointLight position={[0, 2, 2]} intensity={2} color="#ffffff" />
        </group>
    );
};
