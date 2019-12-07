import { Injectable } from '@angular/core';
import { BroadcastService } from 'src/app/broadcast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private broadcast: BroadcastService) { }

  public getPosts(): Observable<any> {
    return this.broadcast.provideGetRequest('posts');
  }
}
