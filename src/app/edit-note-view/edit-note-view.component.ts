import { Component, Inject, OnInit } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;



constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
  @Inject(MAT_DIALOG_DATA) private data: any, private noteService: NotesService) { }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe((data) => {
      this.dialogRef.close();
    },
      error => {

        this.errMessage = error.message;

      });

  }

}
