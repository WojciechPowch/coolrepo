import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openErrorDialogWindow(message: string): void {
    this.dialog.open(DialogWindowComponent, {
      width: '250px',
      data: {
        message: message
      }
    })
  }
}
