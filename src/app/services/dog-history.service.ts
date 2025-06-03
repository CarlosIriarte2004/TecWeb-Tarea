import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogHistoryService {
  private key = 'dog-history';

  getHistory(): string[] {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  }

  addToHistory(entry: string) {
    let history = this.getHistory();

    history = [entry, ...history.filter(e => e !== entry)].slice(0, 5);
    localStorage.setItem(this.key, JSON.stringify(history));
  }

  clearHistory() {
    localStorage.removeItem(this.key);
  }
}
