import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { animate } from 'animejs';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label?: string;
  sub?: string;
}

export function AnimatedCounter({ end, suffix = '', duration = 2000, label, sub }: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current || !spanRef.current) return;
    startedRef.current = true;

    const current = spanRef.current;
    const anim = animate(
      { val: 0 } as Record<string, number>,
      {
        val: end,
        duration,
        ease: 'outCubic',
        onUpdate: (a) => {
          const v = Math.floor((a.targets[0] as Record<string, number>).val)
          current.textContent = `${v}${suffix}`
        },
      }
    );

    return () => { anim.pause() }
  }, [inView, end, duration, suffix]);

  return (
    <div ref={ref} className="text-center">
      <span ref={spanRef} className="text-3xl font-bold text-white">0{suffix}</span>
      {label && <p className="text-sm text-gray-400 mt-1">{label}</p>}
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}
