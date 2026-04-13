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
            // Find meshes and bones by EXACT name match from model inspection
            scene.traverse((obj) => {
                // Meshes with morph targets
                if (obj.name === 'Wolf3D_Head') headMesh.current = obj as THREE.SkinnedMesh;
                if (obj.name === 'Wolf3D_Teeth') teethMesh.current = obj as THREE.SkinnedMesh;
                
                // Bones — exact names from the skeleton
                if (obj.name === 'Head') headBone.current = obj;
                if (obj.name === 'Neck') neckBone.current = obj;
                if (obj.name === 'Spine2') spine2Bone.current = obj;
                if (obj.name === 'Spine1') spine1Bone.current = obj;
                if (obj.name === 'LeftArm') leftArm.current = obj;
                if (obj.name === 'LeftForeArm') leftForeArm.current = obj;
                if (obj.name === 'RightArm') rightArm.current = obj;
                if (obj.name === 'RightForeArm') rightForeArm.current = obj;
                if (obj.name === 'LeftShoulder') leftShoulder.current = obj;
                if (obj.name === 'RightShoulder') rightShoulder.current = obj;
            });

            // Log what we found for debugging
            console.log('[Avatar] Head mesh:', !!headMesh.current, '| Teeth mesh:', !!teethMesh.current);
            console.log('[Avatar] Bones found — Head:', !!headBone.current, '| Neck:', !!neckBone.current, 
                '| RightArm:', !!rightArm.current, '| LeftArm:', !!leftArm.current);
            
            if (headMesh.current?.morphTargetDictionary) {
                console.log('[Avatar] Morph targets:', Object.keys(headMesh.current.morphTargetDictionary));
            }

            // ─── FRAMING ───
            // RPM model is ~1.75 units tall, head at ~1.6.
            // Camera is at y=1.35 looking at y=1.35 (set in page.tsx).
            // We keep the model at origin so the bones work correctly.
            scene.position.set(0, 0, 0);
            scene.scale.set(1, 1, 1);

        } catch (e) {
            console.error("Error setting up avatar rig", e);
            onError();
        }
    }, [scene, onError]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // ═══════════════════════════════════════
        // 1. LIP SYNC — using the model's actual viseme morph targets
        // ═══════════════════════════════════════
        const sv = smoothViseme.current;

        if (isSpeaking) {
            // Create varied speech patterns by combining multiple sine waves
            const pulse1 = Math.max(0, Math.sin(t * 12));
            const pulse2 = Math.max(0, Math.sin(t * 17 + 1.2));
            const pulse3 = Math.max(0, Math.cos(t * 9 + 0.5));
            const envelope = 0.3 + 0.7 * Math.max(0, Math.sin(t * 3)); // Slower overall pacing

            sv.aa = THREE.MathUtils.lerp(sv.aa, pulse1 * envelope * 0.6, 0.25);
            sv.O  = THREE.MathUtils.lerp(sv.O,  pulse2 * envelope * 0.4, 0.25);
            sv.E  = THREE.MathUtils.lerp(sv.E,  pulse3 * envelope * 0.35, 0.25);
            sv.sil = THREE.MathUtils.lerp(sv.sil, (1 - envelope) * 0.3, 0.15);
        } else {
            // Smoothly close mouth when not speaking
            sv.aa  = THREE.MathUtils.lerp(sv.aa, 0, 0.15);
            sv.O   = THREE.MathUtils.lerp(sv.O, 0, 0.15);
            sv.E   = THREE.MathUtils.lerp(sv.E, 0, 0.15);
            sv.sil = THREE.MathUtils.lerp(sv.sil, 0.05, 0.1); // Slight closed-mouth rest
        }

        // Apply to all meshes that have morph targets
        [headMesh.current, teethMesh.current].forEach((mesh) => {
            if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;
            const dict = mesh.morphTargetDictionary;
            const inf = mesh.morphTargetInfluences;

            if (dict['viseme_aa'] !== undefined) inf[dict['viseme_aa']] = sv.aa;
            if (dict['viseme_O']  !== undefined) inf[dict['viseme_O']]  = sv.O;
            if (dict['viseme_E']  !== undefined) inf[dict['viseme_E']]  = sv.E;
            if (dict['viseme_sil'] !== undefined) inf[dict['viseme_sil']] = sv.sil;
            // Add some PP for lip press variation
            if (dict['viseme_PP'] !== undefined) inf[dict['viseme_PP']] = Math.max(0, Math.sin(t * 20) * 0.15) * (isSpeaking ? 1 : 0);
        });

        // ═══════════════════════════════════════
        // 2. EYE BLINK — this model doesn't have eyeBlink morphs,
        //    but we can simulate with viseme_sil squint
        // ═══════════════════════════════════════
        // (No-op since model lacks eyeBlink targets)

        // ═══════════════════════════════════════
        // 3. HEAD & NECK — look towards camera/mouse, breathing
        // ═══════════════════════════════════════
        const mouseX = state.pointer.x * 0.12;
        const mouseY = state.pointer.y * 0.08;

        // Breathing on spine
        if (spine2Bone.current) {
            const breath = Math.sin(t * 1.8) * 0.008;
            spine2Bone.current.rotation.x = THREE.MathUtils.lerp(spine2Bone.current.rotation.x, breath, 0.08);
        }

        // Head tracks mouse gently
        if (neckBone.current) {
            neckBone.current.rotation.y = THREE.MathUtils.lerp(neckBone.current.rotation.y, mouseX, 0.06);
            neckBone.current.rotation.x = THREE.MathUtils.lerp(neckBone.current.rotation.x, -mouseY * 0.5, 0.06);
        }

        // ═══════════════════════════════════════
        // 4. HAND GESTURES — subtle professional movements
        // ═══════════════════════════════════════
        if (isSpeaking) {
            // Change gesture every 2-4 seconds
            if (t - lastGestureChange.current > 2.5 + Math.random() * 2) {
                gesturePhase.current = Math.floor(Math.random() * 4);
                lastGestureChange.current = t;
            }

            const g = gesturePhase.current;
            const wave = Math.sin(t * 2.5) * 0.06;

            // Right arm — subtle raise during some gestures
            if (rightArm.current) {
                const rz = g === 1 ? -0.9 + wave : -1.1;
                rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, rz, 0.04);
                rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, g === 1 ? 0.15 : 0, 0.04);
            }
            if (rightForeArm.current) {
                rightForeArm.current.rotation.z = THREE.MathUtils.lerp(rightForeArm.current.rotation.z, g === 1 ? -0.4 : 0, 0.04);
            }

            // Left arm
            if (leftArm.current) {
                const lz = g === 2 ? 0.9 + wave : 1.1;
                leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, lz, 0.04);
                leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, g === 2 ? 0.15 : 0, 0.04);
            }
            if (leftForeArm.current) {
                leftForeArm.current.rotation.z = THREE.MathUtils.lerp(leftForeArm.current.rotation.z, g === 2 ? 0.4 : 0, 0.04);
            }

            // Head emphasis nods while speaking
            if (headBone.current) {
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, Math.sin(t * 4) * 0.015, 0.08);
            }

        } else {
            // Relaxed idle / listening pose — arms down at sides
            if (rightArm.current) {
                rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, -1.15, 0.04);
                rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.04);
            }
            if (leftArm.current) {
                leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, 1.15, 0.04);
                leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.04);
            }
            if (rightForeArm.current) {
                rightForeArm.current.rotation.z = THREE.MathUtils.lerp(rightForeArm.current.rotation.z, 0, 0.04);
            }
            if (leftForeArm.current) {
                leftForeArm.current.rotation.z = THREE.MathUtils.lerp(leftForeArm.current.rotation.z, 0, 0.04);
            }

            // Listening nods
            if (isListening && headBone.current) {
                const nod = Math.sin(t * 1.5) > 0.92 ? 0.05 : 0;
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, nod, 0.08);
            } else if (headBone.current) {
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, 0, 0.06);
            }
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
