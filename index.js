/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();

app.use(cors());

app.get("/download", async (req, res) => {
	if (req.query.URL === undefined) res.send("URL is undefined");
	try {
		var extension = "mp4";
		var url = req.query.URL;
		var info = await ytdl.getInfo(url);
		var title = info.videoDetails.title;
		var video = ytdl.downloadFromInfo(info, { filter: req.query.filter });
		if (req.query.filter == "audioonly") {
			extension = "mp3";
		}
		res.header(
			"Content-Disposition",
			`attachment; filename="${title}.${extension}"`,
		);
		video.pipe(res);
	} catch (error) {
		res.send(error);
	}
});

app.get("/info", async (req, res) => {
	if (req.query.URL === undefined) res.send("URL is undefined");
	try {
		var url = req.query.URL;
		var info = await ytdl.getInfo(url);
		res.send(info);
	} catch (error) {
		res.send(error);
	}
});

module.exports = app;
