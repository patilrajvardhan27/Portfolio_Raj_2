import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'search',
    loadComponent: () => import('./pages/results/results').then((m) => m.Results),
  },
  { path: '**', redirectTo: '' },
];
