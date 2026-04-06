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

// --- HOW TO USE A CUSTOM AVATAR ---
// 1. Go to https://readyplayer.me/avatar
// 2. Create your avatar
// 3. Click "Copy .glb URL"
// 4. Paste it below as PRIMARY_AVATAR
const PRIMARY_AVATAR = "https://models.readyplayer.me/6993db8005b43df7aa89ea0f.glb";

// 1. Primary: User's Custom Avatar (or Punk)
// 2. Secondary: Fallback (Standard Male)
// 3. Fallback: Robot (Procedural)
const AVATAR_URLS = [
    PRIMARY_AVATAR,
    "https://models.readyplayer.me/64b73f0e62a933f1df78772c.glb",
];

// --- 1. THE HUMAN AVATAR COMPONENT ---
const HumanAvatar = ({ isSpeaking, isListening, url, onError }: AvatarProps & { url: string, onError: () => void }) => {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(url, true, true, (loader) => {
        // Optional: Custom loader settings
    });

    // Attempt to play idle animation if exists
    const { actions } = useAnimations(animations, group);
    useEffect(() => {
        if (actions && actions[Object.keys(actions)[0]]) {
            actions[Object.keys(actions)[0]]?.play();
        }
    }, [actions]);

    // Refs for Morph Targets (Lip Sync)
    const headMesh = useRef<THREE.SkinnedMesh | null>(null);
    const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
    const neckBone = useRef<THREE.Object3D | null>(null);
    const spineBone = useRef<THREE.Object3D | null>(null);

    // Setup: Find meshes and bones
    useEffect(() => {
        if (scene) {
            scene.traverse((obj) => {
                const name = obj.name.toLowerCase();
                if (obj.type === 'SkinnedMesh') {
                    const mesh = obj as THREE.SkinnedMesh;
                    // Identify head/teeth for visemes
                    if (name.includes('head') || name.includes('avatar')) headMesh.current = mesh;
                    if (name.includes('teeth') || name.includes('mouth')) teethMesh.current = mesh;
                }
                // Identify bones for tracking
                if (name.includes('neck')) neckBone.current = obj;
                if (name.includes('spine')) spineBone.current = obj;
            });

            // Adjust Scale/Position for "Headshot / Upper Body"
            // Move lower to hide legs/lower torso
            scene.position.y = -1.75;
            scene.scale.set(1.15, 1.15, 1.15);
        }
    }, [scene]);

    // Animation Loop
    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // A. Lip Sync (Simulated based on isSpeaking)
        let viseme = 0;
        if (isSpeaking) {
            viseme = Math.max(0, Math.sin(t * 15) * 0.5 + 0.2);
        } else {
            viseme = THREE.MathUtils.lerp(viseme, 0, 0.1);
        }

        [headMesh.current, teethMesh.current].forEach((mesh) => {
            if (mesh?.morphTargetDictionary && mesh?.morphTargetInfluences) {
                // Try different common standard naming conventions
                const jawIdx = mesh.morphTargetDictionary['jawOpen'] ?? mesh.morphTargetDictionary['mouthOpen'];
                const visemeIdx = mesh.morphTargetDictionary['viseme_aa'];

                const target = visemeIdx ?? jawIdx;
                if (target !== undefined) {
                    mesh.morphTargetInfluences[target] = THREE.MathUtils.lerp(mesh.morphTargetInfluences[target], viseme, 0.2);
                }
            }
        });

        // B. Head Tracking (Fixed "Looking Up" Issue)
        if (neckBone.current) {
            const mouseX = state.pointer.x * 0.15; // Reduced horiz sensitivity
            const mouseY = state.pointer.y * 0.1;  // Reduced vert sensitivity

            // FIX: Force negative vertical rotation (look down) to counter "upward gaze"
            // Try +0.3 rad offset (positive usually implies chin down in standard rigs, or handle negative case)
            // We'll trust the coordinate system: +X is typically Pitch Down.
            // Previous was 0.1 and looked up -> maybe try 0.35
            const LOOK_DOWN_OFFSET = 0.35;

            neckBone.current.rotation.y = THREE.MathUtils.lerp(neckBone.current.rotation.y, mouseX, 0.1);
            neckBone.current.rotation.x = THREE.MathUtils.lerp(neckBone.current.rotation.x, -mouseY + LOOK_DOWN_OFFSET, 0.1);
        }
    });

    return <primitive object={scene} ref={group} />;
};

// --- 2. THE ROBOT FALLBACK (Improved) ---
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
                {/* Head */}
                <mesh position={[0, 0.6, 0]}>
                    <boxGeometry args={[0.5, 0.6, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.1, 0.7, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                <mesh position={[0.1, 0.7, 0.26]}>
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshBasicMaterial color={isListening ? "#10b981" : "#fff"} />
                </mesh>
                {/* Mouth */}
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

// --- 3. MAIN WRAPPER WITH ERROR HANDLING ---
const AvatarLoader = ({
    index,
    onFail,
    ...props
}: AvatarProps & { index: number, onFail: () => void }) => {

    // If we ran out of URLs, show Robot
    if (index >= AVATAR_URLS.length) {
        return <RobotAvatar {...props} />;
    }

    // Try loading human model
    try {
        return (
            <HumanAvatar
                url={AVATAR_URLS[index]}
                onError={onFail} // Helper to trigger parent state change
                {...props}
            />
        );
    } catch (e) {
        onFail();
        return null;
    }
};

// Helper component to catch async loading errors in Suspense
const LoadGuard = ({ index, onFail, children }: any) => {
    // This is a trick: if useGLTF fails, it throws. 
    // We catch it in the ErrorBoundary below.
    return children;
};

// --- 4. EXPORTED COMPONENT ---
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

// Internal Error Boundary to catch Suspense/GLTF throws
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
import React from "react";
