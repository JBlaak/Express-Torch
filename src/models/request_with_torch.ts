import {Request} from "express";
import {Routes} from "../torch";

export interface RequestWithTorch extends  Request {
    routes: Routes
}
