import Express from 'express';
import Torch from '../src/index'
import Router from "../src/router";

const app = Express();

Torch(app, (router: Router) => {

    //Simple binding
    router.get('/', HomeController.index);

    router.group(
        {
            'prefix': 'api',
            'middleware': [OAuth]
        },
        (router: Router) => {

            //Will be mapped to /api/post and requires to pass the OAuth check
            router.get('posts', ApiPostsController.index);
            
        }
    );

});
