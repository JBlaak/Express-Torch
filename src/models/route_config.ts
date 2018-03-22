import {Controller} from './controller';
import {Middleware} from './middleware';

export interface RouteConfig {
    controller: Controller;
    method?: string;
    name?: string;
    middleware?: Middleware[];
    context?: any;
}
