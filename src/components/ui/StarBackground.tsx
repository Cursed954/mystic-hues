
import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

// Base StarBackground with customizable parameters
export const StarBackground = ({ 
  count = 5000, 
  radius = 1.2, 
  speed = 10, 
  size = 0.002, 
  color = "#fff",
  ...props 
}: PointsProps & { 
  count?: number;
  radius?: number;
  speed?: number;
  size?: number;
  color?: string;
}) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count), { radius })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / speed;
      ref.current.rotation.y -= delta / (speed * 1.5);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Home page stars - dense and bright
export const HomeStarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground count={5000} radius={1.2} speed={10} size={0.002} color="#fff" />
      </Suspense>
    </Canvas>
  </div>
);

// Detail pages - colorful and slower moving
export const DetailStarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground 
          count={3000} 
          radius={1.5} 
          speed={15} 
          size={0.0025} 
          color="#a78bfa" 
        />
      </Suspense>
    </Canvas>
  </div>
);

// Admin/settings pages - subtle and minimal
export const SubtleStarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground 
          count={2000} 
          radius={1.8} 
          speed={20} 
          size={0.0015} 
          color="#8B5CF6" 
        />
      </Suspense>
    </Canvas>
  </div>
);

// Original export maintained for backward compatibility
export const StarsCanvas = HomeStarsCanvas;

export default StarsCanvas;
