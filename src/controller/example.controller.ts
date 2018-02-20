/// <reference path="../../typings/index.d.ts" />

import {injectable, inject} from "inversify";
import {Request, IReply} from "hapi";
import Joi = require("joi");
import {LoggerService} from "common";
import * as ExampleService from "../services/example.service";
import {ExampleCodes} from "../errors";
import {ConfigService} from "common";

export let Symbols = {
    IExampleController: Symbol("IExampleController"),
};

export interface IExampleController {
    getHello(request: Request, reply: IReply);
    validateHelloRequest();
}

@injectable()
export class ExampleController implements IExampleController {
    private logger: LoggerService.ILoggerService;
    private exampleService: ExampleService.IExampleService;
    private config: ConfigService.IConfig;

    constructor
    (
        @inject(LoggerService.Symbols.ILoggerService) loggerService: LoggerService.ILoggerService,
        @inject(ExampleService.Symbols.IExampleService) exampleService: ExampleService.IExampleService,
        @inject(ConfigService.Symbols.IConfig) config: ConfigService.IConfig
    ) {
        this.logger = loggerService;
        this.exampleService = exampleService;
        this.config = config;
    }

    public getHello = (request: Request, reply: IReply) => {
        let nameKey = "name";
        let name = request.params[nameKey];

        this.exampleService.getSomething(name)
            .then((response) => {
                reply(response).code(201);
            })
            .catch( (err: LoggerService.LogCode) => {
                // already logged in service
                reply(err);
                return;
            })
            .catch((err) => {
                reply(this.logger.getLogCode(ExampleCodes.ExampleErrorCode));
            });
    };

    public validateHelloRequest = (): any => {
        return {
            params: {
                name: Joi.string().required().min(this.config.get("example.minNameLength")),
            },
        };
    };
}
