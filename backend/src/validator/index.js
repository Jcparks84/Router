"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RouteValidator {
    checkCreateRoute() {
        return [
            (0, express_validator_1.body)("routeName").notEmpty().withMessage("The routeName should not be empty"),
        ];
    }
    checkCreateCustomer() {
        return [
            (0, express_validator_1.body)("name")
                .notEmpty()
                .withMessage("The customer name should not be empty"),
        ];
    }
    checkReadRoute() {
        return [
            (0, express_validator_1.query)("limit")
                .notEmpty()
                .withMessage("the query limit should not be empty")
                .isInt({ min: 1, max: 10 })
                .withMessage("the limit value should be a number between 1-10"),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)("id")
                .notEmpty()
                .withMessage("the value should not be empty")
                .isUUID(4)
                .withMessage("the value should be uuid v4"),
        ];
    }
}
exports.default = new RouteValidator();
