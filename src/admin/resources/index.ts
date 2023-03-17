import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode } from "../../models";
import { categoryResourseOptions } from "./category";
import { courseResourseOptions } from "./course";
import { episodeResourseOptions } from "./episode";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourseOptions,
  },
  {
    resource: Course,
    options: courseResourseOptions,
  },
  {
    resource: Episode,
    options: episodeResourseOptions,
  },
];
