"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_result_1 = require("express-validator/src/validation-result");
class Middleware {
    handleValidationErrors(req, res, next) {
        const error = (0, validation_result_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.json(error.array()[0]);
        }
        next();
    }
}
exports.default = new Middleware();
