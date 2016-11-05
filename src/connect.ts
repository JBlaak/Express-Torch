import {Application, Request, Response, NextFunction} from "express";
import Route from "./route";
import Router from "./router";
import transfer from "./connect/transfer";
import {trim} from "./util/trim";

export default function connect(app: Application,
                                router: Router,
                                previouxPrefix: string|null = null,
                                previousMiddleware: Array<(req: Request, res: Response, next: NextFunction) => any> = []): Array<Route> {

    let routes: Array<Route> = [];
    
    let prefix = '';
    if (router.prefix !== null && previouxPrefix !== null) {
        prefix = previouxPrefix + '/' + trim(router.prefix);
    } else if (router.prefix !== null) {
        prefix = '/' + trim(router.prefix);
    }

    /* Transfer each route to Express */
    router.routes.forEach((route: Route) => {
        let path = prefix;
        if (trim(route.path) != '') {
            path += '/' + trim(route.path);
        }

        /* Transfer to Express */
        transfer(
            app,
            route.method,
            path,
            [...previousMiddleware, ...router.middleware, ...route.middleware],
            route.controller
        );

        /* Add to routes listing */
        const aggregatedRoute = new Route(route.method, path, route.controller);
        aggregatedRoute.middleware = [...previousMiddleware, ...router.middleware, ...route.middleware];
        aggregatedRoute.name = route.name;
        routes.push(aggregatedRoute);
    });

    /* Recursively transfer routes of each group as well including the parent middleware and prefix */
    router.groups.forEach((group: Router) => {
        routes = [...routes, ...connect(
            app,
            group,
            prefix === '' ? null : prefix,
            [...previousMiddleware, ...router.middleware]
        )];
    });

    return routes;
}