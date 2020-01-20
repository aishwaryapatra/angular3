import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  errMessage:string;
  notes: Array<Note> = [];

  constructor(private noteservice: NotesService) { }

  ngOnInit() {
    this.noteservice.getNotes().subscribe(data => {
      this.notes = data;
    },
      error => {
        this.errMessage=error.message;
        console.log(error);
      }
    );
  }
}
