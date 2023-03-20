import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { database } from "../database";
import { adminJsResources } from "./resources";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { autheticationOptions } from "./authentication";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  resources: adminJsResources,
  dashboard: dashboardOptions,
  branding: brandingOptions,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  autheticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
