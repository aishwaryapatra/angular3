import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {
  notes: Array<Note> = [];
  subject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  fetchNotesFromServer() {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set(`Authorization`,
        `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(data => {
      this.notes = data;
      this.subject.next(this.notes);
    });

  }

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    // this.fetchNotesFromServer();
  }

  getNotes(): Observable<Array<Note>> {
    return this.subject;
    // return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {headers : new HttpHeaders().set(`Authorization` ,
    // `Bearer ${this.authService.getBearerToken()}`)
    //  });
  }
  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note,
      {
        headers: new HttpHeaders().set(`Authorization`,
          `Bearer ${this.authService.getBearerToken()}`)
      }).do(newnote => {
        this.notes.push(newnote);
        this.subject.next(this.notes);
      });
  }

  getNoteById(noteId) {
    //  const y=this.notes.find(x => x.id===noteId);
    //  return y;
    const y = this.notes.find(note => note.id === noteId);
    return Object.assign({}, y);
  }

  editNote(note) {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note,
      {
        headers: new HttpHeaders().set(`Authorization`,
          `Bearer ${this.authService.getBearerToken()}`)
      }).do(editNote => {
        const x = this.notes.find(enote => enote.id === editNote.id);
        Object.assign(x, editNote);
        this.subject.next(this.notes);
      });

  }
}
