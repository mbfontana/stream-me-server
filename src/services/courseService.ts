import { Course } from "../models";

export const courseService = {
  findCourseDetails: async (id: number) => {
    const courseDetails = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
      },
    });
    return courseDetails;
  },
};
