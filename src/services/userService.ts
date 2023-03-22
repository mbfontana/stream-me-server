import { User } from "../models";
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const userService = {
  findByEmail: async (email: string) => {
    return await User.findOne({ where: { email } });
  },

  create: async (attributes: UserCreationAttributes) => {
    return await User.create(attributes);
  },

  getKeepWatchingList: async (userId: number) => {
    const userWithWatchingEpisodes = await User.findByPk(userId, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
          ["course_id", "courseId"],
        ],
        include: [
          {
            association: "Course",
            as: "course",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });

    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado.");

    const keepWatchingList = filterLastEpisodesByCourse(
      userWithWatchingEpisodes.Episodes!
    );
    // @ts-ignore
    keepWatchingList.sort((a, b) =>
      a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1
    );
    return keepWatchingList;
  },
};
