import { json } from '@remix-run/node';
import { Link, useLoaderData, useSubmit } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import type { Session } from '~/utils/APP_TYPES';
import { authenticator } from '~/service/auth.server';

function SvgComponent(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} height={30} width={30}>
      <title>Spotify</title>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as Session | null;

  return json({ user });
};

export default function NavBar() {
  const submit = useSubmit();

  const { user } = useLoaderData<typeof loader>();
  return (
    <nav className="tw-bg-wedgewood-300 tw-border-gray-200 dark:tw-bg-gray-900 tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-z-50 tw-w-full">
      <div className="tw-max-w-screen-xl tw-flex tw-flex-wrap tw-items-center tw-justify-between mtw-x-auto tw-p-4">
        <h1 className="tw-flex tw-items-center">
          <Link to="/" className="tw-flex tw-items-center">
            <SvgComponent />
          </Link>
        </h1>
        <div className="tw-hidden tw-w-full md:tw-block md:tw-w-auto" id="navbar-default">
          <ul className="tw-font-medium tw-flex tw-flex-col tw-p-4 md:tw-p-0 tw-mt-4 tw-border tw-border-gray-100 tw-rounded-lg tw-bg-gray-50 md:tw-flex-row md:tw-space-x-8 md:tw-mt-0 md:tw-border-0 md:tw-bg-white dark:tw-bg-gray-800 md:dark:tw-bg-gray-900 dark:tw-border-gray-tw-text-wedgewood-950700">
            <li>
              <a
                href="#"
                className="tw-block tw-py-2 tw-pl-3 tw-pr-4 tw-text-wedgewood-900 tw-rounded hover:tw-bg-gray-100 md:hover:tw-bg-transparent md:tw-border-0 md:hover:tw-text-wedgewood-950 md:tw-p-0 dark:tw-text-wedgewood-50 md:dark:hover:tw-text-wedgewood-500 dark:hover:tw-bg-gray-700 dark:hover:tw-text-wedgewood-50 md:dark:hover:tw-bg-transparent"
              >
                Search Artist
              </a>
            </li>
            <li>
              <a
                href="#"
                className="tw-block tw-py-2 tw-pl-3 tw-pr-4 tw-text-wedgewood-900 tw-rounded hover:tw-bg-gray-100 md:hover:tw-bg-transparent md:tw-border-0 md:hover:tw-text-wedgewood-950 md:tw-p-0 dark:tw-text-wedgewood-50 md:dark:hover:tw-text-wedgewood-500 dark:hover:tw-bg-gray-700 dark:hover:tw-text-wedgewood-50 md:dark:hover:tw-bg-transparent"
              >
                View Playlist
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  if (user) {
                    submit(null, { method: 'post', action: '/logout' });
                  }
                }}
                className="tw-block tw-py-2 tw-pl-3 tw-pr-4 tw-text-wedgewood-50 tw-rounded md:tw-bg-transparent md:tw-text-wedgewood-950 md:tw-p-0 dark:tw-text-wedgewood md:dark:tw-text-wedgewood-500 hover:tw-underline hover:tw-decoration-wedgewood-50 hover:tw-underline-offset-8"
                aria-current="page"
              >
                {user ? 'Logout' : ''}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
