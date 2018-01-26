import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as cors from 'cors';

import { ApiRoutes } from './routes';

export class Server {

    private readonly port_: number | string | boolean;
    private readonly apiRoutes_: ApiRoutes;
    private readonly internalError = 500;

    private httpServer_: http.Server;
    private express_: express.Application;

    constructor(port : number | string) {
        this.port_ = this.normalizePort(process.env.PORT || port);
        this.apiRoutes_ = new ApiRoutes();
        this.init();
    }

    get app(): express.Application {
        return this.express_;
    }

    private init(): void {
        this.express_ = express();
        this.configureMiddlewares();
        this.configureRoutes();
    }

    private configureMiddlewares() {
        this.express_.use(logger("dev"));
        this.express_.use(bodyParser.json());
        this.express_.use(bodyParser.urlencoded({ extended: true }));
        this.express_.use(cookieParser());
        this.express_.use(express.static(path.join(__dirname, "../client")));
        this.express_.use(cors());
    }

    private configureRoutes() {
        const router = express.Router();
        router.use(this.apiRoutes_.routes);
        this.express_.use(router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        this.express_.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.express_.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.express_.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.express_.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }

    private normalizePort(val: number | string): number | string | boolean {
        let port = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        } 
        else if (port >= 0) {
            return port;
        } 
        else {
            return false;
        }
    }
}