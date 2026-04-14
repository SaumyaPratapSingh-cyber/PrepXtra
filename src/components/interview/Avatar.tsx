"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { useGLTF, Float, Sparkles } from "@react-three/drei";

interface AvatarProps {
    isSpeaking: boolean;
    isListening: boolean;
    volume: number;
}

// Ensure the local GLB is preloaded to avoid lag
useGLTF.preload("/models/interviewer.glb");

const HumanAvatar = ({ isSpeaking, isListening, volume, onError }: AvatarProps & { onError: () => void }) => {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/interviewer.glb", true, true, (loader) => {});

    // Refs for Morph Targets (Lip Sync)
    const headMesh = useRef<THREE.SkinnedMesh | null>(null);
    const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
    
    // Bones — exact names from the model inspection
    const headBone = useRef<THREE.Object3D | null>(null);
    const neckBone = useRef<THREE.Object3D | null>(null);
    const spine2Bone = useRef<THREE.Object3D | null>(null);
    const spine1Bone = useRef<THREE.Object3D | null>(null);
    
    const leftArm = useRef<THREE.Object3D | null>(null);
    const leftForeArm = useRef<THREE.Object3D | null>(null);
    const rightArm = useRef<THREE.Object3D | null>(null);
    const rightForeArm = useRef<THREE.Object3D | null>(null);
    const leftShoulder = useRef<THREE.Object3D | null>(null);
    const rightShoulder = useRef<THREE.Object3D | null>(null);

    // Animation state
    const blinkTarget = useRef(0);
    const lastBlinkTime = useRef(0);
    const gesturePhase = useRef(0);
    const lastGestureChange = useRef(0);

    // Smoothed viseme values (persistent across frames)
    const smoothViseme = useRef({ aa: 0, O: 0, E: 0, sil: 0 });

    useEffect(() => {
        if (!scene) return;
        
        try {
            // Find meshes and bones with ROBUST matching
            scene.traverse((obj) => {
                const name = obj.name.toLowerCase();
                // Meshes
                if (name.includes('head') && obj.type === 'SkinnedMesh') headMesh.current = obj as THREE.SkinnedMesh;
                if (name.includes('teeth') && obj.type === 'SkinnedMesh') teethMesh.current = obj as THREE.SkinnedMesh;
                
                // Bones
                if (name.endsWith('head')) headBone.current = obj;
                if (name.endsWith('neck')) neckBone.current = obj;
                if (name.endsWith('spine2')) spine2Bone.current = obj;
                if (name.endsWith('spine1')) spine1Bone.current = obj;
                if (name.endsWith('rightarm')) rightArm.current = obj;
                if (name.endsWith('leftarm')) leftArm.current = obj;
                if (name.endsWith('rightforearm')) rightForeArm.current = obj;
                if (name.endsWith('leftforearm')) leftForeArm.current = obj;
                if (name.endsWith('rightshoulder')) rightShoulder.current = obj;
                if (name.endsWith('leftshoulder')) leftShoulder.current = obj;
            });

            // Keep model at origin
            scene.position.set(0, 0, 0);
            scene.scale.set(1, 1, 1);

        } catch (e) {
            console.error("Error setting up avatar rig", e);
            onError();
        }
    }, [scene, onError]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // ─── FORCE PROFESSIONAL POSE (Every Frame) ───
        // Arms closer to the body
        if (rightArm.current) {
            rightArm.current.rotation.set(0, 0, -Math.PI * 0.48); // More vertical
        }
        if (leftArm.current) {
            leftArm.current.rotation.set(0, 0, Math.PI * 0.48); 
        }
        if (rightForeArm.current) rightForeArm.current.rotation.set(0, 0.5, 0);
        if (leftForeArm.current) leftForeArm.current.rotation.set(0, -0.5, 0);

        // ═══════════════════════════════════════
        // 1. LIP SYNC — using the model's actual viseme morph targets
        // ═══════════════════════════════════════
        const sv = smoothViseme.current;

        if (isSpeaking) {
            const pulse1 = Math.max(0, Math.sin(t * 12));
            const pulse2 = Math.max(0, Math.sin(t * 17 + 1.2));
            const pulse3 = Math.max(0, Math.cos(t * 9 + 0.5));
            const envelope = 0.3 + 0.7 * Math.max(0, Math.sin(t * 3));

            sv.aa = THREE.MathUtils.lerp(sv.aa, pulse1 * envelope * 0.6, 0.25);
            sv.O  = THREE.MathUtils.lerp(sv.O,  pulse2 * envelope * 0.4, 0.25);
            sv.E  = THREE.MathUtils.lerp(sv.E,  pulse3 * envelope * 0.35, 0.25);
            sv.sil = THREE.MathUtils.lerp(sv.sil, (1 - envelope) * 0.3, 0.15);
        } else {
            sv.aa  = THREE.MathUtils.lerp(sv.aa, 0, 0.15);
            sv.O   = THREE.MathUtils.lerp(sv.O, 0, 0.15);
            sv.E   = THREE.MathUtils.lerp(sv.E, 0, 0.15);
            sv.sil = THREE.MathUtils.lerp(sv.sil, 0.05, 0.1);
        }

        [headMesh.current, teethMesh.current].forEach((mesh) => {
            if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;
            const dict = mesh.morphTargetDictionary;
            const inf = mesh.morphTargetInfluences;

            if (dict['viseme_aa'] !== undefined) inf[dict['viseme_aa']] = sv.aa;
            if (dict['viseme_O']  !== undefined) inf[dict['viseme_O']]  = sv.O;
            if (dict['viseme_E']  !== undefined) inf[dict['viseme_E']]  = sv.E;
            if (dict['viseme_sil'] !== undefined) inf[dict['viseme_sil']] = sv.sil;
            if (dict['viseme_PP'] !== undefined) inf[dict['viseme_PP']] = Math.max(0, Math.sin(t * 20) * 0.15) * (isSpeaking ? 1 : 0);
        });

        // ═══════════════════════════════════════
        // 2. HEAD & NECK — aggressive downward tilt for screen eye contact
        // ═══════════════════════════════════════
        const mouseX = state.pointer.x * 0.08;
        const mouseY = state.pointer.y * 0.05;

        // Neck: tilt DOWN significantly (0.15 rad)
        if (neckBone.current) {
            neckBone.current.rotation.x = THREE.MathUtils.lerp(neckBone.current.rotation.x, 0.15 + mouseY * 0.3, 0.04);
            neckBone.current.rotation.y = THREE.MathUtils.lerp(neckBone.current.rotation.y, mouseX, 0.04);
            neckBone.current.rotation.z = 0;
        }

        // Head: tilt DOWN significantly (0.1 rad base)
        if (headBone.current) {
            const baseTilt = 0.1;
            if (isSpeaking) {
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, baseTilt + Math.sin(t * 3.5) * 0.012, 0.06);
                headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, Math.sin(t * 2) * 0.01, 0.04);
            } else if (isListening) {
                const nod = Math.sin(t * 1.5) > 0.92 ? 0.04 : 0;
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, baseTilt + nod, 0.06);
                headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, 0, 0.04);
            } else {
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, baseTilt, 0.04);
                headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, 0, 0.04);
            }
            headBone.current.rotation.z = 0;
        }

        if (spine2Bone.current) {
            const breath = Math.sin(t * 1.8) * 0.005;
            spine2Bone.current.rotation.x = THREE.MathUtils.lerp(spine2Bone.current.rotation.x, breath, 0.06);
        }
    });

    return <primitive object={scene} ref={group} />;
};

