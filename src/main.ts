import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import { Router, type Route } from './router';

const routes: Route[] = [
  { path: '/', load: () => import('./pages/home/home') },
  { path: '/art-project', load: () => import('./pages/art/start') },
  { path: '/art-project/:slug', load: () => import('./pages/art/constructor') },
  { path: '/galeria', load: () => import('./pages/galeria/carousel') },
  { path: '/galeria/:n', load: () => import('./pages/galeria/detail') },
  { path: '/filmy', load: () => import('./pages/filmy/start') },
  { path: '/filmy/plakaty', load: () => import('./pages/filmy/plakaty') },
  { path: '/filmy/fakty', load: () => import('./pages/filmy/plakaty') },
  { path: '/filmy/fakty/:slug', load: () => import('./pages/fakty/accordion') },
  { path: '/filmy/kraje', load: () => import('./pages/kraje/start') },
  { path: '/filmy/kraje/:slug', load: () => import('./pages/kraje/country') },
  { path: '/filmy/:slug', load: () => import('./pages/filmy/film') },
];

// images fade in once loaded (load does not bubble, so listen in the capture phase)
document.addEventListener(
  'load',
  (e) => {
    if (e.target instanceof HTMLImageElement) e.target.classList.add('is-loaded');
  },
  true,
);

const root = document.getElementById('app');
if (root) void new Router(root, routes, () => import('./pages/not-found')).start();
