import { Component } from '@angular/core';
import { SuggestionService } from './suggestion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private appService: SuggestionService) {

  }
}
