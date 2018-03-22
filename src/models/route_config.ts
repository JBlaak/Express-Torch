import {Controller} from './controller';
import {Middleware} from './middleware';

export interface RouteConfig<T> {
    method?: string;
    name?: string;
    middleware?: Middleware[];
    controller: Controller;
    metadata?: T;
}
