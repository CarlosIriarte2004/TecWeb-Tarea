// src/app/services/dog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) {}

  getRandomDog(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAllBreeds(): Observable<any> {
    return this.http.get('https://dog.ceo/api/breeds/list/all');
  }

  getBreedImage(breed: string): Observable<any> {
    return this.http.get<{ message: string }>('https://dog.ceo/api/breeds/image/random')

  }

}
