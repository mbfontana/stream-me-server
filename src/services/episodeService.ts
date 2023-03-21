import { Response } from "express";
import path from "path";
import fs from "fs";

export const episodeService = {
	streamEpisodeToResponse: async (
		res: Response,
		videoUrl: string,
		range?: string
	) => {
		const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
		const fileStat = fs.statSync(filePath);

		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1; // If the is no size constraint, get the whole video.
			const chunkSize = end - start + 1;

			const responseHeaders = {
				"Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
				"Accept-Ranges": "bytes",
				"Content-Length": chunkSize,
				"Content-Type": "video/mp4",
			};

			res.writeHead(206, responseHeaders); // The HTTP 206 Partial Content success status response code indicates that the request has succeeded and the body contains the requested ranges of data, as described in the Range header of the request.
			fs.createReadStream(filePath, { end, start }).pipe(res); // Writes the video to the stream (response).
		} else {
			const responseHeaders = {
				"Content-Length": fileStat.size,
				"Content-Type": "video/mp4",
			};
			res.writeHead(200, responseHeaders);
			fs.createReadStream(filePath).pipe(res);
		}
	},
};
