import "reflect-metadata";
import { Kernel } from "inversify";
import * as ExampleService from "./services/example.service";
import * as ExampleController from "./controller/example.controller";
import {
    LoggerService,
    ConfigService,
    // SolaceService,
} from "common";
import * as Winston from "winston";

let kernel = new Kernel();

// Create config object that checks Vault variables, with fallback File
let config = new ConfigService.CompositeConfig(
    new ConfigService.CompositeConfig(
        new ConfigService.ObjectConfig(JSON.parse(process.env.SOLACE_VAULT_CONF || "{}")),
        new ConfigService.ObjectConfig(JSON.parse(process.env.SERVICE_VAULT_CONF || "{}"))
    ),
    new ConfigService.CompositeConfig(
        new ConfigService.ObjectConfig(JSON.parse(process.env.WINSTON_VAULT_CONF || "{}")),
        new ConfigService.ObjectConfig(JSON.parse(process.env.FILE_CONF || "{}"))
    )
);

kernel.bind<ConfigService.IConfig>(ConfigService.Symbols.IConfig).toConstantValue(config);
let transports = [
    new (Winston.transports.Http) ({
        host: config.get("winston.host"),
        level: config.get("winston.level", "debug"),
        port: config.get("winston.port"),
        silent: config.get("winston.silent"),
        ssl: config.get("winston.ssl"),
    }),
];
if (config.get("winston.level") === "debug" ) {
    transports.push(new Winston.transports.Console());
}

let winstonLogger = new Winston.Logger({
    exitOnError: false,
    transports: transports,
});

Winston.handleExceptions(new Winston.transports.Console());
let loggerInstance = new LoggerService.LoggerService(winstonLogger);
kernel.bind<LoggerService.ILoggerService>(LoggerService.Symbols.ILoggerService).toConstantValue(loggerInstance);

// kernel
//     .bind<SolaceService.ISolaceService>(SolaceService.Symbols.ISolaceService)
//     .to(SolaceService.DsbSolaceRestService);

kernel
    .bind<ExampleService.IExampleService>(ExampleService.Symbols.IExampleService)
    .to(ExampleService.ExampleService);

kernel
    .bind<ExampleController.IExampleController>(ExampleController.Symbols.IExampleController)
    .to(ExampleController.ExampleController);

export default kernel;
