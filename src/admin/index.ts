import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { database } from "../database";
import { adminJsResources } from "./resources";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: {
    companyName: "Stream Me",
    logo: "/images/stream_me_logo2.svg",
    theme: {
      colors: {
        primary100: "#ff0a54",
        primary80: "#ff477e",
        primary60: "#ff5c8a",
        primary40: "#ff7096",
        primary20: "#ff85a1",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#151515",
      },
    },
  },
});

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs);
