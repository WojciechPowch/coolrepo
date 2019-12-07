import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingStatusService {

  public adminPanelRoutingEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public actionChanged(): void {
    this.adminPanelRoutingEvent.emit(false);
  }

  public mainViewActive(): void {
    this.adminPanelRoutingEvent.emit(true);
  }
}
