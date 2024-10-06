"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
exports.wrapAsync = wrapAsync;
class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
const handleError = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        success: false,
        status,
        message
    });
};
exports.handleError = handleError;
exports.default = CustomError;
