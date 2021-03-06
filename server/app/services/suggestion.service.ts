/*
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Request, Response, NextFunction } from "express";
import { City } from './../../../common/models/city';
import { injectable } from 'inversify';
import { cities } from './../database/db';
import { Promise } from "mongoose";

/*
 * Provides suggestions for cities depending on a search term
 * 
 * Path supported:
 * - /api/suggestions?q=someText
 * - /api/suggestions?q=someText&latitude=41&longitude=64
 */
export interface ISuggestionService {
    getSuggestions(req: Request, res: Response, next: NextFunction): void;
}

@injectable()
export class SuggestionService implements ISuggestionService {
    
    public getSuggestions(req: Request, res: Response, next: NextFunction) {
        let q = req.query['q'];
        if (q === undefined) {
            res.status(400);
            res.json({ suggestions: [] })
        }

        let latitude = req.query['latitude'];
        let longitude = req.query['longitude'];

        cities.find({
            $text : {
                $search : q
            }
        })
        .then((results: any[]) => {
            let cities: City[] = new Array();
            for (let result of results) {
                cities.push(<City> {
                    name: result.name,
                    latitude: result.latitude,
                    longitude: result.longitude,
                    score: 1.0
                });
            }
            res.json(this.calculateConfidence(cities, q, latitude, longitude));
        })
        .catch((reason: any)=>{
            console.log(reason);
            res.send(500);
        });
    }

    /*
     * Calculates the distance between two latitude-longitude points. Taken from :
     * 
     * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
     */
    private calculateDistance(lat1: number, long1: number, lat2: number, long2: number): number {
        let p = Math.PI / 180;    
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }

    private calculateConfidence(cities: City[], searchTerm: string, latitude?: number, longitude?: number): City[] {
        // No geolocation information
        if (latitude === undefined && longitude === undefined) {
            for (let city of cities) {
                city.score *= searchTerm.length / city.name.length;
            }
        }
        else {
            let maxDistance = 0;
            for (let city of cities) {
                let distance = this.calculateDistance(latitude, longitude, city.latitude, city.longitude);
                maxDistance = Math.max(maxDistance, distance);
            }
            for (let city of cities) {
                let distance = this.calculateDistance(latitude, longitude, city.latitude, city.longitude);
                city.score = (maxDistance - distance) / maxDistance;
            }
        }
        
        // Descending sort by score
        cities.sort((c1, c2) => {
            if (c1.score < c2.score) {
                return 1;
            }
            if (c1.score > c2.score) {
                return -1;
            }
            return 0;
        })
        return cities;
    }
}