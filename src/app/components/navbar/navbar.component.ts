import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true
})
export class NavbarComponent {
  menuAbierto = false;

  constructor(private elementRef: ElementRef) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  // Detectar clic fuera del navbar
@HostListener('document:click', ['$event'])
onClickFuera(event: MouseEvent) {
  const clicDentro = this.elementRef.nativeElement.contains(event.target);
  if (!clicDentro && this.menuAbierto) {
    this.menuAbierto = false;
  }
}

}
