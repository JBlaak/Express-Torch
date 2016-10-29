Torch
=====

[![Build Status](https://travis-ci.org/JBlaak/Torch.svg?branch=master)](https://travis-ci.org/JBlaak/Torch)

A more elegant way of specifying your Express routes.

Running the example
-----

The project includes a simple example rendering a `/` and `/api/posts` endpoint,
you can set it up as follows:

```bash
$ cd ./example
$ yarn
$ npm start
```

Now visit `http://localhost:3000` and take a look at `server.js`!

Usage
-----

__Basic usage__

You pass your Express app to Torch, and a callback in which you can 
specify your routes.

```js
import Express from 'express';
import Torch from 'torch';
import HomeController from './controllers/home';

const app = Express();

Torch(app, (router) => {
    router.get('/', HomeController.index);
});

//... your other Express logic

app.listen(3000);
```

__Grouping__

This is where Torch shines, you can register a bunch of routes
that require all parameters of the groups above, such as a `prefix` for
your `/api` routes.

```js
import Express from 'express';
import Torch from 'torch';
import HomeController from './controllers/home';

const app = Express();

Torch(app, (router) => {
    router.get('/', HomeController.index);
    router.group({prefix: 'api'}, (router) => {
        router.get('/posts', HomeController.index);// will evaluate to /api/posts
        router.get('/posts/:id', HomeController.show);// will evaluate to /api/posts/:id
    });
});

//... your other Express logic

app.listen(3000);
```

__Middleware__

Groups have another advantage, you can apply regular Express middleware to them,
so that they stack together without you having to specify them per route

```js
import Express from 'express';
import Torch from 'torch';
import HomeController from './controllers/home';

const app = Express();

Torch(app, (router) => {
    router.group({middlware: [Cookies, Session]}, (router) => {
    router.get('/', HomeController.index);// Cookies > Session
    router.group({middleware: [Throttle]}, (router) => {
        router.get('/posts', HomeController.index);// Cookies > Session > Throttle
        router.group({middleware: [OAuth, Policy('manage-posts')]}, (router) => {
            router.get('/posts/:id', HomeController.show);// Cookies > Session > Throttle > OAuth > Policy('manage-posts')
        });
    });
});

//... your other Express logic

app.listen(3000);
```

if you want, you can still apply middleware to a single route

```js
import Express from 'express';
import Torch from 'torch';
import HomeController from './controllers/home';

const app = Express();

Torch(app, (router) => {
    router.get('/', {,
        middleware: [Auth],
        controller: HomeController.index
    });
});

//... your other Express logic

app.listen(3000);
```
