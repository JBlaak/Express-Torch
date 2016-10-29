import {Application} from "express";
import Router from "./router";
import {RouteConfig} from "./models/route_config";
import {GroupConfig} from "./models/group_config";
import connect from "./connect";

export type Router = Router;
export type Route = RouteConfig;
export type Group = GroupConfig;

export default function Torch(app: Application, callback: (router: Router) => void) {
    const router = new Router();
    
    callback(router);

    connect(app, router);
}