import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { CustomerInstance, RouteInstance } from "./model";
import RouteValidator from "./validator";
import Middleware from "./middleware";
import middleware from "./middleware";
import { json } from "sequelize";

db.sync().then(() => {
  console.log("connected to db");
});

const app = express();
const port = 7000;

app.use(express.json());

//Add new route
app.post(
  "/addRoute",
  RouteValidator.checkCreateRoute(),
  middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await RouteInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully created route" });
    } catch (e) {
      console.error(e)
      return res.json({
        msg: "failed to create",
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
      const records = await RouteInstance.findAll({ where: {}, limit });
      return res.json(records);
    } catch (e) {
      return res.json({ msg: "faile to read", status: 500, route: "/read" });
    }
  }
);

//Get route by id
app.get(
  "/read/:id",
  RouteValidator.checkIdParam(),
  Middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await RouteInstance.findOne({ where: { id } });
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

app.post("/addCustomer", async (req: Request, res: Response) => {
  const id = uuidv4();
  const routeID = ''
  const route = RouteInstance.findOne({
    order: [ [ "id", 'DESC']]
  }).then(function(result){
    console.log(result);
  })
  console.log(route);
  
  try {
    const record = await CustomerInstance.create({ ...req.body, id, routeID });
    return res.json({ record, msg: "Customer Added" });
  } catch (e) {
    return res.json({
      msg: "Failed to add customer",
      status: 500,
      route: "/addCustomer",
    });
  }
});

// app.post('/addCustomer', (req:Request, res:Response) => {
//     console.log(req.body);
//     return res.send('')
// })

app.delete(
  "/delete/:id",
  RouteValidator.checkIdParam(),
  Middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await RouteInstance.findOne({ where: { id } });
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
