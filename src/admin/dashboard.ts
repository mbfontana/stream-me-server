import AdminJS, { PageHandler } from "adminjs";
import { Course, Episode, Category, User } from "../models";

type DashboardOptionsType = {
  component?: string;
  handler?: PageHandler;
};

export const dashboardOptions: DashboardOptionsType = {
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
};
