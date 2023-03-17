import { ResourceOptions } from "adminjs";

export const courseResourseOptions: ResourceOptions = {
  navigation: "Courses",
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "thumbnailUrl",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};
