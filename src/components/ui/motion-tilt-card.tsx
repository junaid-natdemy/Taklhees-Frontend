'use client';

import { useRef, type ReactNode } from 'react';
import { m, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export interface MotionTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  hoverZ?: number;
}

const SPRING_CONFIG = { stiffness: 200, damping: 20 } as const;

/**
 * 3D pointer-tracking spring tilt container inspired by Motion TiltCard.
 * Applies smooth rotateX/rotateY/z springs on hover while respecting prefers-reduced-motion.
 */
export function MotionTiltCard({
  children,
  className,
  maxTilt = 7,
  perspective = 950,
  hoverZ = -10,
}: MotionTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const z = useSpring(0, SPRING_CONFIG);
  const rotateX = useSpring(0, SPRING_CONFIG);
  const rotateY = useSpring(0, SPRING_CONFIG);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch' || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    rotateX.set(maxTilt * (0.5 - y / box.height));
    rotateY.set(maxTilt * (x / box.width - 0.5));
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;
    z.set(hoverZ);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  };

  return (
    <m.div
      ref={ref}
      style={
        prefersReducedMotion
          ? undefined
          : {
              z,
              rotateX,
              rotateY,
              transformPerspective: perspective,
              willChange: 'transform',
            }
      }
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn('relative', className)}
    >
      {children}
    </m.div>
  );
}
