import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsiServiceService {

  constructor() { 
    let isi = localStorage.getItem('isi');
    if (isi) {
      this.isi = isi;
    }
  }

  private isi: string = '';

  public setIsi(isi: string): void {
    this.isi = isi;
    localStorage.setItem('isi', isi);
  }

  public clear(): void {
    localStorage.removeItem('isi');
  }

  public getIsi(): string {
    return this.isi;
  }
}
