import type { ARTIST_TYPE } from '~/utils/APP_TYPES';
import HeadShotPlaceholder from './placeholder';
import { Fragment } from 'react';

export default function ArtistCard({
  name,
  genres,
  followers,
  images,
  popularity,
  external_urls,
}: ARTIST_TYPE) {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow md:tw-flex-row md:max-w-xl hover:tw-bg-gray-100 dark:tw-border-gray-700 dark:tw-bg-gray-800 dark:hover:tw-bg-gray-700 tw-mb-5 tw-h-96 md:tw-max-h-[192px] md:tw-h-auto">
      {images.length > 0 ? (
        <img
          className="tw-object-cover tw-w-full tw-rounded-t-lg tw-h-96 tw-max-h-[192px] md:tw-h-auto md:tw-w-48 md:tw-rounded-none md:tw-rounded-l-lg"
          src={images[0]?.url}
          alt="Artist Spotify Logo"
          loading="lazy"
          decoding="async"
          srcSet={`
      ${images[2]?.url} 300w,
      ${images[1]?.url} 600w,
      ${images[0]?.url} 1200w`}
        />
      ) : (
        <HeadShotPlaceholder />
      )}
      <div className="tw-flex tw-flex-col tw-justify-between tw-p-4 tw-leading-normal">
        <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">
          {name}
        </h5>
        <p>View More about artist </p>
        <a
          href={external_urls.spotify}
          target="_blank"
          className="tw-font-small tw-text-wedgewood-600 dark:tw-text-wedgewood-500 hover:tw-underline hover:tw-decoration-wedgewood-600 hover:tw-underline-offset-4 hover:tw-decoration-2"
        >
          Go to Spotify Profile
        </a>
        <div className=" tw-flex tw-text-sm dark:tw-text-wedgewood-gray">
          <p className=" tw-mr-3">
            <span className="tw-mr-1">Followers</span>
            <span className="tw-mr-1">&#x2022;</span>
            <span className="tw-font-semibold">{followers.total}</span>
          </p>
          <p>
            <span className=" tw-mr-1">Popularity</span>
            <span className=" tw-mr-1">&#x2022;</span>
            <span className="tw-font-semibold">{popularity}</span>
          </p>
        </div>
        <ul className=" tw-flex tw-text-sm dark:tw-text-wedgewood-gray">
          {genres.map((genre, i) => (
            <Fragment key={genre}>
              <li className="tw-flex tw-list-none ">{genre}</li>
              <p className="tw-mx-1 tw-font-extrabold tw-text-lg tw-block tw-h-1">
                {i !== genres.length - 1 ? <>&#x2022;</> : ''}
              </p>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
