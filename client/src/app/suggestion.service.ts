import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { City } from './../../../common/models/city';
import 'rxjs/add/operator/map';

@Injectable()
export class SuggestionService {

    private baseUrl = "http://localhost:3000/api/suggestions";

    constructor(private http: Http) {

    }

    public getSuggestions(searchTerm: string, latitude ?: number, longitude ?: number): Promise<City[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params = new URLSearchParams();
        params.set('q', searchTerm);

        if (latitude !== undefined && longitude !== undefined) {
            params.set('latitude', latitude.toString());
            params.set('longitude', longitude.toString());
        }

        let options = new RequestOptions({ 
            headers: headers,
            params: params
        });

        return this.http.get(this.baseUrl, options)
            .toPromise()
            .then((res) => {
                return <City[]>res.json();
            });
    }
}
