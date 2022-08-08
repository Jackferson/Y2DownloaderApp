const cheerio = require("cheerio");
const axios = require("axios").default;

const playlistURL =
  "https://www.youtube.com/playlist?list=PL6c9xy-s-23i4Mbi0I01sQMW_AMG9DW0Y";

const scrap = async () => {
  const playlistId = new URL(playlistURL).searchParams.get("list");
  axios(`https://www.youtube.com/playlist?list=${playlistId}`).then(
    (response) => {
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
        .map(({ playlistVideoRenderer }) => ({
          id: playlistVideoRenderer.videoId,
          name: playlistVideoRenderer.title.runs[0].text,
        }));
      console.log(songs);
      return {
        songs,
      };
    }
  );
};
scrap();
