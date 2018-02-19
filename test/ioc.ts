import "reflect-metadata";
import { Kernel } from "inversify";
import {
    LoggerService, ConfigService, SolaceService,
} from "shared";
import * as Winston from "winston";
import * as TypeMoq from "typemoq";
import * as ExampleController from "../src/controller/example.controller";
import * as ExampleService from "../src/services/example.service";
import {errorMappings, IErrorMapping} from "../src/errors";

export let kernel = new Kernel();
export let configMock: TypeMoq.Mock<ConfigService.IConfig>;
export let loggerMock: TypeMoq.Mock<LoggerService.ILoggerService>;
export let solaceServiceMock: TypeMoq.Mock<SolaceService.ISolaceService>;
export let exampleServiceMock: TypeMoq.Mock<ExampleService.IExampleService>;
export let exampleControllerMock: TypeMoq.Mock<ExampleController.IExampleController>;

export let reset = function() {
    kernel.unbindAll();

    // Create and bind config
    configMock = TypeMoq.Mock.ofInstance(new ConfigService.ObjectConfig({}));
    kernel.bind<ConfigService.IConfig>(ConfigService.Symbols.IConfig).toConstantValue(configMock.object);

    // Create and bind logger
    let winstonLogger = new Winston.Logger({transports: [new Winston.transports.Console({
        level: "debug",
        silent: true, // No need to actually print the logs when testing, remove temporarily if you want to debug
    })]});
    loggerMock = TypeMoq.Mock.ofType(LoggerService.LoggerService, TypeMoq.MockBehavior.Loose, winstonLogger);
    kernel.bind<LoggerService.ILoggerService>(LoggerService.Symbols.ILoggerService).toConstantValue(loggerMock.object);

    // Register LogCode mappings here
    errorMappings.forEach((mapping: IErrorMapping) => {
        loggerMock.object
            .registerCode(
                mapping.code,
                mapping.httpStatusCode,
                mapping.logMessage,
                mapping.responseMessage);
    });

    // Initialize solace service and replace with the mock
    solaceServiceMock = TypeMoq.Mock.ofType(
        SolaceService.SolaceService, TypeMoq.MockBehavior.Loose, {}, loggerMock.object);
    kernel.bind<SolaceService.ISolaceService>(SolaceService.Symbols.ISolaceService)
        .toConstantValue(solaceServiceMock.object);

    // Initialize example service and replace with the mock
    kernel.bind<ExampleService.IExampleService>(ExampleService.Symbols.IExampleService)
        .to(ExampleService.ExampleService);

    exampleServiceMock = TypeMoq.Mock
        .ofInstance(kernel.get<ExampleService.IExampleService>(
            ExampleService.Symbols.IExampleService));
    kernel.unbind(ExampleService.Symbols.IExampleService);
    kernel
        .bind<ExampleService.IExampleService>(ExampleService.Symbols.IExampleService)
        .toConstantValue(exampleServiceMock.object);

    // Initialize example controller and replace with the mock
    kernel
        .bind<ExampleController.IExampleController>(ExampleController.Symbols.IExampleController)
        .to(ExampleController.ExampleController);

    exampleControllerMock = TypeMoq.Mock
        .ofInstance(kernel.get<ExampleController.IExampleController>(
            ExampleController.Symbols.IExampleController));
    kernel.unbind(ExampleController.Symbols.IExampleController);
    kernel
        .bind<ExampleController.IExampleController>(ExampleController.Symbols.IExampleController)
        .toConstantValue(exampleControllerMock.object);
};
