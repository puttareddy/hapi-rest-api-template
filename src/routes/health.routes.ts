/// <reference path="../../typings/index.d.ts" />

import {IReply, Request} from "hapi";

let routes = [];
routes.push({
    handler: (request: Request, reply: IReply) => {
        reply({
            uptime: process.uptime(),
        });
    },
    method: "GET",
    path: "/health",
});
export = routes;
