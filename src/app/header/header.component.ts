import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private routeservice: RouterService) {

  }

  noteview() {
    this.routeservice.routeToNoteView();
  }

  listview() {
    this.routeservice.routeToListView();
  }
}
