import {Application} from "express";
import Router from "./router";

export default function Torch(app: Application, callback: (router: Router) => void) {
    const router = new Router();
    
    callback(router);

    //TODO bind app to what the router has gathered
}