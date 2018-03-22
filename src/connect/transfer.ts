import {Application} from 'express';

import {Controller} from '../models/controller';
import {Middleware} from '../models/middleware';

/**
 * Transfer the different methods to the Express application
 * @param app
 * @param method
 * @param path
 * @param middleware
 * @param controller
 */
export default function transfer(app: Application,
                                 method: string,
                                 path: string,
                                 middleware: Middleware[],
                                 controller: Controller) {
    switch (method) {
        case 'get':
            app.get(path, middleware, controller);
            // (req: Request, res: Response, next: NextFunction) => controller(req, res, next));
            break;
        case 'post':
            app.post(path, middleware, controller);
            break;
        case 'put':
            app.put(path, middleware, controller);
            break;
        case 'delete':
            app.delete(path, middleware, controller);
            break;
        default:
            throw new Error('Unknown method requested for transfer: ' + method);
    }
};
