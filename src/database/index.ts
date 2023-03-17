import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "stream_me_dev",
  username: "stream_me",
  password: "stream_me",
  define: {
    underscored: true,
  },
});
