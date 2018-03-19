import {Application} from 'express';

import {Controller} from '../models/controller';
import {Middleware} from '../models/middleware';
import {asyncWrapper} from '../util/async_wrapper';

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
            app.get(path, middleware, asyncWrapper(controller));
            break;
        case 'post':
            app.post(path, middleware, asyncWrapper(controller));
            break;
        case 'put':
            app.put(path, middleware, asyncWrapper(controller));
            break;
        case 'delete':
            app.delete(path, middleware, asyncWrapper(controller));
            break;
        default:
            throw new Error('Unknown method requested for transfer: ' + method);
    }
};
