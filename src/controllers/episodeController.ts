import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

export const episodeController = {
  //GET - /episodes/stream
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;

    try {
      if (typeof videoUrl !== "string")
        throw new Error("Video URL must be o type string.");

      const range = req.headers.range; // bytes=0-1024
      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to stream video.");
    }
  },
};
