
import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect } from "react";
import type { Points as PointsType } from "three";
import { useTheme } from '@/components/theme/ThemeProvider';

// Enhanced star background component with theme awareness
export const StarBackground = ({ density = 1 }) => {
  const ref = useRef<PointsType | null>(null);
  const { theme } = useTheme();
  
  // Create more stars in light mode for snowfall effect
  const pointCount = theme === 'dark' ? 5000 : 10000;
  const radius = theme === 'dark' ? 1.2 : 1.5;
  
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(pointCount * density), { radius }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      // Slower rotation in dark mode, faster in light mode for snowfall effect
      const speed = theme === 'dark' ? 1 : 2;
      ref.current.rotation.x -= delta / (10 / speed);
      ref.current.rotation.y -= delta / (15 / speed);
      
      // Add vertical movement in light mode for snowfall effect
      if (theme === 'light') {
        ref.current.position.y -= delta * 0.05;
        if (ref.current.position.y < -1) {
          ref.current.position.y = 1;
        }
      }
    }
  });

  // Update point color and size based on theme
  const pointColor = theme === 'dark' ? '#fff' : '#ffffff';
  const pointSize = theme === 'dark' ? 0.002 : 0.0015;
  const pointOpacity = theme === 'dark' ? 1 : 0.8;

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
          color={pointColor}
          size={pointSize}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={pointOpacity}
        />
      </Points>
    </group>
  );
};

// Default canvas for stars with theme support
export const StarsCanvas = () => {
  const { theme, themeLoaded } = useTheme();
  
  // Only render stars when theme is loaded to avoid flickering
  if (!themeLoaded) return null;
  
  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground density={theme === 'light' ? 2 : 1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Home page specific stars canvas with additional styling and density
export const HomeStarsCanvas = () => {
  const { theme, themeLoaded } = useTheme();
  
  // Only render stars when theme is loaded to avoid flickering
  if (!themeLoaded) return null;
  
  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground density={theme === 'light' ? 2 : 1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
