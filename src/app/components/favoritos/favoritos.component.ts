import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent {
  favorites = signal<string[]>([]);

  constructor() {
    this.loadFavorites();
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites.set(JSON.parse(saved));
    }
  }

  removeFavorite(img: string) {
    const updated = this.favorites().filter(f => f !== img);
    this.favorites.set(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  }

  clearFavorites() {
    localStorage.removeItem('favorites');
    this.favorites.set([]);
  }
}
