import { Component, OnInit } from '@angular/core';
import { SuggestionService } from './suggestion.service';
import { City } from './../../../common/models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
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

  searchTermChanged(event: any): void {
    console.log(this.searchTerm);
  }
}
