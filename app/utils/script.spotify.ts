import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'

dotenv.config()

type ENV_VARIABLE = {
  CLIENT_ID: string
  CLIENT_SECRET: string
}

const config = process.env as unknown as ENV_VARIABLE

console.log({ clientId: config.CLIENT_ID, clientSecret: config.CLIENT_SECRET })

const spotifyApi = new SpotifyWebApi({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
})

const sleep = function (time = 5000) {
  setInterval(() => {}, time)
}

const trackName = new Set()

const fetchTracks = async (
  artistName: string,
  options = { limit: 50, offset: 0 },
  stopCount = 0
) => {
  if (stopCount === 1) {
    return
  }
  try {
    const response = await spotifyApi.searchTracks(`artist:${artistName}`, options)
    const data: any = response.body

    const filteredData = data.tracks.items.filter((item: any) =>
      item.artists.some((artist: any) => artist.name === artistName)
    )

    filteredData.forEach((item: any) => {
      if (!trackName.has(item.name)) {
        trackName.add(item.name)
      }
    })

    const nextURL = data.tracks.next

    const searchParams = new URLSearchParams(nextURL)

    if (
      searchParams === null ||
      searchParams.get('limit') === null ||
      searchParams.get('offset') === null
    ) {
      return
    }

    const limit = parseInt(searchParams.get('limit')!, 10)
    const offset = parseInt(searchParams.get('offset')!, 10)

    options = { limit, offset }
    console.log(nextURL)
    if (nextURL === null) {
      return
    }

    await sleep()

    // await fetchTracks(artistName, options, stopCount + 1);
  } catch (error) {
    console.error(error)
  }
}

// spotifyApi
//   .clientCredentialsGrant()
//   .then((response: any) => {
//     spotifyApi.setAccessToken(response.body.access_token)
//     fetchTracks('Davido')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const getUserAccessToken = async (): Promise<string> => {
  const credentialsRes = await spotifyApi.clientCredentialsGrant()
  const access_token = credentialsRes.body.access_token

  return access_token
}

export interface ARTIST_TYPE {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Followers {
  href: null
  total: number
}

export interface Image {
  height: number
  url: string
  width: number
}

export async function getArtist(artistName: string): Promise<Array<ARTIST_TYPE> | null> {
  if (artistName === undefined) {
    return null
  }

  const accessToken = await getUserAccessToken()
  spotifyApi.setAccessToken(accessToken)
  const artistList = (await spotifyApi.searchArtists(artistName)).body.artists
    ?.items as Array<ARTIST_TYPE> | null

  return artistList
}
