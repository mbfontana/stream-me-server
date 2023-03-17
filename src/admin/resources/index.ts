import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourseOptions } from "./category";
import { courseResourseOptions } from "./course";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourseOptions,
  },
  {
    resource: Course,
    options: courseResourseOptions,
  },
];
