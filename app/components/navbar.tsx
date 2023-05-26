import { LoaderArgs, json } from '@remix-run/node';
import { NavLink, useLoaderData, useSubmit } from '@remix-run/react';
import { authenticator } from '~/service/auth.server';
import { Session } from '~/utils/APP_TYPES';

export const loader = async ({ request }: LoaderArgs) => {
  let user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as Session | null;

  return json({ user });
};

export default function NavBar() {
  const submit = useSubmit();

  const { user } = useLoaderData<typeof loader>();
  return (
    <nav className=" tw-bg-wedgewood-300 tw-border-gray-200 dark:tw-bg-gray-900">
      <div className="tw-max-w-screen-xl tw-flex tw-flex-wrap tw-items-center tw-justify-between mtw-x-auto tw-p-4">
        <h1 className="tw-flex tw-items-center">
          <span className="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-wedgewood-950">
            Logo
          </span>
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