// Fallback visual representation if WebGL or Model fails
const RobotAvatar = ({ isSpeaking, isListening }: AvatarProps) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.position.y = Math.sin(t) * 0.05 + 1.35;
            group.current.rotation.y = Math.sin(t * 0.2) * 0.03;
        }
    });

    const glow = isSpeaking ? "#818cf8" : "#6366f1";

    return (
        <group ref={group}>
            <Float speed={2}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.5, 0.6, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[-0.1, 0.1, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                <mesh position={[0.1, 0.1, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                {isSpeaking && (
                    <mesh position={[0, -0.1, 0.26]}>
                        <planeGeometry args={[0.2, 0.02]} />
                        <meshBasicMaterial color={glow} />
                    </mesh>
                )}
            </Float>
            <Sparkles count={20} scale={2} color={glow} opacity={0.5} />
        </group>
    );
};

import React from "react";
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: any) {
        console.error("Avatar Rendering Error:", error);
    }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export const Avatar = (props: AvatarProps) => {
    const [failedOut, setFailedOut] = useState(false);

    if (failedOut) {
        return <RobotAvatar {...props} />;
    }

    return (
        <ErrorBoundary fallback={<RobotAvatar {...props} />}>
            <Suspense fallback={<RobotAvatar {...props} />}>
                <HumanAvatar
                    onError={() => setFailedOut(true)}
                    {...props}
                />
            </Suspense>
        </ErrorBoundary>
    );
};
