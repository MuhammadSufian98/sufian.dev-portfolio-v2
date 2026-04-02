# Three.js & React Three Fiber Setup Guide

## Installation Complete ✅

The following packages have been installed:
- **three** (^0.183.2) - 3D JavaScript library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Collection of helpers for React Three Fiber
- **@types/three** - TypeScript types for Three.js

## Quick Start

### 1. Basic Scene Component
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function MyScene() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}
```

### 2. Add to Your Page
```jsx
import MyScene from '@/components/Three/Scene';

export default function Page() {
  return (
    <div className="w-full h-screen">
      <MyScene />
    </div>
  );
}
```

## Common Components from @react-three/drei

- **OrbitControls** - Mouse controls for camera
- **PerspectiveCamera** - 3D camera setup
- **Icosahedron** - Geometric shape
- **Sphere, Box, Cylinder** - Basic geometries
- **Environment** - Pre-built environments
- **useFrame** - Animation hook from fiber

## Key Hooks (React Three Fiber)

```jsx
import { useFrame, useThree } from '@react-three/fiber';

// Animation loop
useFrame(({ clock }) => {
  mesh.current.rotation.x += 0.01;
});

// Access Three.js scene
const { scene, camera, gl } = useThree();
```

## File Structure

```
src/components/Three/
├── Scene.js              (Basic example)
├── AdvancedScene.js      (Animation example)
└── [Your custom components]
```

## Performance Tips

1. Use `PerspectiveCamera` with `makeDefault` for proper setup
2. Implement `useFrame` for animations instead of useEffect
3. Use `OrbitControls` for interactive camera movement
4. Optimize geometries with appropriate segment counts
5. Use `Environment` preset instead of custom lighting when possible

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Docs](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)

## Troubleshooting

**Canvas not rendering?**
- Ensure parent container has fixed height/width
- Check that Canvas is not inside a transform context

**Performance issues?**
- Reduce geometry complexity
- Use frustumCulled on distant objects
- Profile with React DevTools Profiler
