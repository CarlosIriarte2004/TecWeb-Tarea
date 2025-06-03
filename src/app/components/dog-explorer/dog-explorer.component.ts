import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DogService } from '../../services/dog.service';
import { RouterModule } from '@angular/router';
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
      next: res => {
        const list = Object.keys(res.message);
        this.breeds.set(list);
      }
    });
  }

  onBreedChange() {
    const breed = this.selectedBreed();
    this.selectedSubBreed.set('');
    if (breed) {
      this.dogService.getSubBreeds(breed).subscribe({
        next: res => {
          this.subBreeds.set(res.message);
        }
      });
    } else {
      this.subBreeds.set([]);
    }
  }

  loadImage() {
    const breed = this.selectedBreed();
    const sub = this.selectedSubBreed();

    if (breed && sub) {
      this.dogService.getSubBreedImage(breed, sub).subscribe(res => this.dogImage.set(res.message));
    } else if (breed) {
      this.dogService.getBreedImage(breed).subscribe(res => this.dogImage.set(res.message));
    }

    this.actualizarHistorial();
  }

  irAGaleria() {
    const breed = this.selectedBreed();
    const sub = this.selectedSubBreed();

    this.actualizarHistorial();

    if (breed && sub) {
      window.location.href = `/galeria?breed=${breed}&sub=${sub}`;
    } else if (breed) {
      window.location.href = `/galeria?breed=${breed}`;
    }
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
