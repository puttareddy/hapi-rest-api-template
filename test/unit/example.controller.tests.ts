// /// <reference path="../../typings/index.d.ts" />
// import { expect } from "chai";
// import Server = require("../../src/server");
// import {IServerInjectOptions} from "hapi";
// import kernel from "../../src/ioc";
// import * as TypeMoq from "typemoq";
// import {IExampleService, ExampleService, ExampleServiceTypes} from "../../src/services/example.service";

// describe("ServerRouteTests", () => {
//     describe("#hello", () => {
//         // Before and after each test, remove everything that's registered in the IOC
//         beforeEach(() => {
//             kernel.unbindAll();
//         });
//         afterEach(() => {
//             kernel.unbindAll();
//         });
//         it("should return world: A DIFFERENT PLACE FROM ACTUAL SERVICE IMPLEMENTATION", () => {
//             let options: IServerInjectOptions = {
//                 method: "GET",
//                 url: "/hello/world",
//             };
//             let expectedResult  = "world: A DIFFERENT PLACE FROM ACTUAL SERVICE IMPLEMENTATION";
//             let exampleServiceMock: TypeMoq.Mock<IExampleService> = TypeMoq.Mock.ofType(ExampleService);
//             exampleServiceMock
//                 .setup(x => x.getSomething(TypeMoq.It.isValue("world")))
//                 .returns(() => Promise.resolve(expectedResult));

//             kernel.bind<IExampleService>(ExampleServiceTypes.IExampleService)
//                   .toConstantValue(exampleServiceMock.object);

//             return Server.inject(options).then( (response) => {
//                 expect(response.statusCode).to.equal(200);
//                 expect(response.result).to.equal(expectedResult);
//             });
//         });
//     });
// });
