import { Model, DataTypes } from "sequelize";
import Routedb from "../config/database.config";

interface RouteAttributes {
  id: string;
  route: string;
  customers: CustomerInstance[];
}

export class RouteInstance extends Model<RouteAttributes> {}

RouteInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: Routedb,
    tableName: "Routes",
  }
);

interface CustomerAttributes {
  id: string;
  name: string;
  routeID: string;
  phone: string,
  key: string,
  cases: string,
  notes: string,
  street: string,
  city: string,
  state: string,
  zip: string
}

// export class CustomerInstance extends Model<CustomerAttributes> {}

// CustomerInstance.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },

//   },
//   {
//     sequelize: Routedb,
//     tableName: "Customers",
//   }
// );

// interface CustomerAttributes {
//   id: string;
//   routeID: string;
//   name: string;
//   phone: string;
//   key: string;
//   cases: string;
//   notes: string;
// //   address: {
// //     street: string;
// //     city: string;
// //     state: string;
// //     zip: string;
// //   };
// }

export class CustomerInstance extends Model<CustomerAttributes> {}

CustomerInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    routeID: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cases: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
  {
    sequelize: Routedb,
    tableName: "Customers",
  }
);
