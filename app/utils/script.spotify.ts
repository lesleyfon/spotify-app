import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';

import { ARTIST_TYPE, ENV_VARIABLE, Session } from './APP_TYPES';

dotenv.config();

const config = process.env as unknown as ENV_VARIABLE;

let spotifyApi = new SpotifyWebApi({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
});

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

const getUserAccessToken = async (config: ENV_VARIABLE): Promise<string> => {
  if (!spotifyApi.clientCredentialsGrant) {
    console.log(config);
    spotifyApi = new SpotifyWebApi({
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
    });
  }

  console.log(spotifyApi);

  const credentialsRes = await spotifyApi.clientCredentialsGrant();
  const access_token = credentialsRes.body.access_token;

  return access_token;
};

export async function getArtist(
  artistName: string,
  userSession: Session
): Promise<Array<ARTIST_TYPE> | null> {
  if (artistName === undefined) {
    return null;
  }

  const { accessToken } = userSession;

  await spotifyApi.setAccessToken(accessToken);

  const artistList = (await spotifyApi.searchArtists(artistName, { limit: 5, offset: 1 })).body
    .artists?.items as Array<ARTIST_TYPE> | null;

  return artistList;
}
