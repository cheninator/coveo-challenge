import { Request, Response, NextFunction } from "express";

export class SuggestionService {
    
    public getSuggestions(req: Request, res: Response, next: NextFunction) {
        let q = req.query['q'];
        if (q === undefined) {
            res.status(400);
            res.json({ suggestions: [] })
        }

        let latitude = req.query['latitude'];
        let longitude = req.query['longitude'];
    }
}