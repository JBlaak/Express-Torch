import Express from 'express';
import Torch from '../build/torch'

import OAuth from './middleware/oauth';

import HomeController from './controllers/home';
import ApiPostsController from './controllers/api/posts';

const app = Express();

Torch(app, (router) => {

    router.get('/', HomeController.index);

    router.group(
        {
            'prefix': 'api',
            'middleware': [OAuth]
        },
        (router) => {

            router.get('posts', ApiPostsController.index);
            
        }
    );

});

console.log('Started listening on port 3000');
app.listen(3000);
