import {Application, Request, Response, NextFunction} from "express";
import Router from "./router";
import {RouteConfig} from "./models/route_config";
import {GroupConfig} from "./models/group_config";
import connect from "./connect";
import Routes from "./routes";
import {RequestWithTorch} from "./models/request_with_torch";

export type Router = Router;
export type Route = RouteConfig;
export type Group = GroupConfig;
export type Routes = Routes;

export default function Torch(app: Application, callback: (router: Router) => void): Routes {
    let routes: Routes = new Routes();

    const router = new Router({
        middleware: [(req: RequestWithTorch, res: Response, next: NextFunction) => {
            req.routes = routes;
            next();
        }]
    });
    
    callback(router);

    routes.routes = connect(app, router);

    return routes;
}