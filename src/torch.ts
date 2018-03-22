import {Application, NextFunction, Response} from 'express';

import connect from './connect';
import {GroupConfig} from './models/group_config';
import {RequestWithTorch} from './models/request_with_torch';
import {RouteConfig} from './models/route_config';
import {Router} from './router';
import {Routes} from './routes';

export {Router} from './router';
export { Routes } from './routes';
export { RouteConfig } from './models/route_config';
export { GroupConfig } from './models/group_config';

export default function Torch<T>(app: Application, callback: (router: Router<T>) => void): Routes<T> {
    let routes: Routes<T> = new Routes<T>();

    const router = new Router<T>({
        middleware: [(req: RequestWithTorch<T>, res: Response, next: NextFunction) => {
            req.routes = routes;
            next();
        }]
    });

    callback(router);

    routes.routes = connect(app, router);

    return routes;
}
