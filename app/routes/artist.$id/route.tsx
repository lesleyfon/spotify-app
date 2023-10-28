import type { LoaderFunctionArgs } from '@remix-run/router';
import type { LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { getArtist, getArtistTopTracks } from '~/utils/script.spotify';
import { TRACK_TYPE, ARTIST_TYPE, Session, CustomCSSProperties } from '~/utils/APP_TYPES';
import { authenticator } from '~/service/auth.server';
import CheckMark from '~/components/checkmark';

export const loader = async ({ params, request }: LoaderFunctionArgs | LoaderArgs) => {
  try {
    const artistId = params.id;
    if (artistId === undefined) {
      return redirect('/');
    }

    const user = (await authenticator.isAuthenticated(request, {})) as Session | null;
    if (user === null) {
      return redirect('/login');
    }

    const apiOptions = { artistId, userSession: user as Session };
    const [artist, artistTopTracks] = await Promise.all([
      getArtist(apiOptions),
      getArtistTopTracks(apiOptions),
    ]);

    return { artist, artistTopTracks };
  } catch (error) {
    return redirect('/login');
  }
};

interface LoaderData {
  artist: ARTIST_TYPE;
  artistTopTracks: TRACK_TYPE[];
}

function Artist() {
  const { artist, artistTopTracks } = useLoaderData<LoaderData>();

  const headerBgImg = artist.images[0].url;

  const msToMinutesAndSeconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const formattedSeconds = parseInt(seconds) < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const pausePreviousAudio = (e: React.MouseEvent<HTMLAudioElement, MouseEvent>) => {
    const audio = document.querySelectorAll('audio');
    audio.forEach((audio) => {
      if (audio !== e.currentTarget) {
        audio.pause();
      }
    });
  };

  return (
    <main className="">
      <header
        className="tw-h-[40vh] tw-min-h-[--min-jumbotron-height] tw-bg-no-repeat tw-bg-cover tw-bg-[image:var(--artist-image-url)] tw-bg-[position:--bg-position] tw-left-0 tw-m-0 tw-w-full tw-bg-at tw-text-wedgewood-50 tw-flex tw-flex-col tw-justify-end tw-relative"
        style={
          {
            '--artist-image-url': `url(${headerBgImg})`,
            '--bg-position': '50% 15%',
            '--min-jumbotron-height': 'calc(((100vh - 64px) - 90px) - 519px)',
          } as CustomCSSProperties
        }
      >
        <Link
          to="/"
          className="tw-border tw-rounded-full tw-border-solid tw-border-wedgewood-300 tw-bg-wedgewood-100 hover:tw-bg-wedgewood-300 tw-duration-700 tw-ease-in-out tw-px-5 tw-py-3 tw-mt-4 tw-text-wedgewood-500 tw-absolute tw-w-[100px] tw-ml-6 tw-top-0 tw-text-center"
        >
          Home
        </Link>
        <div className="tw-m-6">
          <div className="tw-text-wedgewood-50 tw-font-helvetica-neue tw-font-normal  tw-w-full tw-shrink-0  tw-mb-4 tw-h-6 tw-justify-center tw-text-sm tw-items-center tw-inline-grid tw-gap-2 tw-grid-cols-[auto_1fr]">
            <CheckMark />
            <p data-encore-id="type" className="tw-w-full">
              Verified Artist
            </p>
          </div>
          <div className="tw-mb-4 tw-h-24">
            <h1 className="tw-text-wedgewood-50 tw-text-8xl tw-not-italic tw-font-black tw-leading-[normal]">
              {artist.name}
            </h1>
          </div>
          <p className="tw-text-white tw-text-sm  tw-not-italic tw-font-thin tw-leading-8 tw-h-5">
            {artist.followers.total} total followers
          </p>
        </div>
      </header>

      <section className="tw-grid tw-grid-cols-[10fr_2fr] tw-p-6 tw-pt-14 tw-bg-gradient-to-t tw-from-wedgewood-100 tw-to-wedgewood-500">
        <section className="tw-mt-5">
          <h2 className="tw-text-wedgewood-700 tw-text-xl tw-not-italic tw-font-bold tw-leading-[normal] tw-mb-6">
            Top Tracks
          </h2>
          <ol className="tw-flex tw-flex-col tw-pl-6">
            {artistTopTracks.map((track, idx) => (
              <li className=" tw-list-none tw-h-14 marker:tw-leading-5 tw-justify-center tw-text-sm tw-items-center tw-inline-grid tw-gap-2  tw-grid-cols-[[index]_16px_[first]_4fr_[var1]_2fr_[last]_minmax(120px,1fr)]">
                <div className="tw-mr-4">
                  <p className="tw-text-sm tw-font-helvetica-neue tw-font-normal tw-text-gray-400">
                    {idx + 1}
                  </p>
                </div>
                <div className="tw-flex">
                  <div className="tw-mr-4">
                    <img
                      src={track.album.images[0].url}
                      alt={track.album.name}
                      className="tw-w-12 tw-h-12 tw-object-cover "
                    />
                  </div>
                  <div>
                    <p className="tw-font-helvetica-neue tw-text-base tw-font-normal">
                      {track.name}
                    </p>
                    {track.explicit ? (
                      <p className="tw-rounded-sm tw-bg-gray-light tw-w-4 tw-h-4 tw-text-xs tw-font-bold tw-text-center">
                        E
                      </p>
                    ) : null}
                  </div>
                </div>
                <figure>
                  {track.preview_url ? (
                    <audio
                      controls
                      className=" tw-w-40 tw-pr-4 tw-py-1"
                      onPlay={pausePreviousAudio}
                    >
                      <source src={track.preview_url} type="audio/mpeg" />
                      <source src={track.preview_url} type="audio/ogg" />
                    </audio>
                  ) : null}
                </figure>
                <p>{msToMinutesAndSeconds(track.duration_ms)}</p>
              </li>
            ))}
          </ol>
        </section>
        <div>
          <h3 className="tw-text-wedgewood-100">Create a playlist of all songs by {artist.name}</h3>
          <button className="tw-border tw-rounded-full tw-border-solid tw-border-wedgewood-300 tw-bg-wedgewood-100 hover:tw-bg-wedgewood-300 tw-duration-700 tw-ease-in-out tw-px-5 tw-py-3 tw-mt-4">
            Create Playlist
          </button>
        </div>
      </section>
    </main>
  );
}

export default Artist;
