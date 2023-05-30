import type { ARTIST_TYPE } from '~/utils/APP_TYPES';

export default function ArtistCard({ name, genres, followers, images, popularity }: ARTIST_TYPE) {
  return (
    <a
      href="#"
      className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow md:tw-flex-row md:max-w-xl hover:tw-bg-gray-100 dark:tw-border-gray-700 dark:tw-bg-gray-800 dark:hover:tw-bg-gray-700"
    >
      {/* <img
        className="tw-object-cover tw-w-full tw-rounded-t-lg tw-h-96 md:tw-h-auto md:tw-w-48 md:tw-rounded-none md:tw-rounded-l-lg"
        src="/docs/images/blog/image-4.jpg"
        alt=""
      /> */}
      <img
        className="tw-object-cover tw-w-full tw-rounded-t-lg tw-h-96 md:tw-h-auto md:tw-w-48 md:tw-rounded-none md:tw-rounded-l-lg"
        src={images[0]?.url}
        alt="Artist Spotify Logo"
        loading="lazy"
        decoding="async"
        srcSet={`
          ${images[2]?.url} 300w,
          ${images[1]?.url} 600w,
          ${images[0]?.url} 1200w`}
      />
      <div className="tw-flex tw-flex-col tw-justify-between tw-p-4 tw-leading-normal">
        <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">
          {name}
        </h5>
        <p className="tw-mb-3 tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p>
        <p>View More about artist </p>
        <p>Go to Spotify Profile </p>
        <div className=" tw-flex">
          <p className=" tw-mr-3">
            <span className="dark:tw-text-gray-400">Followers</span>
            <span className="dark:tw-text-gray-400">&#x2022;</span>
            <span className="tw-font-semibold tw-text-gray-900 dark:tw-text-gray-400">
              {followers.total}
            </span>
          </p>
          <p>
            <span className="dark:tw-text-gray-400">Popularity</span>
            <span className="dark:tw-text-gray-400">&#x2022;</span>
            <span className="tw-font-semibold tw-text-gray-900 dark:tw-text-gray-400">
              {popularity}
            </span>
          </p>
        </div>
        <ul className=" tw-flex dark:tw-text-gray-400">
          {genres.map((genre, i) => (
            <>
              <li className="tw-flex tw-list-none ">{genre}</li>
              <span className="tw-mx-1 tw-font-bold tw-text-lg tw-block tw-h-1">
                {i !== genres.length - 1 ? <>&#x2022;</> : ''}
              </span>
            </>
          ))}
        </ul>
      </div>
    </a>
  );
}
