/// <reference path="../../typings/index.d.ts" />

import {injectable, inject} from "inversify";
import * as Promise from "bluebird";
import {LoggerService} from "common";
import {ExampleCodes} from "../errors";
import {ConfigService} from "common";

export interface IExampleService {
    getSomething(name: string): Promise<string>;
}

export let Symbols = {
    IExampleService : Symbol("IExampleService"),
};

@injectable()
export class ExampleService implements IExampleService {
    private logger: LoggerService.ILoggerService;
    private config: ConfigService.IConfig;
    private message;

    constructor(
        @inject(LoggerService.Symbols.ILoggerService) logger: LoggerService.ILoggerService,
        @inject(ConfigService.Symbols.IConfig) config: ConfigService.IConfig
    ) {
        this.logger = logger;
        this.config = config;
        this.message = config.get("example.message");
    }

    public getSomething(name: string): Promise<string> {
        this.logger.i(ExampleCodes.ExampleInfoCode, "Sample Message");
        return Promise.resolve(name);
    }
}
