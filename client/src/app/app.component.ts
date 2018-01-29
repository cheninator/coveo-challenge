import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SuggestionService } from './suggestion.service';
import { City } from './../../../common/models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  
  private searchTerm: string;
  private cities: City[];
  
  constructor(private suggestionService_: SuggestionService) {
    this.searchTerm = "";
  }

  ngOnInit(): void {
    this.suggestionService_.getSuggestions(this.searchTerm).then((result) => {
      this.cities = result;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
