import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private baseUrl = 'https://api-dog-dfi1.onrender.com/api';


  constructor(private http: HttpClient) {}

  // Imagen aleatoria de cualquier perro
  getRandomDog(): Observable<any> {
    return this.http.get(`${this.baseUrl}/breeds/image/random`);
  }

  // Lista de todas las razas
  getAllBreeds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/breeds/list/all`);
  }

  // Imagen aleatoria por raza
  getBreedImage(breed: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breed/${breed}/images/random`);
  }

  // Todas las imágenes de una raza
  getBreedImages(breed: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breed/${breed}/images`);
  }

  // Subrazas de una raza
  getSubBreeds(breed: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breed/${breed}/list`);
  }

  // Imagen aleatoria por subraza
  getSubBreedImage(breed: string, sub: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breed/${breed}/${sub}/images/random`);
  }

  // Todas las imágenes por subraza
  getSubBreedImages(breed: string, sub: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breed/${breed}/${sub}/images`);
  }
}
