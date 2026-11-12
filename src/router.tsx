import { createBrowserRouter } from 'react-router';
import { Root } from '@/Root';
import { Home } from '@/pages/Home';
import { Properties } from '@/pages/Properties';
import { Portal } from '@/pages/Portal';
import { Service } from '@/pages/Service';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'properties', element: <Properties /> },
      { path: 'properties/residences', element: <Portal id="residences" /> },
      { path: 'properties/apartments', element: <Portal id="apartments" /> },
      { path: 'properties/commercial', element: <Portal id="commercial" /> },
      { path: 'land', element: <Portal id="land" /> },
      { path: 'developments', element: <Portal id="developments" /> },
      { path: 'property-management', element: <Service path="/property-management" /> },
      { path: 'investment', element: <Service path="/investment" /> },
      { path: 'advisory', element: <Service path="/advisory" /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
