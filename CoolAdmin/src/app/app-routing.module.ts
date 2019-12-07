import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MainGuard } from './admin-panel/main.guard';
import { PostsListComponent } from './admin-panel/posts-list/posts-list.component';
import { PostEditorComponent } from './admin-panel/post-editor/post-editor.component';


const routes: Routes = [
  {path: '', redirectTo: '/loginadmin', pathMatch: 'full'},
  {path: 'loginadmin', component: LoginPageComponent},
  {path: 'adminpanel', component: AdminPanelComponent, 
    canActivate: [MainGuard],
    children: [
      { path: '', redirectTo: '/adminpanel/postslist', pathMatch: 'full'},
      { path: 'postslist', component: PostsListComponent},
      { path: 'posteditor', component: PostEditorComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
