import {Application} from "express";
import Route from "./route";
import Router from "./router";

export default function connect(app: Application, router: Router, prefix: string = '/') {
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
                app.get(path, route.controller);
                break;
        }
    });

    router.groups.forEach((router: Router) => {
        connect(
            app,
            router,
            '/' + trim(prefix) + '/' + trim(router.prefix)
        );
    });
}