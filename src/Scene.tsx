import React from 'react';
import { Composition, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { ThreeCanvas } from '@remotion/three';

const CreepyFigure: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zPos = interpolate(frame, [0, 180, durationInFrames], [-11, -11, -2.5], {
    extrapolateRight: 'clamp',
  });

  const walkBob = frame > 180 ? Math.abs(Math.sin(frame * 0.25)) * 0.15 : 0;
  const headTilt = Math.sin(frame * 0.08) * 0.15;

  return (
    <group position={[0, walkBob, zPos]}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.4, 1.6, 0.7]} />
        <meshStandardMaterial color="#1f232b" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.6, 0.36]}>
        <boxGeometry args={[0.9, 0.25, 0.02]} />
        <meshBasicMaterial color="#cc1100" />
      </mesh>
      <mesh position={[-1.05, 1.5, 0]}>
        <boxGeometry args={[0.6, 1.6, 0.6]} />
        <meshStandardMaterial color="#8c929e" roughness={0.6} />
      </mesh>
      <mesh position={[1.05, 1.5, 0]}>
        <boxGeometry args={[0.6, 1.6, 0.6]} />
        <meshStandardMaterial color="#8c929e" roughness={0.6} />
      </mesh>
      <mesh position={[-0.38, 0.4, 0]}>
        <boxGeometry args={[0.65, 0.8, 0.65]} />
        <meshStandardMaterial color="#15181e" roughness={0.7} />
      </mesh>
      <mesh position={[0.38, 0.4, 0]}>
        <boxGeometry args={[0.65, 0.8, 0.65]} />
        <meshStandardMaterial color="#15181e" roughness={0.7} />
      </mesh>
      <group position={[0, 2.75, 0]} rotation={[0, 0, headTilt]}>
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial color="#9ea5b3" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[1.02, 0.25, 1.02]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0, 0.38, 0.55]}>
          <boxGeometry args={[0.95, 0.08, 0.45]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[-0.2, 0.05, 0.49]}>
          <boxGeometry args={[0.16, 0.12, 0.05]} />
          <meshBasicMaterial color="#ff1e00" />
        </mesh>
        <mesh position={[0.2, 0.05, 0.49]}>
          <boxGeometry args={[0.16, 0.12, 0.05]} />
          <meshBasicMaterial color="#ff1e00" />
        </mesh>
      </group>
    </group>
  );
};

const HorrorWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const camX = Math.sin(frame * 0.03) * 0.5;
  const camZ = interpolate(frame, [0, durationInFrames], [5.8, 3.0]);

  return (
    <>
      <Audio src={staticFile('voice.mp3')} />
      <ThreeCanvas
        width={1080}
        height={1920}
        camera={{ position: [camX, 2.5, camZ], fov: 55 }}
      >
        <color attach="background" args={['#111827']} />
        <fog attach="fog" args={['#111827', 4, 22]} />
        <ambientLight intensity={1.2} color="#93c5fd" />
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#e0f2fe" />
        <pointLight position={[0, 3.5, -3]} intensity={3.5} distance={15} color="#ef4444" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#27303f" roughness={0.8} />
        </mesh>
        <gridHelper args={[60, 30, '#3b485e', '#1e2633']} position={[0, 0.01, 0]} />

        <mesh position={[0, 0.06, 1.5]}>
          <boxGeometry args={[2.8, 0.12, 2.8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 0.13, 1.5]}>
          <boxGeometry args={[2.2, 0.02, 2.2]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        <mesh position={[-3.2, 2.5, -5]}>
          <boxGeometry args={[1.2, 5, 1.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[3.2, 2.5, -7]}>
          <boxGeometry args={[1.2, 5, 1.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        <CreepyFigure />
      </ThreeCanvas>
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MainVideo"
      component={HorrorWorld}
      durationInFrames={560}
      fps={20}
      width={1080}
      height={1920}
    />
  );
};
        
