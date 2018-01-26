import { Router, Request, Response, NextFunction } from 'express';
import { SuggestionService } from './services/suggestion.service';

export class ApiRoutes {

    private suggestionService_ : SuggestionService;

    public constructor() {
        this.suggestionService_ = new SuggestionService();
    }

    public get routes(): Router {
        let router: Router = Router();

        /* Define services and routes here */
        router.get("/api/suggestions", (req: Request, res: Response, next: NextFunction) => this.suggestionService_.getSuggestions(req, res, next));

        return router;
    }
}