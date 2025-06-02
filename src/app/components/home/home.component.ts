import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dogImage = signal('');

  constructor(private http: HttpClient) {
    this.loadDogImage();
  }

  loadDogImage() {
    this.http.get<{ message: string }>('https://dog.ceo/api/breeds/image/random')
      .subscribe({
        next: res => {
          this.dogImage.set(res.message);
          console.log('Imagen de perro cargada:', res.message);
        },
        error: err => {
          console.error('Error al cargar la imagen aleatoria', err);
        }
      });
  }
}
