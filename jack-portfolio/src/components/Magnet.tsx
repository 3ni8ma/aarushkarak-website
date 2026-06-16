import { useRef, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({ children, padding = 150, strength = 3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [transition, setTransition] = useState('');

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < padding) {
        setTransition('transform 0.3s ease-out');
        setTransform(`translate3d(${distX / strength}px, ${distY / strength}px, 0)`);
      } else {
        setTransition('transform 0.6s ease-in-out');
        setTransform('translate3d(0, 0, 0)');
      }
    },
    [padding, strength]
  );

  const handleMouseLeave = () => {
    setTransition('transform 0.6s ease-in-out');
    setTransform('translate3d(0, 0, 0)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transform, transition, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
