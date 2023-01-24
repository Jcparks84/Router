import { Sequelize } from "sequelize";

const Routedb = new Sequelize("app", "", "", {
  storage: "./database.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default Routedb;
