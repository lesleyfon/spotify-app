import SpotifyWebApi from 'spotify-web-api-node';
import type { ARTIST_TYPE, Session } from './APP_TYPES';

const spotifyApi = new SpotifyWebApi();

const sleep = function (time = 5000) {
  setInterval(() => {}, time);
};

const trackName = new Set();

const fetchTracks = async (
  artistName: string,
  options = { limit: 50, offset: 0 },
  stopCount = 0
) => {
  if (stopCount === 1) {
    return;
  }
  try {
    const response = await spotifyApi.searchTracks(`artist:${artistName}`, options);
    const data: any = response.body;

    const filteredData = data.tracks.items.filter((item: any) =>
      item.artists.some((artist: any) => artist.name === artistName)
    );

    filteredData.forEach((item: any) => {
      if (!trackName.has(item.name)) {
        trackName.add(item.name);
      }
    });

    const nextURL = data.tracks.next;

    const searchParams = new URLSearchParams(nextURL);

    if (
      searchParams === null ||
      searchParams.get('limit') === null ||
      searchParams.get('offset') === null
    ) {
      return;
    }

    const limit = parseInt(searchParams.get('limit')!, 10);
    const offset = parseInt(searchParams.get('offset')!, 10);

    options = { limit, offset };
    console.log(nextURL);
    if (nextURL === null) {
      return;
    }

    await sleep();

    // await fetchTracks(artistName, options, stopCount + 1);
  } catch (error) {
    console.error(error);
  }
};

export async function getArtist(
  artistName: string,
  userSession: Session,
  options = { limit: 5, offset: 0 }
): Promise<Array<ARTIST_TYPE> | null> {
  if (artistName === undefined) {
    return null;
  }

  const { accessToken } = userSession;

  await spotifyApi.setAccessToken(accessToken);

  const artistList = (await spotifyApi.searchArtists(artistName, options)).body.artists
    ?.items as Array<ARTIST_TYPE> | null;

  return artistList;
}
