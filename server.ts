import express, { NextFunction, Request, Response } from "express";
import db from "./backend/src/config/database.config";
import { v4 as uuidv4 } from "uuid";
import { Customer, Route, RouteCustomer } from "./backend/src/model";
import RouteValidator from "./backend/src/validator";
import Middleware from "./backend/src/middleware";
import middleware from "./backend/src/middleware";
import cors from "cors";
import path from "path";

db.sync().then(() => {
  console.log("connected to db");
});

const app = express();
const port = 7000;
let routeId: any;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/html/index.html"));
});

//Add new route
app.post(
  "/addRoute",
  RouteValidator.checkCreateRoute(),
  middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const route: any = await Route.create({ ...req.body });
      routeId = route.id;
      console.log(route.id);
      return res.json({ route, msg: "Successfully created route" });
    } catch (e) {
      console.error(e);
      return res.json({
        msg: "failed to create",
        e,
        status: 500,
        route: "/addRoute",
      });
    }
  }
);

//Get seleceted limit of Routes
app.get(
  "/read",
  RouteValidator.checkReadRoute(),
  Middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      console.log(limit);
      const records = await Route.findAll({ where: {}, limit });
      return res.json(records);
    } catch (e) {
      return res.json({ msg: "faile to read", status: 500, route: "/read" });
    }
  }
);

//Get route by id
app.get(
  "/read/:id",
  // RouteValidator.checkIdParam(),
  Middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Route.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "faile to read",
        status: 500,
        route: "/read/:id",
      });
    }
  }
);

//Post Customer
app.post(
  "/addCustomer",
  RouteValidator.checkCreateCustomer(),
  middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const customer:any = await Customer.create({ ...req.body });
      const customerId = customer.id
      const routeCustomers = await RouteCustomer.create({ ...routeId, ...customerId })
      return res.json({ customer, msg: "Customer Added" });
    } catch (e) {
      return res.json({
        msg: "Failed to add customer",
        status: 500,
        route: "/addCustomer",
      });
    }
  }
);

app.delete(
  "/delete/:id",
  RouteValidator.checkIdParam(),
  Middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Route.findOne({ where: { id } });
      if (!record) {
        return res.json({ msg: "Can not find existing record" });
      }
      const deleteRecord = await record.destroy();
      return res.json({ record: deleteRecord });
    } catch (e) {
      return res.json({
        msg: "Failed to read",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
