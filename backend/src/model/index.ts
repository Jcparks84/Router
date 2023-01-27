import { Model, DataTypes, Sequelize } from "sequelize";
import Routedb from "../config/database.config";

export const Route = Routedb.define(
  "Route",
  {
    routeName: {
      type: DataTypes.STRING,
  
    },
  },
  {
    timestamps: false,
  }
);

export const Customer = Routedb.define(
  "Customer",
  {

    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
    cases: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export const RouteCustomer = Routedb.define(
  "RouteCustomer",
  {
    RouteCustomer_id: {
      type: DataTypes.INTEGER
    }
  },
  { timestamps: false }
);

Route.belongsToMany(Customer, {
  through: RouteCustomer,
  // foreignKey: "route_id",
});
Customer.belongsToMany(Route, {
  through: RouteCustomer,
  // foreignKey: "customer_id",
});

// let addRoute: any, addCustomer: any;
// Routedb.sync({ alter: true }).then(() => {
//   return Route.findOne({ where: { routeName: 'Bud'}});
// }).then((data) => {
//   addRoute = data;
//   return Customer.findAll()
// }).then((data) => {
//   addCustomer = data;
//   addRoute.addCustomer(addCustomer);
// }).catch((err) => {
//   console.log(err)
// })
