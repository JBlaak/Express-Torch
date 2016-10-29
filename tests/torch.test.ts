import {Application, Request, Response} from "express";
import {expect} from 'chai';
import Torch from "../src/torch";
import Router from "../src/router";

describe('Torch', function () {

    it('Should allow for registering a GET method', function () {
        /* Given */
        let registeredPath: string|null = null;

        const app: any = {
            get: (path: string) => {
                registeredPath = path;
            }
        };

        /* When */
        Torch(app as Application, (router: Router) => {
            router.get('/home', (req: any, res: any) => {
                /* The impl */
            });
        });

        /* Then */
        expect(registeredPath).to.equal('/home');
    });

});
