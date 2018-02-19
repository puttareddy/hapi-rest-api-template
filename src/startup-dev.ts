/// <reference path="../typings/index.d.ts" />

import "reflect-metadata";
/* tslint:disable:no-console */
import * as Promise from "bluebird";
import * as fs from "fs";

let fsAsync: any = Promise.promisifyAll(fs);
console.log("Initializing server");

fsAsync.readFileAsync(__dirname + "/config/conf.json", "utf8")
    .then(fileConf => {
        console.log("Config file read");
        process.env.FILE_CONF = fileConf;
        let kernel = require("./ioc");
        let s = require("./server");
        s.init(kernel.default);
        console.log("Starting server");
        s.server.start()
            .then(() => {
                console.log("Started server");
            })
            .catch(err => {
                console.log("Failed to start server: " + err);
            });
    })
    .catch(e => {
        console.log("Failed to start server: " + e);
        process.exit(1);
    });
