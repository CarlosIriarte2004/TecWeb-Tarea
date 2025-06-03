import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.scss']
})
export class DogGalleryComponent {
  images = signal<string[]>([]);
  loading = signal(false);
  breed = '';
  sub = '';

  constructor(private route: ActivatedRoute, private dogService: DogService) {
    this.route.queryParams.subscribe(params => {
      this.breed = params['breed'] || '';
      this.sub = params['sub'] || '';

      if (this.breed) {
        this.loadImages();
      }
    });
  }

  loadImages() {
    this.loading.set(true);
    const observable = this.sub
      ? this.dogService.getSubBreedImages(this.breed, this.sub)
      : this.dogService.getBreedImages(this.breed);

    observable.subscribe({
      next: res => {
        this.images.set(res.message);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
