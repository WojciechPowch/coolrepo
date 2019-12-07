import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { DialogService } from 'src/app/dialog.service';
import { Observer, Observable } from 'rxjs';
import { LoginService } from 'src/app/login-page/login.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  public posts: Array<any> = [];
  private getPostsObserve: Observable<any>;

  constructor(private postsService: PostsService,
              private dialogService: DialogService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.initPostsList();
  }

  private initPostsList(): void {
    this.loginService.accessGranted.subscribe(
      value => {
        this.getPostsObserve = this.postsService.getPosts();
        this.subscribePostAction();
      }
    );
  }

  private subscribePostAction(): void {
    this.getPostsObserve.subscribe(
      result => {
        if (result.success) {
          this.posts = result.posts;
        } else {
          this.dialogService.openErrorDialogWindow(result.message);
        }
      },
      error => {
        this.dialogService.openErrorDialogWindow('Error occured while connecting to server!')
      }
    )
  }
}
