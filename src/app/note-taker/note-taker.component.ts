import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  id_check: number;
  note: Note = new Note();
  notes: Array<Note> = [];
  // collection: Array<Note> = [];

  constructor(private notesService: NotesService) {
    // for (let i = 1; i < 10; i++ ) {
    //      this.collection.push(this.note[i]);
    //    }
  }

  ngOnInit() {

  }
  takeNote() {
    if ((this.note.title || this.note.text) !== '') {
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.notes.push(data);
        },
        error => {
          this.errMessage = error.message;
        }
      );
    } else {
      this.errMessage = 'Title and Text both are required fields';
      console.log(this.errMessage);
    }
    this.note = new Note();
  }

}
