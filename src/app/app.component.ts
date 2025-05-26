import { Component } from '@angular/core';
import { DogViewerComponent } from './components/dog-viewer/dog-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DogViewerComponent],
  template: '<app-dog-viewer></app-dog-viewer>'
})
export class AppComponent {}
