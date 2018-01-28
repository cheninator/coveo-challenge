/*
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
import { Router, Request, Response, NextFunction } from 'express';
import { SuggestionService, ISuggestionService } from './services/suggestion.service';
import Types from './types';

/*
 * Defines API routes for the web application
 */
export interface IRoutes {
    readonly routes: Router;
}

@injectable()
export class ApiRoutes implements IRoutes {

    private suggestionService_: ISuggestionService;

    constructor(@inject(Types.SuggestionService) suggestionService: ISuggestionService) {
        this.suggestionService_ = suggestionService;
    }

    get routes(): Router {
        let router: Router = Router();

        /* Define path and services here */
        router.get("/api/suggestions", (req: Request, res: Response, next: NextFunction) => this.suggestionService_.getSuggestions(req, res, next));

        return router;
    }
}