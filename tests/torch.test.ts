import {expect} from 'chai';
import {Application, NextFunction, Request, Response} from 'express';

import {Router} from '../src/router';
import Torch from '../src/torch';

describe('Torch', function () {

    describe('registering routes', function () {
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
            Torch(app as Application, (router: Router<any>) => {
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
            Torch(app as Application, (router: Router<any>) => {
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
            Torch(app as Application, (router: Router<any>) => {
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
            Torch(app as Application, (router: Router<any>) => {
                router.delete('/posts/:id', method);
            });

            /* Then */
            expect(registeredPath).to.equal('/posts/:id');
            expect(registeredMethod).to.equal(method);
        });

        it('Should throw an error when trying to register an unkonown HTTP verb ', function () {
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
            let throwsAnError: boolean = false;
            const method = (req: any, res: any) => {
                /* The impl */
            };
            try {
                Torch(app as Application, (router: Router<any>) => {
                    router.get('/home', {
                        controller: method,
                        method: 'asdf'
                    });

                });
            } catch (e) {
                throwsAnError = true;
            }

            /* Then */
            expect(throwsAnError).to.equal(true);
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
            Torch(app as Application, (router: Router<any>) => {
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
            Torch(app as Application, (router: Router<any>) => {
                router.get('home', method);
            });

            /* Then */
            expect(registeredPath).to.equal('/home');
            expect(registeredMethod).to.equal(method);
        });
    });

    describe('grouping', function () {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({}, (router: Router<any>) => {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({}, (router: Router<any>) => {
                    router.group({}, (router: Router<any>) => {
                        router.get('/home', method);
                    });
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/home');
            expect(registeredMethod).to.equal(method);
        });

        it('Should allow for registering a route with a prefix from two groups with a path', function () {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({prefix: 'api'}, (router: Router<any>) => {
                    router.group({prefix: 'posts'}, (router: Router<any>) => {
                        router.get('/:id/update', method);
                    });
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/api/posts/:id/update');
        });

        it('Should inherit prefix of higher group to lower group', function () {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({prefix: 'api'}, (router: Router<any>) => {
                    router.group({}, (router: Router<any>) => {
                        router.get('/:id/update', method);
                    });
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/api/:id/update');
        });

        it('Should inherit prefix of multiple higher groups to lower group', function () {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({prefix: 'api'}, (router: Router<any>) => {
                    router.group({}, (router: Router<any>) => {
                        router.group({}, (router: Router<any>) => {
                            router.get('/:id/update', method);
                        });
                    });
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/api/:id/update');
        });

        it('Should allow for registering a route with a prefix from two groups without a path', function () {
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
            Torch(app as Application, (router: Router<any>) => {
                router.group({prefix: 'api'}, (router: Router<any>) => {
                    router.group({prefix: 'posts'}, (router: Router<any>) => {
                        router.get('/', method);
                    });
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/api/posts');
        });

        it('Should pass the middleware', function () {
            /* Given */
            let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>) = [];

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
            Torch(app as Application, (router: Router<any>) => {
                router.get('/home', {
                    middleware: [middleware],
                    controller: method
                });
            });

            /* Then */
            expect(registeredMiddleware[1]).to.equal(middleware);
        });

        it('Should add middleware from the group', function () {
            /* Given */
            let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>) = [];

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
            Torch(app as Application, (router: Router<any>) => {
                router.group({middleware: [middleware]}, (router: Router<any>) => {
                    router.get('/home', method);
                });
            });

            /* Then */
            expect(registeredMiddleware[1]).to.equal(middleware);
        });

        it('Should inherit middleware from distant group', function () {
            /* Given */
            let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>) = [];

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
            Torch(app as Application, (router: Router<any>) => {
                router.group({middleware: [middleware]}, (router: Router<any>) => {
                    router.group({}, (router: Router<any>) => {
                        router.get('/home', method);
                    });
                });
            });

            /* Then */
            expect(registeredMiddleware[1]).to.equal(middleware);
        });

        it('Should add middlewares in correct order', function () {
            /* Given */
            let registeredMiddleware: (Array<(req: Request, res: Response, next: NextFunction) => any>) = [];

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
            Torch(app as Application, (router: Router<any>) => {
                router.group({middleware: [a]}, (router: Router<any>) => {
                    router.group({middleware: [b]}, (router: Router<any>) => {
                        router.get('/home', {
                            middleware: [c],
                            controller: method
                        });
                    });
                });
            });

            /* Then */
            expect(registeredMiddleware[1]).to.equal(a);
            expect(registeredMiddleware[2]).to.equal(b);
            expect(registeredMiddleware[3]).to.equal(c);
        });
    });

    describe('aggregated routes, i.e. Torches\' result', function () {

        it('should have flattened groups', function () {
            /* Given */
            const app: any = {
                get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                }
            };

            const routes = Torch(app as Application, (router: Router<any>) => {
                router.group({prefix: '/api'}, function (router) {
                    router.get('/posts', (req: any, res: any) => {
                        /* The impl */
                    });
                });
            });

            /* When */
            const result = routes.all();

            /* Then */
            expect(result).have.lengthOf(1);
            expect(result[0].path).to.equal('/api/posts');
        });

        describe('named', function () {
            it('should resolve route without arguments', function () {
                /* Given */
                const app: any = {
                    get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                    }
                };

                const routes = Torch(app as Application, (router: Router<any>) => {
                    router.get('/my-page', {
                        name: 'home',
                        controller: (req: any, res: any) => {
                            /* The impl */
                        }
                    });
                });

                /* When */
                const result = routes.named('home');

                /* Then */
                expect(result).to.equal('/my-page');
            });
            it('should resolve route with arguments', function () {
                /* Given */
                const app: any = {
                    get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                    }
                };

                const routes = Torch(app as Application, (router: Router<any>) => {
                    router.get('/posts/:id', {
                        name: 'posts.show',
                        controller: (req: any, res: any) => {
                            /* The impl */
                        }
                    });
                });

                /* When */
                const result = routes.named('posts.show', {
                    id: 123
                });

                /* Then */
                expect(result).to.equal('/posts/123');
            });
            it('should find the correct path', function () {
                /* Given */
                const app: any = {
                    get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                    }
                };

                const routes = Torch(app as Application, (router: Router<any>) => {
                    router.get('/posts', {
                        name: 'posts.index',
                        controller: (req: any, res: any) => {
                            /* The impl */
                        }
                    });
                    router.get('/posts/:id', {
                        name: 'posts.show',
                        controller: (req: any, res: any) => {
                            /* The impl */
                        }
                    });
                });

                /* When */
                const result = routes.named('posts.show', {
                    id: 123
                });

                /* Then */
                expect(result).to.equal('/posts/123');
            });
            it('should add middleware to request to find path', function () {
                /* Given */
                let registeredMiddlewares: Array<(req: Request, res: Response, next: NextFunction) => any> = [];
                const app: any = {
                    get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                        registeredMiddlewares = middleware;
                    }
                };

                const routes = Torch(app as Application, (router: Router<any>) => {
                    router.get('/home', {
                        name: 'home',
                        controller: (req: any, res: any) => {
                            /* The impl */
                        }
                    });
                });

                /* When */
                const req: any = {};
                const res: any = {};
                for (var i = 0; i < registeredMiddlewares.length; i++) {
                    registeredMiddlewares[i](req, res, () => {
                    });
                }
                const result = req.routes.named('home');

                /* Then */
                expect(result).to.equal('/home');
            });
        });

    });


    
    describe('settings of metadata on routes', function () {
        it('should leave metadata empty if the user didnt set any', function () {

            /* Given */
            type myMetaData = { blaat: string };

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
            const routes = Torch<myMetaData>(app as Application, router => {
                router.get('/home', method);
            });

            /* Then */
            expect(registeredPath).to.equal('/home');
            expect(registeredMethod).to.equal(method);
            expect(routes.all()[0].metadata).to.equal(undefined);
        });

        it('should allow a user to set metadata on a route', function () {

            /* Given */
            type myMetaData = { blaat: string };

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
            const routes = Torch<myMetaData>(app as Application, router => {
                router.get('/home', {
                    controller: method,
                    metadata: { blaat: "myString" }
                });
            });

            /* Then */
            expect(registeredPath).to.equal('/home');
            expect(registeredMethod).to.equal(method);
            expect(routes.all()[0].metadata).to.deep.equal({ blaat: 'myString' });
        });
    });

    
    describe('classes as controller', function () {
        it('should leave metadata empty if the user didnt set any', function () {

            /* Given */
            type myMetaData = { blaat: string };

            let registeredPath: string|null = null;
            let registeredMethod: ((req: Request, res: Response) => void)|null = null;

            const app: any = {
                get: (path: string, middleware: Array<(req: Request, res: Response, next: NextFunction) => any>, method: ((req: Request, res: Response) => void)) => {
                    registeredPath = path;
                    registeredMethod = method;
                }
            };

            class foo {
                private test = 'hello';

                public method(req: Request, res: Response) {
                    return this.test;
                }
            }
            const fooInstance = new foo();

            /* When */
            const routes = Torch<myMetaData>(app as Application, router => {
                router.get('/home', fooInstance.method.bind(fooInstance));
            });

            /* Then */
            expect(registeredPath).to.equal('/home');
            expect((registeredMethod as any)(1 as any, 2 as any)).to.equal('hello');
        });
    });
});
