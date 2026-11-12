import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { startSmooth } from '@/motion/smooth';
import { ScrollTrigger } from '@/motion/gsap';
import { TransitionProvider } from '@/motion/transition';
import { Preloader } from '@/components/Preloader';
import { Cursor } from '@/motion/Cursor';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

/** Smooth scroll, the transition cover, the header and the footer around every page. */
export function Root() {
  useEffect(() => startSmooth(), []);
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    void document.fonts.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const main = document.getElementById('main');
      const past = main ? main.getBoundingClientRect().bottom < 36 : false;
      const dark =
        past ||
        Array.from(document.querySelectorAll('[data-dark]')).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 36 && r.bottom >= 36;
        });
      root.toggleAttribute('data-header-dark', dark);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const t = window.setInterval(update, 250);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearInterval(t);
    };
  }, []);
  return (
    <TransitionProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-canvas focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative z-10 bg-canvas">
        <Outlet />
      </main>
      <Footer />
      <Cursor />
      <Preloader />
    </TransitionProvider>
  );
}
