import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, MatToolbarModule, MatInputModule, MatDividerModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PostsListComponent } from './admin-panel/posts-list/posts-list.component';
import { PostEditorComponent } from './admin-panel/post-editor/post-editor.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DialogWindowComponent,
    AdminPanelComponent,
    PostsListComponent,
    PostEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatDividerModule,
    MatDialogModule,
    RichTextEditorAllModule
  ],
  providers: [],
  entryComponents: [
    DialogWindowComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
