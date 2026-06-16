import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIdx) => {
        const start = wordIdx / words.length;
        const end = (wordIdx + 1) / words.length;

        return (
          <span key={wordIdx} className="relative inline-block mr-[0.25em] whitespace-nowrap">
            <span className="opacity-20">{word}</span>
            <motion.span
              style={{ opacity: useTransform(scrollYProgress, [start, end], [0, 1]) }}
              className="absolute top-0 left-0 text-text-light font-medium"
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};
