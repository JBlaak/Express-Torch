import Express from 'express';
import Torch from '../build/torch'
import HomeController from './controllers/home';
import ApiPostsController from './controllers/api/posts';

const app = Express();

Torch(app, (router) => {

    router.get('/', HomeController.index);

    router.group(
        {
            'prefix': 'api'
        },
        (router) => {

            router.get('posts', ApiPostsController.index);
            
        }
    );

});

console.log('Started listening on port 3000');
app.listen(3000);
