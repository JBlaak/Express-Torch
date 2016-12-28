import {Application, Request, Response, NextFunction} from 'express';

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
                                 middleware: Array<(req: Request, res: Response, next: NextFunction) => any>,
                                 controller: ((req: Request, res: Response) => void)) {
    switch (method) {
        case 'get':
            app.get(path, middleware, controller);
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
