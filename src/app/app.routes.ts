import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DogViewerComponent } from './components/dog-viewer/dog-viewer.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { DogExplorerComponent } from './components/dog-explorer/dog-explorer.component';
import { DogGalleryComponent } from './components/dog-gallery/dog-gallery.component';
import { DogCompareComponent } from './components/dog-compare/dog-compare.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ver', component: DogViewerComponent },
  { path: 'explorar', component: DogExplorerComponent },
  { path: 'galeria', component: DogGalleryComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'comparar', component: DogCompareComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
