import {Application} from "express";
import Router from "./router";
import connect from "./connect";

export default function Torch(app: Application, callback: (router: Router) => void) {
    const router = new Router();
    
    callback(router);

    connect(app, router);
}