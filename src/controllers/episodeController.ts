import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { WatchTime } from "../models/WatchTime";
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

  // GET - /episodes/:id/watchTime
  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId);
      res.status(200).json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to set watch time.");
    }
  },

  // POST - /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const attributes: WatchTime = {
      userId: req.user!.id,
      episodeId: Number(req.params.id),
      seconds: req.body.seconds,
    };

    try {
      const watchTime = await episodeService.setWatchTime({ ...attributes });
      res.status(201).json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to set watch time.");
    }
  },
};
