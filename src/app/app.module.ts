import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { NoteComponent } from './note/note.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationService } from './services/authentication.service';
import { MatSelectModule } from '@angular/material/select';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: '', component : DashboardComponent,
  //   canActivate : [CanActivateRouteGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }],
    canActivate: [CanActivateRouteGuard]

  }
  // Will be activated by the login-guard to check user is authorised to access admin page.
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, DashboardComponent,
    NoteTakerComponent, NoteViewComponent,
    NoteComponent, EditNoteViewComponent, EditNoteOpenerComponent, ListViewComponent],
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule],
  providers: [NotesService, RouterService, CanActivateRouteGuard, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
