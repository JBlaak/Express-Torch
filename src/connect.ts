import {Application, Request, Response, NextFunction} from "express";
import Route from "./route";
import Router from "./router";
import transfer from "./connect/transfer";
import {trim} from "./util/trim";

export default function connect(app: Application,
                                router: Router,
                                previouxPrefix: string|null = null,
                                previousMiddleware: Array<(req: Request, res: Response, next: NextFunction) => any> = []) {
   
    let prefix = '';
    if (router.prefix !== null && previouxPrefix !== null) {
        prefix = previouxPrefix + '/' + trim(router.prefix);
    } else if (router.prefix !== null) {
        prefix = '/' + trim(router.prefix);
    }

    /* Transfer each route to Express */
    router.routes.forEach((route: Route) => {
        let path = '';
        if (prefix !== null) {
            path += prefix;
        }
        if (trim(route.path) != '') {
            path += '/' + trim(route.path);
        }

        transfer(
            app,
            route.method,
            path,
            [...previousMiddleware, ...router.middleware, ...route.middleware],
            route.controller
        );
    });

    /* Recursively transfer routes of each group as well including the parent middleware and prefix */
    router.groups.forEach((group: Router) => {
        connect(
            app,
            group,
            prefix,
            [...previousMiddleware, ...router.middleware]
        );
    });
}