/// <reference path="../../typings/index.d.ts" />

import * as ExampleController from "../controller/example.controller";

import Kernel = inversify.interfaces.Kernel;

export let getRoutes = function (kernel: Kernel): any[] {
    let controller = kernel.get<ExampleController.IExampleController>(ExampleController.Symbols.IExampleController);

    let routes = [];

    routes.push({
        config:
        {
            validate: controller.validateHelloRequest(),
        },
        handler: controller.getHello,
        method: "GET",
        path: "/hello/{name}",
    });

    return routes;
};
