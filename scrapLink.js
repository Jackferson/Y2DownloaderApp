const cheerio = require("cheerio");
const axios = require("axios").default;

// const playlistURL = 'https://www.youtube.com/playlist?list=PL6c9xy-s-23jt_ky7Uip3-6rEYaVrCzdm'

const scrap = async (playlistURL) => {
  const playlistId = new URL(playlistURL).searchParams.get("list");
  const response = await axios(
    `https://www.youtube.com/playlist?list=${playlistId}`
  );
  const data = response.data;
  const $ = cheerio.load(data);
  const ytInitialData = $("script").filter((index, tag) => {
    const html = $(tag).toString();
    return html.includes("ytInitialData");
  })[0];
  const [jsonStr] = /{.*}/gm.exec($(ytInitialData));
  const info = JSON.parse(jsonStr);
  const { contents } =
    info.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
      .playlistVideoListRenderer;
  const songs = contents
    .filter(({ playlistVideoRenderer }) => playlistVideoRenderer)
    .map(({ playlistVideoRenderer: playlistVideoRenderer_1 }) => ({
      videoId: playlistVideoRenderer_1.videoId,
      name: playlistVideoRenderer_1.title.runs[0].text,
    }));
  // console.log(songs);
  return songs;
};

exports.scrap = scrap;
