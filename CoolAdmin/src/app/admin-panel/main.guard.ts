import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IsiServiceService } from '../isi-service.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private isiService: IsiServiceService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let canActivate = this.checkIsi();
    if (!canActivate) {
      this.router.navigate(['loginadmin'])
    }
    return canActivate;
  }

  private checkIsi(): boolean {
    return this.isiService.getIsi() !== undefined && this.isiService.getIsi() != ""
  }
  
}
