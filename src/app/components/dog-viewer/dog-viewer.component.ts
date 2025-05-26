import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-viewer.component.html',
  styleUrl: './dog-viewer.component.scss'
})
export class DogViewerComponent {
  dogImage = signal('');
  loading = signal(false);

  constructor(private dogService: DogService) {
    this.loadDog();
  }

  loadDog() {
    this.loading.set(true);
    this.dogService.getRandomDog().subscribe({
      next: res => {
        this.dogImage.set(res.message);
        this.loading.set(false);
      },
      error: err => {
        console.error('Error:', err);
        this.loading.set(false);
      }
    });
  }
}
