Torch
=====

A more elegant way of specifying your Express routes.

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

