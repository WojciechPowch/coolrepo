import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from './auth-data';
import { BroadcastService } from '../broadcast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private broadcast: BroadcastService) { }

  public provideLoginAction(login: string, password: string): Observable<AuthData> {
    return this.broadcast.provideGetRequest<AuthData>('adminLogin', 
                            new Map<string, string>()
                              .set('login', login)
                              .set('password', password))
  }
}
