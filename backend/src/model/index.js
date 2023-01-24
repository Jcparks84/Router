"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCustomer = exports.Customer = exports.Route = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
exports.Route = database_config_1.default.define("Route", {
    routeName: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
});
exports.Customer = database_config_1.default.define("Customer", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
    },
    cases: {
        type: sequelize_1.DataTypes.STRING,
    },
    notes: {
        type: sequelize_1.DataTypes.STRING,
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    zip: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
});
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
exports.RouteCustomer = database_config_1.default.define('RouteCustomer', {
    selfGranted: sequelize_1.DataTypes.BOOLEAN
}, { timestamps: false });
exports.Route.belongsToMany(exports.Customer, {
    through: "RouteCustomer",
    foreignKey: "routeId"
});
exports.Customer.belongsToMany(exports.Route, {
    through: "RouteCustomer",
    foreignKey: "customerId"
});
database_config_1.default.sync({ alter: true }).then(() => { });
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
