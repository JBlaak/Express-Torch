import {Application, Request, Response} from "express";
import {expect} from 'chai';
import Torch from "../src/torch";
import Router from "../src/router";

describe('Torch', function () {

    it('Should allow for registering a GET method directly', function () {
        /* Given */
        let registeredPath: string|null = null;
        let registeredMethod: ((req: Request, res: Response) => void)|null = null;

        const app: any = {
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            post: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            put: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            delete: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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
            get: (path: string, method: ((req: Request, res: Response) => void)) => {
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

});
