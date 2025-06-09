import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DogService } from '../../services/dog.service';
import { DogHistoryService } from '../../services/dog-history.service';

@Component({
  selector: 'app-dog-explorer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dog-explorer.component.html',
  styleUrls: ['./dog-explorer.component.scss']
})
export class DogExplorerComponent {
  breeds = signal<string[]>([]);
  subBreeds = signal<string[]>([]);
  selectedBreed = signal('');
  selectedSubBreed = signal('');
  dogImage = signal('');
  history = signal<string[]>([]);

  constructor(
    private dogService: DogService,
    private historyService: DogHistoryService
  ) {
    this.loadBreeds();
    this.history.set(this.historyService.getHistory());
  }

  loadBreeds() {
    this.dogService.getAllBreeds().subscribe({
      next: res => this.breeds.set(Object.keys(res.message)),
      error: err => console.error('Error cargando razas', err)
    });
  }

  onBreedChange() {
    const breed = this.selectedBreed();
    this.selectedSubBreed.set('');
    if (breed) {
      this.dogService.getSubBreeds(breed).subscribe({
        next: res => this.subBreeds.set(res.message),
        error: err => console.error('Error cargando subrazas', err)
      });
    } else {
      this.subBreeds.set([]);
    }
  }

  loadImage() {
    const breed = this.selectedBreed();
    const sub = this.selectedSubBreed();

    const obs = sub
      ? this.dogService.getSubBreedImage(breed, sub)
      : this.dogService.getBreedImage(breed);

    obs.subscribe({
      next: res => this.dogImage.set(res.message),
      error: err => console.error('Error cargando imagen', err)
    });

    this.actualizarHistorial();
  }

  irAGaleria() {
    const breed = this.selectedBreed();
    const sub = this.selectedSubBreed();
    this.actualizarHistorial();

    const params = new URLSearchParams({ breed, ...(sub && { sub }) });
    window.location.href = `/galeria?${params}`;
  }

  private actualizarHistorial() {
    const nombre = this.selectedSubBreed()
      ? `${this.selectedSubBreed()} (${this.selectedBreed()})`
      : this.selectedBreed();

    if (nombre) {
      this.historyService.addToHistory(nombre);
      this.history.set(this.historyService.getHistory());
    }
  }
}
