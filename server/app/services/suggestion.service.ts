/*
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Request, Response, NextFunction } from "express";
import { City } from './../models/city';
import { injectable } from 'inversify';

/*
 * 
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

        return new Array();
    }
}