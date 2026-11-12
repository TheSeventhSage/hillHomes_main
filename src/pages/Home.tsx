import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { Showcase } from '@/sections/Showcase';
import { Statement } from '@/sections/Statement';
import { Practice } from '@/sections/Practice';
import { Selection } from '@/sections/Selection';
import { Routes } from '@/sections/Routes';
import { Values } from '@/sections/Values';
import { Marquee } from '@/sections/Marquee';

export function Home() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  return (
    <div ref={root}>
      <Showcase />
      <Statement />
      <Selection />
      <Marquee />
      <Practice />
      <Routes />
      <Values />
    </div>
  );
}
