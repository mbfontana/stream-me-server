import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourseOptions: ResourceOptions = {
  navigation: "Tables",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, "..", "..", "..", "uploads"),
      },
    },
    properties: {
      key: "videoUrl", // Key in database
      file: "uploadVideo", // Key in AdminJS resources (defined above)
    },
    uploadPath: (record, filename) =>
      `videos/course-${record.get("courseId")}/${filename}`,
  }),
];
