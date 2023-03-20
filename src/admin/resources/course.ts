import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const courseResourseOptions: ResourceOptions = {
  navigation: "Tables",
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

export const courseResourseFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, "..", "..", "..", "public"),
      },
    },
    properties: {
      key: "thumbnailUrl", // Key in database
      file: "uploadThumbnail", // Key in AdminJS resources (defined above)
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.get("id")}/${filename}`,
  }),
];
