import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  errMessage: string;

  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];
  notes: Array<Note>;

  constructor(private noteservice: NotesService) {

  }

  ngOnInit() {
    this.noteservice.getNotes().subscribe(data => {
      console.log(data);
      this.notes = data;
      let i: number;
      for (i = 0; i < this.notes.length; i++) {
        if (this.notes[i].state === 'not-started') {
          this.notStartedNotes.push(this.notes[i]);
        }
        if (this.notes[i].state === 'started') {
          this.startedNotes.push(this.notes[i]);
        }
        if (this.notes[i].state === 'completed') {
          this.completedNotes.push(this.notes[i]);
        }
      }
    },
      error => {
        console.log(error);
        this.errMessage = error.message;
      });
  }
}

