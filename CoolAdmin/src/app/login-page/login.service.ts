import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from './auth-data';
import { BroadcastService } from '../broadcast.service';
import { IsiServiceService } from '../isi-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private login: string;
  public accessGranted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private broadcast: BroadcastService,
              private isiService: IsiServiceService) { }

  public provideLoginAction(login: string, password: string): Observable<AuthData> {
    return this.broadcast.provideGetRequest<AuthData>('adminLogin', 
                            new Map<string, string>()
                              .set('login', login)
                              .set('password', password))
  }

  public provideLogoutAction(): Observable<any> {
    let login = this.login;
    this.login = null;
    this.isiService.clear();
    return this.broadcast.providePostRequest('adminLogout', new Map<string, string>()
                                                              .set('login', login));
  }

  public setCurrentUserLogin(login: string): void {
    this.login = login;
  }

  public getCurrentUserLogin(): string {
    return this.login;
  }
}
