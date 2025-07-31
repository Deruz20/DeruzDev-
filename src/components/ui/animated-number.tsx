'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

type AnimatedNumberProps = {
  to: number;
  prefix?: string;
  postfix?: string;
};

export function AnimatedNumber({ to, prefix = '', postfix = '' }: AnimatedNumberProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        // Format to have commas and up to 2 decimal places if needed
        const formattedValue = value.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
        node.textContent = `${prefix}${formattedValue}${postfix}`;
      },
    });

    return () => controls.stop();
  }, [to, prefix, postfix]);

  return <span ref={nodeRef} />;
}
