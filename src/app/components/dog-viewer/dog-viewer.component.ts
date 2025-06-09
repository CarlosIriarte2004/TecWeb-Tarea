import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dog-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dog-viewer.component.html',
  styleUrl: './dog-viewer.component.scss'
})
export class DogViewerComponent {
  dogImage = signal('');
  loading = signal(false);
  breeds = signal<string[]>([]);
  selectedBreed = signal('');
  favorites = signal<string[]>([]);

  constructor(private dogService: DogService) {
    this.loadFavorites();
    this.loadBreeds();
    this.loadDog();
  }

  loadDog() {
    this.loading.set(true);
    const breed = this.selectedBreed();

    const request = breed
      ? this.dogService.getBreedImage(breed)
      : this.dogService.getRandomDog();

    request.subscribe({
      next: res => {
        this.dogImage.set(res.message);
        this.loading.set(false);
        console.log('✅ Imagen cargada:', res.message);
      },
      error: err => {
        console.error('❌ Error al cargar imagen:', err);
        this.loading.set(false);
      }
    });
  }

  loadBreeds() {
    this.dogService.getAllBreeds().subscribe({
      next: res => {
        this.breeds.set(Object.keys(res.message));
      },
      error: err => console.error('❌ Error cargando razas:', err)
    });
  }

  addFavorite(image: string) {
    const current = [...this.favorites(), image];
    this.favorites.set(current);
    localStorage.setItem('favorites', JSON.stringify(current));
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites.set(JSON.parse(saved));
    }
  }
}
