Express Torch
=====

[![Build Status](https://travis-ci.org/JBlaak/Express-Torch.svg?branch=master)](https://travis-ci.org/JBlaak/Express-Torch)

Expressive and maintainable routes for Express.js.

Running the example
-----

The project includes a simple example rendering a `/` and `/api/posts` endpoint,
you can set it up as follows:

```bash
$ cd ./example
$ yarn
$ yarn start
```

Now visit `http://localhost:3000` and take a look at `server.js`!

Usage
-----

__Basic usage__

You pass your Express app to Torch, and a callback in which you can 
specify your routes.

```js
import Express from 'express';
import Torch from 'express-torch';
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
import Torch from 'express-torch';
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
import Torch from 'express-torch';
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
import Torch from 'express-torch';
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

__Naming__

Since urls can be subject to your client's requests you don't want to spread
them all around your application as if they were static. Torch allows you to
add a mapping so that some `name` will map to a path.

```js
import Express from 'express';
import Torch from 'express-torch';
import PostsController from './controllers/posts';

const app = Express();

const routes = Torch(app, (router) => {
    router.group({prefix: '/api'}, function(router) {
        router.get('/posts/:id', {,
            name: 'api.posts.show',
            controller: PostsController.show
        });
    });
});

routes.named('api.posts.show',  { id: 123 });// will evaluate to /api/posts/123

//... your other Express logic

app.listen(3000);

/**** in ./controllers/posts.js ****/

{
    index: (req, res) => {
        req.routes.named('api.posts.show', {id: 123}) 
    }
}
```
