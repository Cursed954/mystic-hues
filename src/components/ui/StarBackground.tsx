
import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import { Points as ThreePoints } from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

// Basic star background component
export const StarBackground = () => {
  const ref = useRef<ThreePoints | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Use more stars and bigger size for light mode (snowfall effect)
  const starCount = isLight ? 10000 : 5000;
  const starSize = isLight ? 0.004 : 0.002;
  const rotationSpeed = isLight ? 0.15 : 0.1; // Faster for light mode
  
  const [sphere] = useState<Float32Array>(() =>
    // Explicitly cast the return value to Float32Array
    random.inSphere(new Float32Array(starCount), { radius: 1.2 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      // Different rotation for light mode (snowfall effect)
      if (isLight) {
        ref.current.rotation.x -= delta / 5;
        ref.current.rotation.y -= delta / 30;
      } else {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color={isLight ? "#ffffff" : "#fff"}
          size={starSize}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Default canvas for stars
export const StarsCanvas = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Home page specific stars canvas with additional styling
export const HomeStarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
