/// <reference path="../typings/index.d.ts" />
/* tslint:disable:no-console */
import * as Promise from "bluebird";
import * as rp from "request-promise";

function checkVars(envVarKeys: Array<string>): boolean {
    let result = true;

    for (let k = 0; k < envVarKeys.length; k++) {
        let varName = envVarKeys[k];
        if (!process.env[varName]) {
            console.log(`${varName} is missing`);
            result = false;
        }
    }
    return result;
}

if (!checkVars(["HEADER_TOKEN","WINSTON_URL"])) {
    process.exit(1);
}
function getRemoteConfig(url: string): Promise<string> {
    return rp({
        headers: {
            "X-header-Token": process.env.HEADER_TOKEN,
        },
        method: "GET",
        uri: url,
    }).promise();
}
let configs = [   
    getRemoteConfig(process.env.WINSTON_URL),
];
Promise.all(configs)
    .spread((winston) => {
       process.env.WINSTON_CONF = JSON.stringify(JSON.parse(winston).data);
        let s = require("./server");
        let kernel = require("./ioc");
        s.init(kernel.default);

        s.server.start()
            .then(() => {
                console.log("Started server");
            })
            .catch(err => {
                console.log("Failed to start server: " + err);
            });
    })
    .catch(e => {
        console.log("Loading config failed:", e.message);
        process.exit(1);
    });
