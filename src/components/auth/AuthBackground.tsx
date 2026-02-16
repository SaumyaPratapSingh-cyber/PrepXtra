"use client";

import { StarsBackground } from "@/components/landing/StarsBackground";
import { ShootingStars } from "@/components/landing/ShootingStars";

export function AuthBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
            <StarsBackground
                starDensity={0.0002}
                allStarsTwinkle={true}
                twinkleProbability={0.7}
                className="opacity-100" // Higher opacity for auth pages
            />
            <ShootingStars
                starColor="#F97316"
                trailColor="#EC4899"
                minSpeed={10}
                maxSpeed={20}
                minDelay={3000}
                maxDelay={6000}
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
        </div>
    );
}
