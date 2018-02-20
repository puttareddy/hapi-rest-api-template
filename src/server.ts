/// <reference path="../typings/index.d.ts" />
import "reflect-metadata";

import {Server} from "hapi";
import {IServerConnectionOptions} from "hapi";
import * as ExampleRoutes from "./routes/example.routes";
import * as HealthRoutes from "./routes/health.routes";
import {LoggerService, ConfigService} from "common";
import {errorMappings} from "./errors";
import Kernel = inversify.interfaces.Kernel;

function init(kernel: Kernel) {
    let config = kernel.get<ConfigService.IConfig>(ConfigService.Symbols.IConfig);
    let logger = kernel.get<LoggerService.ILoggerService>(LoggerService.Symbols.ILoggerService);
    logger.setServiceName("example_name");
    logger.d("Bootstrapping server");
    let server = new Server();
    exports.server = server;
    exports.start = server.start;

    let connectionOptions: IServerConnectionOptions = {
        host: config.get("http.host"),
        port: config.get("http.port"),
    };
    server.connection(connectionOptions);
    server.route(ExampleRoutes.getRoutes(kernel));
    server.route(HealthRoutes);

    server.ext("onPreResponse", logger.hapiRequestHandler);

    // Register Errors
    errorMappings.forEach(element => {
        logger.registerCode(
            element.code,
            element.httpStatusCode,
            element.logMessage,
            element.responseMessage);
    });
    logger.d("Bootstrap complete");
}

exports.init = init;
