import {Application, Request, Response, NextFunction} from "express";
import Route from "./route";
import Router from "./router";

export default function connect(app: Application,
                                router: Router,
                                prefix: string = '/',
                                middleware: Array<(req: Request, res: Response, next: NextFunction) => any> = []) {
    
    function trim(path: string): string {
        return path.replace(/^\/|\/$/g, '');
    }

    router.routes.forEach((route: Route) => {
        let path = trim(prefix);
        if (trim(route.path) != '') {
            path += '/' + trim(route.path);
        }

        switch (route.method) {
            case 'get':
                app.get(path, [...middleware, ...route.middleware], route.controller);
                break;
            case 'post':
                app.post(path, [...middleware, ...route.middleware], route.controller);
                break;
            case 'put':
                app.put(path, [...middleware, ...route.middleware], route.controller);
                break;
            case 'delete':
                app.delete(path, [...middleware, ...route.middleware], route.controller);
                break;
        }
    });

    router.groups.forEach((r: Router) => {
        connect(
            app,
            r,
            '/' + trim(prefix) + '/' + trim(r.prefix),
            [...middleware, ...r.middleware]
        );
    });
}