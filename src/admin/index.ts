import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { database } from "../database";
import { adminJsResources } from "./resources";
import { User, Course, Episode, Category } from "../models";
import bcrypt from "bcrypt";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  resources: adminJsResources,
  dashboard: {
    component: AdminJS.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const courses = await Course.count();
      const episodes = await Episode.count();
      const category = await Category.count();
      const standardUsers = await User.count({ where: { role: "user" } });

      res.json({
        Cursos: courses,
        Episódios: episodes,
        Categorias: category,
        Usuários: standardUsers,
      });
    },
  },
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

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });

      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) return user;
      }

      return false;
    },
    cookiePassword: "generic-cookie-password",
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
