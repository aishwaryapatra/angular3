import { Component, Input, OnInit} from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note;

  constructor(private routeservice: RouterService) { }

  ngOnInit() {
  }

  editNote() {
    const noteID = this.note.id;
    this.routeservice.routeToEdit(noteID);
  }

}
