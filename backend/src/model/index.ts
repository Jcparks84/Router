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

// export const RouteCustomer = Routedb.define(
//   "RouteCustomer",
//   {
//     RouteCustomerId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

export const RouteCustomer = Routedb.define('RouteCustomer', {
  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });

Route.belongsToMany(Customer, {
  through: "RouteCustomer",
  foreignKey: "routeId"
});
Customer.belongsToMany(Route, {
  through: "RouteCustomer",
  foreignKey: "customerId"
});

Routedb.sync({ alter: true }).then(() => {});

// interface RouteAttributes {
//   id: string;
//   route: string;
// }

// export class Route extends Model<RouteAttributes> {}

// Route.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//     route: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: Routedb,
//     tableName: "Routes",
//   }
// );

// interface CustomerAttributes {
//   id: string;
//   name: string;
//   phone: string;
//   key: string;
//   cases: string;
//   notes: string;
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
// }

// export class Customer extends Model<CustomerAttributes> {}

// Customer.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     key: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     cases: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     notes: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     street: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     state: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     zip: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: Routedb,
//     tableName: "Customers",
//   }
// );

// // const Stops = Routedb.define('User_Profile', {}, { timestamps: false });
// Customer.belongsToMany(Route, { through: "Stops" });
// Route.belongsToMany(Customer, { through: "Stops" });
// Routedb.sync({ force: true });
