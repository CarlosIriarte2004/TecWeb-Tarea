import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DogViewerComponent } from './components/dog-viewer/dog-viewer.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ver', component: DogViewerComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
