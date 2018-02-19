export enum ExampleCodes {
    // Errors - Add error codes below
    ExampleErrorCode = 1123,
    // info codes - Add info codes below
    ExampleInfoCode = 1234,
    // Last number, unknown error
    UnknownError = 1999
}

export interface IErrorMapping {
    code: number;
    httpStatusCode: number;
    logMessage: string;
    responseMessage: string;
}

export let errorMappings: IErrorMapping[] = [
    {
        code: ExampleCodes.ExampleErrorCode,
        httpStatusCode: 500,
        logMessage: "Example error log message",
        responseMessage: "Example error response message",
    },
    {
        code: ExampleCodes.ExampleInfoCode,
        httpStatusCode: 200,
        logMessage: "Example info log message",
        responseMessage: "Example info response message",
    },
    {
        code: ExampleCodes.UnknownError,
        httpStatusCode: 500,
        logMessage: "Uknown error",
        responseMessage: "Unknown error occurred",
    },
];
