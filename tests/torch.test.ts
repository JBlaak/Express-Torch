import {Application, Request, Response, NextFunction} from "express";
import {expect} from 'chai';
import Torch from "../src/torch";
import Router from "../src/router";

describe('Torch', function () {

    it('Should allow for registering a GET method directly', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.get('/home', method);
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a POST method directly', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            post: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.post('/posts', method);
        });

        /* Then */
        expect(registeredPath).to.equal('/posts');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a PUT method directly', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            put: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.put('/posts/:id', method);
        });

        /* Then */
        expect(registeredPath).to.equal('/posts/:id');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a DELETE method directly', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            delete: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.delete('/posts/:id', method);
        });

        /* Then */
        expect(registeredPath).to.equal('/posts/:id');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering by passing a config', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.get('/home', {
                controller: method
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
        expect(registeredMethod).to.equal(method);
    });

    it('Should add a leading / when registering a route without one', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.get('home', method);
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a route within a group', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({}, (router: Router) => {
                router.get('/home', method);
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a route within a group within a group', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
                registeredMethod = method;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({}, (router: Router) => {
                router.group({}, (router: Router) => {
                    router.get('/home', method);
                });
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
        expect(registeredMethod).to.equal(method);
    });

    it('Should allow for registering a route with a prefix from two groups with a name', function () {
        /* Given */
        let registeredPath: string|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({prefix: 'api'}, (router: Router) => {
                router.group({prefix: 'posts'}, (router: Router) => {
                    router.get('/:id/update', method);
                });
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/api/posts/:id/update');
    });

    it('Should allow for registering a route with a prefix from two groups without a name', function () {
        /* Given */
        let registeredPath: string|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredPath = path;
            }
        };

        /* When */
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({prefix: 'api'}, (router: Router) => {
                router.group({prefix: 'posts'}, (router: Router) => {
                    router.get('/', method);
                });
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/api/posts');
    });

    it('Should pass the middleware', function () {
        /* Given */
        let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredMiddleware = middleware;
            }
        };

        /* When */
        const middleware = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.get('/home', {
                middleware: [middleware],
                controller: method
            });
        });

        /* Then */
        expect(registeredMiddleware[0]).to.equal(middleware);
    });

    it('Should add middleware from the group', function () {
        /* Given */
        let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredMiddleware = middleware;
            }
        };

        /* When */
        const middleware = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({middleware: [middleware]}, (router: Router) => {
                router.get('/home', method);
            });
        });

        /* Then */
        expect(registeredMiddleware[0]).to.equal(middleware);
    });

    it('Should inherit middleware from distant group', function () {
        /* Given */
        let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredMiddleware = middleware;
            }
        };

        /* When */
        const middleware = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({middleware: [middleware]}, (router: Router) => {
                router.group({}, (router: Router) => {
                    router.get('/home', method);
                });
            });
        });

        /* Then */
        expect(registeredMiddleware[0]).to.equal(middleware);
    });

    it('Should add middlewares in correct order', function () {
        /* Given */
        let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>)|null = null;

        const app: any = {
            get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                registeredMiddleware = middleware;
            }
        };

        /* When */
        const a = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const b = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const c = (req: any, res: any, next: any) => {
            /* The impl */
        };
        const method = (req: any, res: any) => {
            /* The impl */
        };
        Torch(app as Application, (router: Router) => {
            router.group({middleware: [a]}, (router: Router) => {
                router.group({middleware: [b]}, (router: Router) => {
                    router.get('/home', {
                        middleware: [c],
                        controller: method
                    });
                });
            });
        });

        /* Then */
        expect(registeredMiddleware[0]).to.equal(a);
        expect(registeredMiddleware[1]).to.equal(b);
        expect(registeredMiddleware[2]).to.equal(c);
    });


});
