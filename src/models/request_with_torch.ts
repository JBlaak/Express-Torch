import {Request} from 'express';

import {Routes} from '../torch';

export interface RequestWithTorch<T> extends Request {
    routes: Routes<T>;
}
