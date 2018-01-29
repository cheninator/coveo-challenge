import { Component } from '@angular/core';
import { SuggestionService } from './suggestion.service';
import { City } from './../../../common/models/city';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    private searchTerm: string;
    private isLocationActivated: boolean;
    private cities: City[];
    private latitude?: number;
    private longitude?: number;
    
    constructor(private suggestionService_: SuggestionService) {
        this.searchTerm = "";   
        this.isLocationActivated = false;
    }
    
    public activateLocation(event: any) {
        if (this.isLocationActivated) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.searchTermChanged();
                },
                (error) => {
                    console.log(error.message);
                });
            } else {
                alert("Geolocation is not supported by this browser.");
                this.latitude = undefined;
                this.longitude = undefined;
            }
        }
        else {
            this.latitude = undefined;
            this.longitude = undefined;
            this.searchTermChanged();
        }
    }
    
    public searchTermChanged(event?: any): void {
        // Make sure that user finished to type. We don't want to spam the server for every key stroke...
        setTimeout(() => {
            this.suggestionService_.getSuggestions(this.searchTerm, this.latitude, this.longitude).then((result) => {
                this.cities = result;
            });
        }, 400);
    }
}
