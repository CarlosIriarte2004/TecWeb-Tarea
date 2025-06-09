import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dog-compare.component.html',
  styleUrls: ['./dog-compare.component.scss']
})
export class DogCompareComponent {
  breeds = signal<string[]>([]);
  breed1 = signal('');
  breed2 = signal('');
  image1 = signal('');
  image2 = signal('');

  constructor(private dogService: DogService) {
    this.loadBreeds();
  }

  loadBreeds() {
    this.dogService.getAllBreeds().subscribe({
      next: res => this.breeds.set(Object.keys(res.message)),
      error: err => console.error('Error cargando razas:', err)
    });
  }

  loadImages() {
    if (this.breed1()) {
      this.dogService.getBreedImage(this.breed1()).subscribe({
        next: res => this.image1.set(res.message),
        error: err => console.error('Error imagen 1:', err)
      });
    }
    if (this.breed2()) {
      this.dogService.getBreedImage(this.breed2()).subscribe({
        next: res => this.image2.set(res.message),
        error: err => console.error('Error imagen 2:', err)
      });
    }
  }
}
