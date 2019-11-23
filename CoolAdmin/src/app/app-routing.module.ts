import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MainGuard } from './admin-panel/main.guard';


const routes: Routes = [
  {path: '', redirectTo: '/loginadmin', pathMatch: 'full'},
  {path: 'loginadmin', component: LoginPageComponent},
  {path: 'adminpanel', component: AdminPanelComponent, 
    canActivate: [MainGuard],
    children: [

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
