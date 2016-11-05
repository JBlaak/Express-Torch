import {Application} from "express";
import Router from "./router";
import {RouteConfig} from "./models/route_config";
import {GroupConfig} from "./models/group_config";
import connect from "./connect";
import Routes from "./routes";

export type Router = Router;
export type Route = RouteConfig;
export type Group = GroupConfig;
export type Routes = Routes;

export default function Torch(app: Application, callback: (router: Router) => void): Routes {
    const router = new Router();
    
    callback(router);

    const routes: Array<Route> = connect(app, router);
    
    return new Routes(routes);
}