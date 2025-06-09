import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dogImage = signal('');
  loading = signal(true);

  constructor(private dogService: DogService) {
    this.loadDogImage();
  }

  loadDogImage() {
    this.loading.set(true);
    this.dogService.getRandomDog().subscribe({
      next: res => {
        this.dogImage.set(res.message);
        this.loading.set(false);
        console.log('🐶 Imagen cargada:', res.message);
      },
      error: err => {
        console.error('❌ Error al cargar la imagen aleatoria', err);
        this.loading.set(false);
      }
    });
  }
}
