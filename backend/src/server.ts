import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { Customer, Route } from "./model";
import RouteValidator from "./validator";
import Middleware from "./middleware";
import middleware from "./middleware";
import { json } from "sequelize";
import { cursorTo } from "readline";

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
      const record = await Route.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully created route" });
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
  RouteValidator.checkIdParam(),
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
app.post("/addCustomer", async (req: Request, res: Response) => {
  const id = uuidv4();
  const routeID = "";
  const route = Route.findOne({
    order: [["id", "DESC"]],
  }).then(function (result) {
    console.log(result);
  });
  console.log(route);

  try {
    const record = await Customer.create({ ...req.body, id, routeID });
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

// const project = await Project.findByPk(123);
// if (project === null) {
//   console.log('Not found!');
// } else {
//   console.log(project instanceof Project); // true
//   // Its primary key is 123
// }

//Post stop
app.post(
  "/addStop",
  RouteValidator.checkIdParam(),
  middleware.handleValidationErrors,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      Route.findByPk(123).then(route => {
        Customer.findByPk(123).then(customer => {
          customer!.addRoute(route);
        });
      });

      // const record = await route({ ...req.body, id });
      return res.json({ record, msg: "Successfully created stop" });
    } catch (e) {
      console.error(e);
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/addStop",
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
