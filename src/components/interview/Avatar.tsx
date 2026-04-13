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

    // Refs for Morph Targets (Lip Sync & Blinking)
    const headMesh = useRef<THREE.SkinnedMesh | null>(null);
    const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
    
    // Bones for posture and gestures
    const neckBone = useRef<THREE.Object3D | null>(null);
    const spineBone = useRef<THREE.Object3D | null>(null);
    const headBone = useRef<THREE.Object3D | null>(null);
    
    const rightArm = useRef<THREE.Object3D | null>(null);
    const rightForeArm = useRef<THREE.Object3D | null>(null);
    const leftArm = useRef<THREE.Object3D | null>(null);
    const leftForeArm = useRef<THREE.Object3D | null>(null);

    // Blinking state
    const blinkTarget = useRef(0);
    const lastBlinkTime = useRef(0);

    // Speech state tracking to vary gestures
    const gesturePhase = useRef(0);

    useEffect(() => {
        if (!scene) return;
        
        try {
            scene.traverse((obj) => {
                const name = obj.name.toLowerCase();
                
                if (obj.type === 'SkinnedMesh') {
                    const mesh = obj as THREE.SkinnedMesh;
                    // Standard Ready Player Me naming
                    if (name.includes('head') || name.includes('avatar')) headMesh.current = mesh;
                    if (name.includes('teeth') || name.includes('mouth')) teethMesh.current = mesh;
                }
                
                // Bone Rigging Map
                if (obj.type === 'Bone') {
                    if (name.includes('neck')) neckBone.current = obj;
                    if (name === 'spine' || name === 'spine2') spineBone.current = obj;
                    if (name === 'head') headBone.current = obj;
                    
                    if (name.includes('rightarm')) rightArm.current = obj;
                    if (name.includes('rightforearm')) rightForeArm.current = obj;
                    if (name.includes('leftarm')) leftArm.current = obj;
                    if (name.includes('leftforearm')) leftForeArm.current = obj;
                }
            });

            // Set natural base pose 
            if (rightArm.current) rightArm.current.rotation.z = -1.2;
            if (leftArm.current) leftArm.current.rotation.z = 1.2;
            if (rightForeArm.current) rightForeArm.current.rotation.y = 0.5;
            if (leftForeArm.current) leftForeArm.current.rotation.y = -0.5;

            // Center portrait framing
            scene.position.y = -1.5;
            scene.scale.set(1.15, 1.15, 1.15);
        } catch (e) {
            console.error("Error setting up avatar rig", e);
            onError();
        }
    }, [scene, onError]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // 1. DYNAMIC LIP SYNC (Procedural Phonemes based on volume/speaking state)
        let visemeAA = 0;
        let visemeO = 0;
        let jawOpen = 0;
        
        if (isSpeaking) {
            // Rapid varied pulsing mapped to sine/noise for realistic word shaping
            const speechPulse = Math.max(0, Math.sin(t * 15) * 0.5 + Math.cos(t * 22) * 0.3 + 0.2);
            visemeAA = Math.max(0, Math.sin(t * 18) * 0.7 + 0.1) * speechPulse; 
            visemeO = Math.max(0, Math.cos(t * 12) * 0.5) * speechPulse;
            jawOpen = Math.max(0, Math.sin(t * 10) * 0.4 + 0.1) * speechPulse; 
        } else {
            visemeAA = THREE.MathUtils.lerp(visemeAA, 0, 0.1);
            visemeO = THREE.MathUtils.lerp(visemeO, 0, 0.1);
            jawOpen = THREE.MathUtils.lerp(jawOpen, 0, 0.1);
        }

        // Apply morph targets for mouth
        [headMesh.current, teethMesh.current].forEach((mesh) => {
            if (mesh?.morphTargetDictionary && mesh?.morphTargetInfluences) {
                const map = mesh.morphTargetDictionary;
                const influences = mesh.morphTargetInfluences;
                
                const idxAA = map['viseme_aa'] ?? map['mouthOpen'];
                const idxO = map['viseme_O'];
                const idxJaw = map['jawOpen'];
                
                if (idxAA !== undefined) influences[idxAA] = THREE.MathUtils.lerp(influences[idxAA], visemeAA, 0.3);
                if (idxO !== undefined) influences[idxO] = THREE.MathUtils.lerp(influences[idxO], visemeO, 0.3);
                if (idxJaw !== undefined) influences[idxJaw] = THREE.MathUtils.lerp(influences[idxJaw], jawOpen, 0.3);
            }
        });

        // 2. RANDOM BLINKING
        if (t - lastBlinkTime.current > 2.5 + Math.random() * 4) {
            blinkTarget.current = 1;
            lastBlinkTime.current = t;
            setTimeout(() => { blinkTarget.current = 0; }, 150);
        }

        if (headMesh.current?.morphTargetDictionary && headMesh.current?.morphTargetInfluences) {
            const map = headMesh.current.morphTargetDictionary;
            const blinkL = map['eyeBlinkLeft'];
            const blinkR = map['eyeBlinkRight'];
            if (blinkL !== undefined) headMesh.current.morphTargetInfluences[blinkL] = THREE.MathUtils.lerp(headMesh.current.morphTargetInfluences[blinkL], blinkTarget.current, 0.5);
            if (blinkR !== undefined) headMesh.current.morphTargetInfluences[blinkR] = THREE.MathUtils.lerp(headMesh.current.morphTargetInfluences[blinkR], blinkTarget.current, 0.5);
        }

        // 3. POSTURE, EYE TRACKING & BREATHING
        const mouseX = state.pointer.x * 0.15; 
        const mouseY = state.pointer.y * 0.1;  

        // Natural idle breathing on spine
        const breath = Math.sin(t * 2) * 0.01;

        if (spineBone.current) {
            spineBone.current.rotation.x = THREE.MathUtils.lerp(spineBone.current.rotation.x, breath, 0.1);
        }

        // Neck turning slightly towards mouse
        if (neckBone.current) {
            // Subtract small constant to compensate for slight camera upward angle
            neckBone.current.rotation.y = THREE.MathUtils.lerp(neckBone.current.rotation.y, mouseX, 0.1);
            neckBone.current.rotation.x = THREE.MathUtils.lerp(neckBone.current.rotation.x, -mouseY - 0.1, 0.1);
        }

        // 4. PROCEDURAL HAND GESTURES 
        if (isSpeaking) {
            // Transition randomly between different hand poses to simulate explaining
            if (Math.random() < 0.01) {
                gesturePhase.current = Math.floor(Math.random() * 3);
            }

            const activeGesture = gesturePhase.current;
            
            // Subtle, professional hand movements
            if (rightArm.current && rightForeArm.current) {
                const targetZ = activeGesture === 1 ? -1.0 + Math.sin(t*3)*0.1 : -1.2;
                const targetX = activeGesture === 1 ? 0.2 + Math.cos(t*2)*0.1 : 0;
                rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, targetZ, 0.05);
                rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, targetX, 0.05);
                rightForeArm.current.rotation.x = THREE.MathUtils.lerp(rightForeArm.current.rotation.x, activeGesture === 1 ? -0.8 : -0.2, 0.05);
            }

            if (leftArm.current && leftForeArm.current) {
                const targetZ = activeGesture === 2 ? 1.0 + Math.sin(t*2.5)*0.1 : 1.2;
                const targetX = activeGesture === 2 ? 0.2 + Math.cos(t*2)*0.1 : 0;
                leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, targetZ, 0.05);
                leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, targetX, 0.05);
                leftForeArm.current.rotation.x = THREE.MathUtils.lerp(leftForeArm.current.rotation.x, activeGesture === 2 ? -0.8 : -0.2, 0.05);
            }

            // Occasional head emphasis
            if (headBone.current) {
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, Math.sin(t*5)*0.02, 0.1);
            }

        } else if (isListening) {
            // While listening, rest hands, nod occasionally
            if (rightArm.current) rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, -1.3, 0.05);
            if (leftArm.current) leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, 1.3, 0.05);
            if (rightForeArm.current) rightForeArm.current.rotation.x = THREE.MathUtils.lerp(rightForeArm.current.rotation.x, 0, 0.05);
            if (leftForeArm.current) leftForeArm.current.rotation.x = THREE.MathUtils.lerp(leftForeArm.current.rotation.x, 0, 0.05);

            // Active nodding
            if (headBone.current) {
                const nod = Math.sin(t * 1.5) > 0.9 ? 0.06 : 0;
                headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, nod, 0.1);
            }
        } else {
            // Idle state - completely relaxed
            if (rightArm.current) rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, -1.3, 0.05);
            if (leftArm.current) leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, 1.3, 0.05);
            if (rightForeArm.current) rightForeArm.current.rotation.x = THREE.MathUtils.lerp(rightForeArm.current.rotation.x, 0, 0.05);
            if (leftForeArm.current) leftForeArm.current.rotation.x = THREE.MathUtils.lerp(leftForeArm.current.rotation.x, 0, 0.05);
            if (headBone.current) headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, 0, 0.1);
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
            group.current.position.y = Math.sin(t) * 0.1 - 0.5;
            group.current.rotation.y = Math.sin(t * 0.2) * 0.05;
        }
    });

    const glow = isSpeaking ? "#818cf8" : "#6366f1";

    return (
        <group ref={group}>
            <Float speed={2}>
                <mesh position={[0, 0.6, 0]}>
                    <boxGeometry args={[0.5, 0.6, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[-0.1, 0.7, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                <mesh position={[0.1, 0.7, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                {isSpeaking && (
                    <mesh position={[0, 0.5, 0.26]}>
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
