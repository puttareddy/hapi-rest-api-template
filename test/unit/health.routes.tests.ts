/// <reference path="../../typings/index.d.ts" />

import {IServerInjectOptions} from "hapi";
import { expect } from "chai";
import { reset, kernel, loggerMock } from "../ioc";

/* tslint:disable-next-line:no-var-requires */
let App = require("../../src/server");

describe("Health Routes", () => {
    beforeEach(() => {
        reset();
        loggerMock.callBase = true;
        App.init(kernel);
    });

    describe("GET /health", () => {
        it("should return 200 ", () => {
            let options: IServerInjectOptions = {
                method: "GET",
                url: "/health",
            };
            return App.server.inject(options).then( (response) => {
                expect(response.statusCode).to.equals(200);
            });
        });
    });
});
