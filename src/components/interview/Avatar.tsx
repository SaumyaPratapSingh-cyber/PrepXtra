"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, Html, Float, Sparkles } from "@react-three/drei";

interface AvatarProps {
    isSpeaking: boolean;
    isListening: boolean;
    volume: number;
}

// Highly realistic professional business avatars (Ready Player Me)
const PRIMARY_AVATAR = "https://models.readyplayer.me/646d1bf4e963b5efea01ae5b.glb"; // Professional Male in Suit
const SECONDARY_AVATAR = "https://models.readyplayer.me/64c017d83ddc114f762692bc.glb"; // Professional Female
const FALLBACK_AVATAR = "https://models.readyplayer.me/64b73f0e62a933f1df78772c.glb";

const AVATAR_URLS = [
    PRIMARY_AVATAR,
    SECONDARY_AVATAR,
    FALLBACK_AVATAR
];

const HumanAvatar = ({ isSpeaking, isListening, url, onError }: AvatarProps & { url: string, onError: () => void }) => {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(url, true, true, (loader) => {});

    const { actions } = useAnimations(animations, group);
    useEffect(() => {
        if (actions && actions[Object.keys(actions)[0]]) {
            actions[Object.keys(actions)[0]]?.play();
        }
    }, [actions]);

    // Refs for Morph Targets (Lip Sync & Blinking)
    const headMesh = useRef<THREE.SkinnedMesh | null>(null);
    const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
    
    // Bones for gestures
    const neckBone = useRef<THREE.Object3D | null>(null);
    const spineBone = useRef<THREE.Object3D | null>(null);
    const headBone = useRef<THREE.Object3D | null>(null);

    // Blinking state
    const blinkTarget = useRef(0);
    const lastBlinkTime = useRef(0);

    useEffect(() => {
        if (scene) {
            scene.traverse((obj) => {
                const name = obj.name.toLowerCase();
                if (obj.type === 'SkinnedMesh') {
                    const mesh = obj as THREE.SkinnedMesh;
                    if (name.includes('head') || name.includes('avatar')) headMesh.current = mesh;
                    if (name.includes('teeth') || name.includes('mouth')) teethMesh.current = mesh;
                }
                if (name.includes('neck')) neckBone.current = obj;
                if (name === 'spine' || name === 'spine2') spineBone.current = obj;
                if (name.includes('head') && obj.type === 'Bone') headBone.current = obj;
            });

            // Adjust Scale/Position to center upper body
            scene.position.y = -1.6;
            scene.scale.set(1.2, 1.2, 1.2);
        }
    }, [scene]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // 1. LIP SYNC & SPEECH REACTION
        let viseme = 0;
        let jawOpen = 0;
        
        if (isSpeaking) {
            viseme = Math.max(0, Math.sin(t * 18) * 0.6 + 0.3); // Faster, more varied lip movement
            jawOpen = Math.max(0, Math.sin(t * 12) * 0.3 + 0.1); 
        } else {
            viseme = THREE.MathUtils.lerp(viseme, 0, 0.1);
            jawOpen = THREE.MathUtils.lerp(jawOpen, 0, 0.1);
        }

        // 2. RANDOM BLINKING
        if (t - lastBlinkTime.current > 3 + Math.random() * 4) {
            blinkTarget.current = 1;
            lastBlinkTime.current = t;
            setTimeout(() => { blinkTarget.current = 0; }, 200); // blink duration
        }

        [headMesh.current, teethMesh.current].forEach((mesh) => {
            if (mesh?.morphTargetDictionary && mesh?.morphTargetInfluences) {
                // Apply visemes
                const visemeIdx = mesh.morphTargetDictionary['viseme_aa'] ?? mesh.morphTargetDictionary['mouthOpen'];
                const jawIdx = mesh.morphTargetDictionary['jawOpen'];
                const blinkLeft = mesh.morphTargetDictionary['eyeBlinkLeft'];
                const blinkRight = mesh.morphTargetDictionary['eyeBlinkRight'];

                if (visemeIdx !== undefined) mesh.morphTargetInfluences[visemeIdx] = THREE.MathUtils.lerp(mesh.morphTargetInfluences[visemeIdx], viseme, 0.2);
                if (jawIdx !== undefined) mesh.morphTargetInfluences[jawIdx] = THREE.MathUtils.lerp(mesh.morphTargetInfluences[jawIdx], jawOpen, 0.2);
                
                // Apply blink
                if (blinkLeft !== undefined) mesh.morphTargetInfluences[blinkLeft] = THREE.MathUtils.lerp(mesh.morphTargetInfluences[blinkLeft], blinkTarget.current, 0.4);
                if (blinkRight !== undefined) mesh.morphTargetInfluences[blinkRight] = THREE.MathUtils.lerp(mesh.morphTargetInfluences[blinkRight], blinkTarget.current, 0.4);
            }
        });

        // 3. DYNAMIC POSTURE & GESTURES
        const mouseX = state.pointer.x * 0.2; 
        const mouseY = state.pointer.y * 0.15;  
        const LOOK_DOWN_OFFSET = 0.25;

        // Neck turning towards mouse
        if (neckBone.current) {
            neckBone.current.rotation.y = THREE.MathUtils.lerp(neckBone.current.rotation.y, mouseX, 0.1);
            neckBone.current.rotation.x = THREE.MathUtils.lerp(neckBone.current.rotation.x, -mouseY + LOOK_DOWN_OFFSET, 0.1);
        }

        // Spine reaction to states (listening vs speaking)
        if (spineBone.current) {
            if (isListening) {
                // Nodding occasionally when listening (active listening posture)
                const nod = Math.sin(t * 1.5) > 0.95 ? 0.05 : 0;
                // Slight lean forward
                spineBone.current.rotation.x = THREE.MathUtils.lerp(spineBone.current.rotation.x, 0.05 + nod, 0.05);
                // Slight head tilt
                if (headBone.current) {
                    headBone.current.rotation.z = THREE.MathUtils.lerp(headBone.current.rotation.z, Math.sin(t * 0.5) * 0.05, 0.05);
                }
            } else if (isSpeaking) {
                // Speaking gestures (moving shoulders/spine)
                spineBone.current.rotation.x = THREE.MathUtils.lerp(spineBone.current.rotation.x, Math.sin(t * 2) * 0.03, 0.1);
                spineBone.current.rotation.y = THREE.MathUtils.lerp(spineBone.current.rotation.y, Math.sin(t * 1.2) * 0.04, 0.1);
                if (headBone.current) headBone.current.rotation.z = THREE.MathUtils.lerp(headBone.current.rotation.z, 0, 0.1);
            } else {
                // Idle breathing
                spineBone.current.rotation.x = THREE.MathUtils.lerp(spineBone.current.rotation.x, Math.sin(t * 3) * 0.01, 0.05);
                spineBone.current.rotation.y = THREE.MathUtils.lerp(spineBone.current.rotation.y, 0, 0.05);
                if (headBone.current) headBone.current.rotation.z = THREE.MathUtils.lerp(headBone.current.rotation.z, 0, 0.1);
            }
        }
    });

    return <primitive object={scene} ref={group} />;
};

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

export const Avatar = (props: AvatarProps) => {
    const [urlIndex, setUrlIndex] = useState(0);
    const [hasAllFailed, setHasAllFailed] = useState(false);

    const handleNext = () => {
        const nextIndex = urlIndex + 1;
        if (nextIndex < AVATAR_URLS.length) {
            console.warn(`Avatar ${urlIndex} failed. Trying next: ${nextIndex}`);
            setUrlIndex(nextIndex);
        } else {
            console.error("All avatars failed. Switching to Robot.");
            setHasAllFailed(true);
        }
    };

    if (hasAllFailed) {
        return <RobotAvatar {...props} />;
    }

    return (
        <ErrorBoundary key={urlIndex} fallback={<RobotAvatar {...props} />} onError={handleNext}>
            <Suspense fallback={<RobotAvatar {...props} />}>
                <HumanAvatar
                    url={AVATAR_URLS[urlIndex]}
                    onError={handleNext}
                    {...props}
                />
            </Suspense>
        </ErrorBoundary>
    );
};

import React from "react";
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, onError: () => void, children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: any) {
        console.error("Avatar Error Boundary caught:", error);
        this.props.onError();
    }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}
