import { ResourceOptions } from "adminjs";

export const categoryResourseOptions: ResourceOptions = {
  navigation: "Categories",
  editProperties: ["name", "position"],
  filterProperties: ["name", "position", "createdAt", "updatedAt"],
  listProperties: ["id", "name", "position"],
  showProperties: ["id", "name", "position", "createdAt", "updatedAt"],
};
