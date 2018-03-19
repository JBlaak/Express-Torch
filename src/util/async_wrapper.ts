import {NextFunction, Request, Response} from 'express';

import {Controller} from '../models/controller';

export function asyncWrapper(controller: Controller) {
    return (req: Request, res: Response, next: NextFunction) => {

        const possibleHandlerPromise = controller(req, res, next);

        // Check if we are dealing with a Promise, http://www.ecma-international.org/ecma-262/6.0/#sec-promise.resolve
        if (Promise.resolve(possibleHandlerPromise) === possibleHandlerPromise) {
            Promise.resolve(possibleHandlerPromise).catch(next);
        }
    };
}
