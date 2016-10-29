import {Application} from "express";
import Router from "./router";
import {Route} from "./interfaces/route";

export default function Torch(app: Application, callback: (router: Router) => void) {
    const router = new Router();
    
    callback(router);

    router.routes.forEach((route: Route) => {
        switch (route.method) {
            case 'get':
                app.get(route.path, route.controller);
                break;
        }
    });
}