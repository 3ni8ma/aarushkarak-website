import { useRef, useCallback, type RefObject } from "react";

export function use3DTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentX: 0, currentY: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.currentX = x * intensity;
      stateRef.current.currentY = -y * intensity;
      el.style.transform = `perspective(600px) rotateX(${stateRef.current.currentY}deg) rotateY(${stateRef.current.currentX}deg)`;
    },
    [intensity],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    stateRef.current.currentX = 0;
    stateRef.current.currentY = 0;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return {
    ref: ref as RefObject<HTMLDivElement | null>,
    onMouseMove,
    onMouseLeave,
  };
}
