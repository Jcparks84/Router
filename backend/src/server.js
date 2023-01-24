"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const model_1 = require("./model");
const validator_1 = __importDefault(require("./validator"));
const middleware_1 = __importDefault(require("./middleware"));
const middleware_2 = __importDefault(require("./middleware"));
const cors_1 = __importDefault(require("cors"));
database_config_1.default.sync().then(() => {
    console.log("connected to db");
});
const app = (0, express_1.default)();
const port = 7000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Add new route
app.post("/addRoute", validator_1.default.checkCreateRoute(), middleware_2.default.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = uuidv4();
    try {
        const record = yield model_1.Route.create(Object.assign({}, req.body));
        return res.json({ record, msg: "Successfully created route" });
    }
    catch (e) {
        console.error(e);
        return res.json({
            msg: "failed to create",
            status: 500,
            route: "/addRoute",
        });
    }
}));
//Get seleceted limit of Routes
app.get("/read", validator_1.default.checkReadRoute(), middleware_1.default.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
        console.log(limit);
        const records = yield model_1.Route.findAll({ where: {}, limit });
        return res.json(records);
    }
    catch (e) {
        return res.json({ msg: "faile to read", status: 500, route: "/read" });
    }
}));
//Get route by id
app.get("/read/:id", validator_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield model_1.Route.findOne({ where: { id } });
        return res.json(record);
    }
    catch (e) {
        return res.json({
            msg: "faile to read",
            status: 500,
            route: "/read/:id",
        });
    }
}));
//Post Customer
app.post("/addCustomer", validator_1.default.checkCreateCustomer(), middleware_2.default.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield model_1.Customer.create(Object.assign({}, req.body));
        return res.json({ record, msg: "Customer Added" });
    }
    catch (e) {
        return res.json({
            msg: "Failed to add customer",
            status: 500,
            route: "/addCustomer",
        });
    }
}));
// Post RouteCustomers
app.post("/routeCustomer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        model_1.Route.findByPk(1).then(route => {
            model_1.Customer.findByPk(1).then(customer => {
            });
        });
    }
    catch (e) {
        return res.json({
            msg: "Failed to add",
            status: 500,
            route: "/routeCustomer",
        });
    }
}));
app.delete("/delete/:id", validator_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield model_1.Route.findOne({ where: { id } });
        if (!record) {
            return res.json({ msg: "Can not find existing record" });
        }
        const deleteRecord = yield record.destroy();
        return res.json({ record: deleteRecord });
    }
    catch (e) {
        return res.json({
            msg: "Failed to read",
            status: 500,
            route: "/delete/:id",
        });
    }
}));
app.listen(port, () => {
    console.log("server is running on port " + port);
});
