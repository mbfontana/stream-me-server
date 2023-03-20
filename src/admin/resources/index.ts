import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode, User } from "../../models";
import { categoryResourseOptions } from "./category";
import { courseResourseFeatures, courseResourseOptions } from "./course";
import { episodeResourceFeatures, episodeResourseOptions } from "./episode";
import { userResourseOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourseOptions,
  },
  {
    resource: Course,
    options: courseResourseOptions,
    features: courseResourseFeatures,
  },
  {
    resource: Episode,
    options: episodeResourseOptions,
    features: episodeResourceFeatures,
  },
  {
    resource: User,
    options: userResourseOptions,
  },
];
