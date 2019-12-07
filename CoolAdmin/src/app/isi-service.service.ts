import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsiServiceService {

  private isi: string = '';

  public setIsi(isi: string): void {
    this.isi = isi;
    localStorage.setItem('isi', isi);
  }

  public clear(): void {
    localStorage.removeItem('isi');
  }

  public getIsi(): string {
    if (this.isi !== '') {
      return this.isi;
    } else {
      this.getIsiFromLocalStorage();
      return this.isi;
    }
  }

  private getIsiFromLocalStorage(): void {
    let isi = localStorage.getItem('isi');
    if (isi) {
      this.isi = isi;
    }
  }
}
